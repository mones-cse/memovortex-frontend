import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode"; // You'll need to install this package
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";
import { loginFunction, registrationFunction } from "../api/auth";
type User = {
	sub: string;
	email: string;
	// Add other relevant user properties
};

type AuthStore = {
	user: User | null;
	isAuthenticated: boolean;
	setUser: (user: User | null) => void;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	isAuthenticated: false,
	setUser: (user) => set({ user }),
	setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export const useAuth = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { user, isAuthenticated, setUser, setIsAuthenticated } = useAuthStore();

	const verifyToken = useCallback((): User | null => {
		const token = localStorage.getItem("access_token");

		if (!token) return null;

		try {
			const decodedToken = jwtDecode<User & { exp: number }>(token);
			const currentTime = Date.now() / 1000;
			if (decodedToken.exp < currentTime) {
				console.log(
					"🚀 ~ verifyToken ~ decodedToken.exp < currentTime:",
					decodedToken.exp < currentTime,
				);
				// Token has expired

				logout();
				return null;
			}

			return {
				sub: decodedToken.sub,
				email: decodedToken.email,
				// Add other user properties as needed
			};
		} catch (error) {
			console.error("Error decoding token:", error);
			logout();
			return null;
		}
	}, []);

	const checkAuth = useCallback(() => {
		const verifiedUser = verifyToken();

		if (verifiedUser) {
			setUser(verifiedUser);
			setIsAuthenticated(true);
		} else {
			setUser(null);
			setIsAuthenticated(false);
		}
	}, [verifyToken, setUser, setIsAuthenticated]);

	const registrationMutation = useMutation({
		mutationFn: registrationFunction,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["user"],
			});
		},
	});

	const loginMutation = useMutation({
		mutationFn: loginFunction,
		onSuccess: (result) => {
			console.log("onSuccess", result);
			if (result.data.token) {
				console.log("data.token", result.data.token);
				localStorage.setItem("access_token", result.data.token.access_token);
				localStorage.setItem("refresh_token", result.data.refresh_token);
			}
			queryClient.invalidateQueries({
				queryKey: ["user"],
			});
		},
	});

	const logout = useCallback(() => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		setUser(null);
		setIsAuthenticated(false);
		queryClient.clear();
		navigate("/login");
	}, [queryClient, navigate, setUser, setIsAuthenticated]);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	return {
		registration: registrationMutation.mutateAsync,
		login: loginMutation.mutateAsync,
		logout,
		user,
		isAuthenticated,
		checkAuth,
		loginData: loginMutation.data,
		isPending: registrationMutation.isPending || loginMutation.isPending,
		error: registrationMutation.error || loginMutation.error,
	};
};

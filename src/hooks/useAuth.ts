import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginFunction, registrationFunction } from "../api/auth";
import { useAuthStore } from "../stores/authStore";
import { removeToken, setToken } from "../utils/tokenUtils";
import { useTokenVerification } from "./useTokenVerification";

export const useAuth = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { user, isAuthenticated, setUser, setIsAuthenticated } = useAuthStore();

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
			if (result.data.token) {
				setToken(result.data.token.access_token, result.data.refresh_token);
			}
			queryClient.invalidateQueries({
				queryKey: ["user"],
			});
		},
	});

	const logout = useCallback(() => {
		console.log("🚀 ~ logout ~ logout:", logout);
		removeToken();
		setUser(null);
		setIsAuthenticated(false);
		queryClient.clear();
		navigate("/login");
	}, [queryClient, navigate, setUser, setIsAuthenticated]);

	const verifyToken = useTokenVerification(logout);

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
		isPending: registrationMutation.isPending || loginMutation.isPending,
		error: registrationMutation.error || loginMutation.error,
	};
};

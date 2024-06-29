import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginFunction, registrationFunction } from "../api/auth";

export const useAuth = () => {
	const queryClient = useQueryClient();

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

	const logout = () => {
		localStorage.removeItem("token");
		queryClient.invalidateQueries(["user"]);
		// Additional logout logic (e.g., redirecting to login page) can be added here
	};

	return {
		registration: registrationMutation.mutateAsync,
		login: loginMutation.mutateAsync,
		logout,
		loginData: loginMutation.data,
		isPending: registrationMutation.isPending || loginMutation.isPending,
		error: registrationMutation.error || loginMutation.error,
	};
};

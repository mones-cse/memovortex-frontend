import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/auth";
import type { TChangePassword } from "../../types/auth.type";

export const useChangePasswordMutation = () => {
	return useMutation({
		mutationFn: (data: TChangePassword) => changePassword(data),
		onSuccess: () => {
			console.log("Password changed successfully");
		},
		onError: (error) => {
			console.error("Failed to change password:", error);
		},
	});
};
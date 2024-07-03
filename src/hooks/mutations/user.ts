import { useMutation } from "@tanstack/react-query";
import { updateAccountInfo } from "../../api/user";
import type { UpdateUserInfo } from "../../types/user.type";

export const useUserInformationMutation = () => {
	return useMutation({
		mutationFn: (data: UpdateUserInfo) => updateAccountInfo(data),
		onSuccess: () => {
			console.log("Password changed successfully");
		},
		onError: (error) => {
			console.error("Failed to change password:", error);
		},
	});
};

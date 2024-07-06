import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { changePassword } from "../../api/auth";

export const useChangePasswordMutation = () => {
	return useMutation({
		mutationFn: changePassword,
		onSuccess: () => {
			toast.success("Password changed successfully");
		},
	});
};

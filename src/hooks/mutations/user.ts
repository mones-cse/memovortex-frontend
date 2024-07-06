import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateAccountInfo } from "../../api/user";

export const useUserInformationMutation = () => {
	return useMutation({
		mutationFn: updateAccountInfo,
		onSuccess: () => {
			toast.success("User Account Info changed successfully");
		},
	});
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
	createCard,
	deleteCard,
	reviewStudyCards,
	updateCard,
} from "./../../api/card";

export const useCreateCardMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createCard,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
			toast.success("Card created successfully");
		},
	});
};

export const useUpdateCardMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateCard,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
			toast.success("Card updated successfully");
		},
	});
};

export const useDeleteCardMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteCard,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
			toast.success("Card deleted successfully");
		},
	});
};

export const useReviewStudyCardsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: reviewStudyCards,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["studyCards"] });
			toast.success("Reviewed successfully");
		},
	});
};

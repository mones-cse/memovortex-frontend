import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createCard, updateCard } from "./../../api/card";

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

// export const useDeleteDeckMutation = () => {
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: (id: string) => deleteDeck(id),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["decks"] });

// 			toast.success("Deck deleted successfully");
// 		},
// 	});
// };

// export const useUpdateDeckMutation = () => {
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: updateDeck,
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["decks"] });
// 			toast.success("Deck updated successfully");
// 		},
// 	});
// };

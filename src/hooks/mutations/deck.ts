import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createDeck, deleteDeck, updateDeck } from "../../api/deck";

export const useCreateDeckMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createDeck,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["decks"] });
			toast.success("Deck created successfully");
		},
	});
};

export const useDeleteDeckMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteDeck(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["decks"] });

			toast.success("Deck deleted successfully");
		},
	});
};

export const useUpdateDeckMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateDeck,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["decks"] });
			toast.success("Deck updated successfully");
		},
	});
};

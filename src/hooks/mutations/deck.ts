import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createDeck, deleteDeck } from "../../api/deck";

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

// export const useCreateNoteMutation = () => {
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: createNotes,
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["notes"] });
// 			// toast.success("Note created successfully");
// 		},
// 	});
// };

// export const useUpdateNoteMutation = () => {
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: updateNotes,
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["notes"] });
// 			toast.success("Note updated successfully");
// 		},
// 	});
// };

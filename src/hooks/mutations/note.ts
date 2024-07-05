import { createNotes, deleteNote, updateNotes } from "../../api/note";
import type { TCreateNote, TUpdateNote } from "../../types/note.type";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateNoteMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: TCreateNote) => createNotes(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notes"] });
			console.log("Note created successfully");
			toast.success("Note created successfully");
		},
		onError: (error) => {
			console.error("Failed to create note:", error);
			toast.error(`Failed to create note ${error}`);
		},
	});
};

export const useUpdateNoteMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: TUpdateNote) => updateNotes(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notes"] });
			console.log("Note updated successfully");
			toast.success("Note updated successfully");
		},
		onError: (error) => {
			console.error("Failed to update note:", error);
			toast.error(`Failed to update note ${error}`);
		},
	});
};

export const useDeleteNoteMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteNote(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notes"] });
			console.log("Note deleted successfully");
		},
		onError: (error) => {
			console.error("Failed to delete note:", error);
		},
	});
};

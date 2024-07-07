import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createNotes, deleteNote, updateNotes } from "../../api/note";

export const useCreateNoteMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createNotes,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notes"] });
			// toast.success("Note created successfully");
		},
	});
};

export const useUpdateNoteMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateNotes,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notes"] });
			toast.success("Note updated successfully");
		},
	});
};

export const useDeleteNoteMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteNote(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notes"] });

			toast.success("Note deleted successfully");
		},
	});
};

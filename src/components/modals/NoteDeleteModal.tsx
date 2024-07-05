import { Button } from "@mantine/core";
import { useDeleteNoteMutation } from "../../hooks/mutations/note";
import { userStore } from "../../stores/store";
import type { ModalProps } from "../../types/modal.type";
export const NoteDeleteModal = ({ noteId }: ModalProps["deleteNote"]) => {
	const store = userStore();
	const { mutateAsync } = useDeleteNoteMutation();
	const handleDeleteNote = () => {
		console.log("Deleting note with id: ", noteId);
		mutateAsync(noteId);
		store.closeModal();
	};
	return (
		<div>
			<p className="my-4">
				Are you sure you want to delete this note? This action is destructive
				and you can not restore your data. {noteId}
			</p>

			<div className="flex gap-1 justify-end">
				<Button variant="filled" onClick={() => store.closeModal()}>
					No don't delete it{" "}
				</Button>
				<Button variant="filled" color="red" onClick={handleDeleteNote}>
					Confirm
				</Button>
			</div>
		</div>
	);
};

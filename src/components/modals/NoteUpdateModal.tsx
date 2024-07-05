import { Button } from "@mantine/core";
import { userStore } from "../../stores/store";
import type { ModalProps } from "../../types/modal.type";

export const NoteUpdateModal = ({
	noteId,
	noteTitle,
	noteContent,
	isNoteFavourite,
	noteBgColor,
}: ModalProps["updateNote"]) => {
	const store = userStore();
	const handleupdateNote = () => {
		console.log("Deleting note with id: ", noteId);
		store.closeModal();
	};
	return (
		<div>
			<p>{noteId}</p>
			<p>{noteTitle}</p>
			<p>{noteContent}</p>
			<p>{`${isNoteFavourite}`}</p>
			<p>{noteBgColor}</p>
			<div className="flex gap-1 justify-end">
				<Button
					variant="outline"
					color="gray"
					onClick={() => store.closeModal()}
				>
					No don't Update it
				</Button>
				<Button variant="filled" color="blue" onClick={handleupdateNote}>
					Confirm
				</Button>
			</div>
		</div>
	);
};

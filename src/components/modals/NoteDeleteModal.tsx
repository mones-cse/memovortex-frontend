import { Button } from "@mantine/core";
import type { ModalProps } from "../../types/modal.type";
export const NoteDeleteModal = ({ noteId }: ModalProps["deleteNote"]) => {
	return (
		<div>
			<p>Delete note no {noteId}</p>

			<Button variant="filled" color="red">
				Confirm
			</Button>
			<Button variant="filled">Cancle</Button>
		</div>
	);
};

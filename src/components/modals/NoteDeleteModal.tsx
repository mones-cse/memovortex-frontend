import { Button } from "@mantine/core";

export const NoteDeleteModal = ({ noteId }: { noteId: string }) => {
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

import { Button, Checkbox, Textarea } from "@mantine/core";
import type { ModalProps } from "../../types/modal.type";

import { Input } from "@mantine/core";
import { useState } from "react";
import { useUpdateNoteMutation } from "../../hooks/mutations/note";
import { userStore } from "../../stores/store";
import { CustomColorPicker } from "../../ui/CustomColorPicker";
export const NoteUpdateModal = ({
	noteId,
	noteTitle,
	noteContent,
	isNoteFavourite,
	noteBgColor,
}: ModalProps["updateNote"]) => {
	const { mutateAsync } = useUpdateNoteMutation();
	const store = userStore();
	const [noteTitleState, setNoteTitleState] = useState(noteTitle);
	const [noteContentState, setNoteContentState] = useState(noteContent);
	const [isNoteFavouriteState, setIsNoteFavouriteState] =
		useState(isNoteFavourite);
	const [noteBgColorState, setNoteBgColorState] = useState(noteBgColor);

	const handleupdateNote = () => {
		console.log("Update note");
		mutateAsync({
			noteTitle: noteTitleState,
			noteContent: noteContentState,
			isNoteFavourite: isNoteFavouriteState,
			noteBgColor: noteBgColorState,
			id: noteId,
		});
		store.closeModal();
	};

	return (
		<div className="py-4">
			<Input.Wrapper label="Note Title" mb="sm">
				<Input
					placeholder=""
					value={noteTitleState}
					onChange={(e) => setNoteTitleState(e.target.value)}
				/>
			</Input.Wrapper>

			<Textarea
				label="Note Details"
				placeholder=""
				autosize
				minRows={4}
				maxRows={8}
				value={noteContentState}
				onChange={(e) => setNoteContentState(e.currentTarget.value)}
				mb="sm"
			/>
			<Checkbox
				label="Make this note star"
				mb="sm"
				checked={isNoteFavouriteState}
				onChange={(event) =>
					setIsNoteFavouriteState(event.currentTarget.checked)
				}
			/>
			<CustomColorPicker
				value={noteBgColorState}
				onChange={setNoteBgColorState}
			/>

			<div className="flex gap-1 justify-end">
				<Button
					variant="outline"
					color="gray"
					onClick={() => store.closeModal()}
				>
					Cancle
				</Button>
				<Button variant="filled" color="blue" onClick={handleupdateNote}>
					Update
				</Button>
			</div>
		</div>
	);
};

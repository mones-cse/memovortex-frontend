import { Button, Checkbox, Textarea } from "@mantine/core";

import { Input } from "@mantine/core";
import { useState } from "react";
import { userStore } from "../../stores/store";
import { CustomColorPicker } from "../../ui/CustomColorPicker";

export const NoteCreateModal = () => {
	const store = userStore();
	const [noteTitle, setNoteTitle] = useState("");
	const [noteContent, setNoteContent] = useState("");
	const [isNoteFavourite, setIsNoteFavourite] = useState(false);
	const [noteBgColor, setNoteBgColor] = useState("#FFFFFF");

	const handleSaveNote = () => {
		console.log("Create new note");
		console.log({ noteTitle, noteContent, isNoteFavourite, noteBgColor });
		store.closeModal();
	};

	return (
		<div className="py-4">
			<Input.Wrapper label="Note Title" mb="sm">
				<Input
					placeholder=""
					value={noteTitle}
					onChange={(e) => setNoteTitle(e.target.value)}
				/>
			</Input.Wrapper>

			<Textarea
				label="Note Details"
				placeholder=""
				autosize
				minRows={4}
				maxRows={8}
				value={noteContent}
				onChange={(e) => setNoteContent(e.currentTarget.value)}
				mb="sm"
			/>
			<Checkbox
				label="Make this note star"
				mb="sm"
				checked={isNoteFavourite}
				onChange={(event) => setIsNoteFavourite(event.currentTarget.checked)}
			/>
			<CustomColorPicker value={noteBgColor} onChange={setNoteBgColor} />

			<div className="flex gap-1 justify-end">
				<Button
					variant="outline"
					color="gray"
					onClick={() => store.closeModal()}
				>
					Cancle
				</Button>
				<Button variant="filled" color="blue" onClick={handleSaveNote}>
					Save
				</Button>
			</div>
		</div>
	);
};

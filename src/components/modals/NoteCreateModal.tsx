import { Button, Checkbox, Textarea } from "@mantine/core";

import { Input } from "@mantine/core";
import { useState } from "react";
import { userStore } from "../../stores/store";

type CustomColorPickerProps = {
	swatches: string[];
	value: string;
	onChange: (x: string) => void;
};

const swatches = [
	"#FFFFFF",
	"#01D4FF",
	"#FFC971",
	"#B692FE",
	"#E4EE90",
	"#E8E9ED",
	"#FF9B73",
];

const CustomColorPicker: React.FC<CustomColorPickerProps> = ({
	swatches,
	value,
	onChange,
}) => (
	<div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
		{swatches.map((color: string) => (
			<button
				type="button"
				key={color}
				onClick={() => onChange(color)}
				style={{
					backgroundColor: color,
					cursor: "pointer",
					width: 30,
					height: 30,
					border: color === value ? "2px solid #444" : "1px solid #ccc",
					borderRadius: "50%",
				}}
			/>
		))}
	</div>
);

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
			<CustomColorPicker
				swatches={swatches}
				value={noteBgColor}
				onChange={setNoteBgColor}
			/>

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

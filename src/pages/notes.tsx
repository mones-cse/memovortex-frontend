import { Button } from "@mantine/core";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { userStore } from "../stores/store";
import { MainContainer } from "../ui/MainContainer";

type NoteType = {
	id: string;
	noteTitle: string;
	noteContent: string;
	isNoteFavourite: boolean;
	noteBgColor: string;
	updatedAt: Date;
};

const notesData = [
	{
		id: "1",
		noteTitle: "Note 1",
		noteContent:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		isNoteFavourite: true,
		noteBgColor: "#FFFFFF",
		updatedAt: new Date(),
	},
	{
		id: "2",
		noteTitle: "Note 2",
		noteContent:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. dummy text ever since the 1500s.",
		isNoteFavourite: false,
		noteBgColor: "bg-blue-200",
		updatedAt: new Date(),
	},
	{
		id: "3",
		noteTitle: "Note 3",
		noteContent:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		isNoteFavourite: false,
		noteBgColor: "bg-yellow-200",
		updatedAt: new Date(),
	},
	{
		id: "4",
		noteTitle: "Note 4",
		noteContent:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		isNoteFavourite: false,
		noteBgColor: "bg-green-200",
		updatedAt: new Date(),
	},
	{
		id: "5",
		noteTitle: "Note 5",
		noteContent:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		isNoteFavourite: false,
		noteBgColor: "bg-pink-200",
		updatedAt: new Date(),
	},
	{
		id: "6",
		noteTitle: "Note 6",
		noteContent:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		isNoteFavourite: false,
		noteBgColor: "bg-orange-200",
		updatedAt: new Date(),
	},
	{
		id: "7",
		noteTitle: "Note 7",
		noteContent:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		isNoteFavourite: false,
		noteBgColor: "bg-yellow-200",
		updatedAt: new Date(),
	},
];

const Note = ({ note }: { note: NoteType }) => {
	const store = userStore();
	const hadleTrashClick = (id: string) => {
		console.log("Trash Clicked");
		store.openModal("deleteNote", "Delete Note", { noteId: id }, "sm");
	};

	const handleEditClick = ({
		id,
		noteTitle,
		noteContent,
		isNoteFavourite,
		noteBgColor,
	}: NoteType) => {
		console.log("Edit Clicked");
		store.openModal("updateNote", "Update Note", {
			noteId: id,
			noteTitle: noteTitle,
			noteContent: noteContent,
			isNoteFavourite: isNoteFavourite,
			noteBgColor: noteBgColor,
		});
	};

	return (
		<div
			className={`${note.noteBgColor} p-4 mb-4 rounded-md h-full shadow-lg flex  flex-col`}
		>
			<div className="flex items-center justify-between">
				<p className="text-xl font-semibold">{note.noteTitle}</p>
				{note.isNoteFavourite && (
					<div className="bg-black p-1 rounded-full">
						<FaStar className="text-yellow-500" />
					</div>
				)}
			</div>

			<p className="text-sm">{note.noteContent}</p>
			<div className="mt-auto">
				<div className="flex items-center justify-between">
					<p className="text-sm text-left">
						{note.updatedAt.toLocaleDateString()}
					</p>
					<div className="flex gap-1 items-center">
						<FaRegTrashAlt
							onClick={() => hadleTrashClick(note.id.toString())}
							className="cursor-pointer transition ease-in-out  delay-50 hover:-translate-y-1 hover:scale-110  duration-150"
						/>
						<button
							onClick={() => {
								handleEditClick(note);
							}}
							type="button"
							className="bg-black  p-1.5 rounded-full cursor-pointer transition ease-in-out  delay-50 hover:-translate-y-1 hover:scale-110  duration-150"
						>
							<FaPen color="white" size={".7rem"} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const Notes = () => {
	const store = userStore();
	const handleNewNote = () => {
		console.log("New Note");
		store.openModal("newNote", "New Note", {}, "lg");
	};

	return (
		<MainContainer withSpace>
			<div className="flex justify-between">
				<p className="text-3xl">Notes</p>
				<Button onClick={handleNewNote}>New Note</Button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
				{notesData.map((note: NoteType) => (
					<div key={note.noteTitle}>
						<Note note={note} />
					</div>
				))}
			</div>
		</MainContainer>
	);
};

export default Notes;

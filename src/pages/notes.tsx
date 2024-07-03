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
	bgColor: string;
	updatedAt: Date;
};

const notesData = [
	{
		id: 1,
		noteTitle: "Note 1",
		noteContent:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		isNoteFavourite: true,
		bgColor: "bg-red-200",
		updatedAt: new Date(),
	},
	{
		id: 2,
		noteTitle: "Note 2",
		noteContent:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. dummy text ever since the 1500s.",
		isNoteFavourite: false,
		bgColor: "bg-blue-200",
		updatedAt: new Date(),
	},
	{
		id: 3,
		noteTitle: "Note 3",
		noteContent:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		isNoteFavourite: false,
		bgColor: "bg-yellow-200",
		updatedAt: new Date(),
	},
	{
		id: 4,
		noteTitle: "Note 4",
		noteContent:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		isNoteFavourite: false,
		bgColor: "bg-green-200",
		updatedAt: new Date(),
	},
	{
		id: 5,
		noteTitle: "Note 5",
		noteContent:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		isNoteFavourite: false,
		bgColor: "bg-pink-200",
		updatedAt: new Date(),
	},
	{
		id: 6,
		noteTitle: "Note 6",
		noteContent:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		isNoteFavourite: false,
		bgColor: "bg-orange-200",
		updatedAt: new Date(),
	},
	{
		id: 7,
		noteTitle: "Note 7",
		noteContent:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		isNoteFavourite: false,
		bgColor: "bg-yellow-200",
		updatedAt: new Date(),
	},
];

const Note = ({ note }: { note: NoteType }) => {
	const store = userStore();

	const hadleTrashClick = (id: string) => {
		console.log("Trash Clicked");
		store.openModal("deleteNote", { noteId: id });
	};

	const handleEditClick = (id: string, noteTitle: string) => {
		console.log("Edit Clicked");
		store.openModal("updateNote", { noteId: id, noteTitle: noteTitle });
	};

	return (
		<div
			className={`${note.bgColor} p-4 mb-4 rounded-md h-full shadow-lg flex  flex-col`}
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
								handleEditClick(note.id.toString(), note.noteTitle);
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
	const handleNewNote = () => {
		console.log("New Note");
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

// <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content=
//         "width=device-width, initial-scale=1.0">
//     <title>Equal Height Columns with Grid</title>
//     <link href=
//         "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
//         rel="stylesheet">
// </head>

// <body>
//     <div class="p-4 grid grid-cols-3 gap-2">
//         <div class="bg-blue-500 p-4 text-white">
//             GeeksforGeeks: A computer science portal for geeks.
//         </div>
//         <div class="bg-green-500 p-4 text-white">HTML</div>
//         <div class="bg-red-500 p-4 text-white">CSS</div>
//     </div>
// </body>

// </html>

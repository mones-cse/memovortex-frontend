import { Button } from "@mantine/core";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useFetchNotesQuery } from "../hooks/queries/note";
import { userStore } from "../stores/store";
import type { TNote } from "../types/note.type";
import { MainContainer } from "../ui/MainContainer";
import { formatDate } from "../utils/dateFormatter";

const Note = ({ note }: { note: TNote }) => {
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
	}: TNote) => {
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
					<p className="text-sm text-left">{formatDate(note.updatedAt)}</p>
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
	const { data, isPending, isError, error } = useFetchNotesQuery();

	const store = userStore();
	const handleNewNote = () => {
		console.log("New Note");
		store.openModal("newNote", "New Note", {}, "lg");
	};

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<MainContainer withSpace>
			<div className="flex justify-between">
				<p className="text-3xl">Notes</p>
				<Button onClick={handleNewNote}>New Note</Button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
				{data?.data?.data.map((note: TNote) => (
					<div key={note.id}>
						<Note note={note} />
					</div>
				))}
			</div>
		</MainContainer>
	);
};

export default Notes;

import { FaPen, FaRegTrashAlt, FaStar } from "react-icons/fa";
import { userStore } from "../../stores/store";
import type { TNote } from "../../types/note.type";
import { formatDate } from "../../utils/dateFormatter";

export const Note = ({ note }: { note: TNote }) => {
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
			className={" p-4 mb-4 rounded-md h-full shadow-lg flex  flex-col"}
			style={{ backgroundColor: note.noteBgColor }}
		>
			<div className="flex items-center justify-between">
				<p className="text-xl font-semibold">{note.noteTitle}</p>
				{note.isNoteFavourite && (
					<div className="bg-black p-1 rounded-full">
						<FaStar className="text-yellow-500" />
					</div>
				)}
			</div>

			<p className="text-sm flex-wrap">{note.noteContent}</p>
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

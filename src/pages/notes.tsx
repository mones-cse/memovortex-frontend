import { Button } from "@mantine/core";
import { useFetchNotesQuery } from "../hooks/queries/note";
import { userStore } from "../stores/store";
import { MainContainer } from "../ui/MainContainer";

import { Note } from "../components/notes/Note";
import type { TNote } from "../types/note.type";

const Notes = () => {
	const { data, isPending, isError, error } = useFetchNotesQuery();
	const store = userStore();
	const handleNewNoteModal = () => {
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
				<Button onClick={handleNewNoteModal}>New Note</Button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
				{data?.data.map((note: TNote) => (
					<div key={note.id}>
						<Note note={note} />
					</div>
				))}
			</div>
		</MainContainer>
	);
};

export default Notes;

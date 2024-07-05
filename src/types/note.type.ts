export type TNote = {
	id: string;
	noteTitle: string;
	noteContent: string;
	isNoteFavourite: boolean;
	noteBgColor: string;
	updatedAt: string;
	createdAt: string;
};

export type TCreateNote = Pick<
	TNote,
	"noteTitle" | "noteContent" | "isNoteFavourite" | "noteBgColor"
>;

export type TUpdateNote = Pick<TNote, "id"> & Partial<TCreateNote>;

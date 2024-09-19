type ModalType =
	| "updateNote"
	| "deleteNote"
	| "newNote"
	| "createFolder"
	| "deleteDocument"
	| "filesUpload"
	| "documentPreview"
	| "renameDocument"
	| "newDeck"
	| "deleteDeck"
	| null;
type ModalSize = "sm" | "md" | "lg" | "xl";

export type ModalProps = {
	updateNote: {
		id: string;
		noteTitle: string;
		noteContent: string;
		isNoteFavourite: boolean;
		noteBgColor: string;
	};
	deleteNote: { noteId: string };
	deleteDocument: { id: string };
	newNote: Record<string, never>;
	createFolder: {
		parentId: string | null;
	};
	filesUpload: {
		parentId: string | null;
	};
	documentPreview: {
		documentUrl: string;
	};
	renameDocument: {
		id: string;
		fileName: string;
	};
	newDeck: Record<string, never>;
	deleteDeck: { deckId: string };
};

type State = {
	modalType: ModalType;
	modalTitle: string;
	modalSize?: ModalSize;
	modalProps: ModalProps extends null
		? Record<string, never>
		: ModalProps[Exclude<ModalType, null>];
};

type Actions = {
	openModal: <T extends Exclude<ModalType, null>>(
		ModalType: T,
		modalTitle: string,
		modalProps: ModalProps[T],
		modalSize?: ModalSize,
	) => void;
	closeModal: () => void;
};

export type TModal = State & Actions;

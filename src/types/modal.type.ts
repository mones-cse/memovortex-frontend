type ModalType = "updateNote" | "deleteNote" | "newNote" | null;
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
	newNote: Record<string, never>;
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

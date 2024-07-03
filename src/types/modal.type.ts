type ModalType = "updateNote" | "deleteNote" | null;

export type ModalProps = {
	updateNote: { noteId: string; noteTitle: string };
	deleteNote: { noteId: string };
};

type State = {
	modalType: ModalType;
	modalProps: ModalProps extends null
		? Record<string, never>
		: ModalProps[Exclude<ModalType, null>];
};

type Actions = {
	openModal: <T extends Exclude<ModalType, null>>(
		ModalType: T,
		modalProps: ModalProps[T],
	) => void;
	closeModal: () => void;
};

export type TModal = State & Actions;

type ModalType = "updateNote" | "deleteNote" | null;
type ModalSize = "sm" | "md" | "lg" | "xl";

export type ModalProps = {
	updateNote: { noteId: string; noteTitle: string };
	deleteNote: { noteId: string };
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

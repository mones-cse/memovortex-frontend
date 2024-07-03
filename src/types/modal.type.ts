type ModalType = "updateNote" | "deleteNote" | null;

type State = {
	modalType: ModalType;
	modalProps: Record<string, unknown>;
};

type Actions = {
	openModal: (
		ModalType: ModalType,
		modalProps?: Record<string, unknown>,
	) => void;
	closeModal: () => void;
};

export type TModal = State & Actions;

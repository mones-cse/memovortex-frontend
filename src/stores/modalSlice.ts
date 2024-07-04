import type { TModal } from "../types/modal.type";

import type { StateCreator } from "zustand";

export const ModalSlice: StateCreator<
	TModal,
	[["zustand/immer", never]],
	[],
	TModal
> = (zustendSet) => ({
	modalType: null,
	modalTitle: "",
	modalProps: {} as TModal["modalProps"],
	openModal: (modalType, modalTitle, modalProps) => {
		zustendSet((state) => {
			state.modalType = modalType;
			state.modalTitle = modalTitle;
			state.modalProps = modalProps;
		});
	},
	closeModal: () => {
		zustendSet((state) => {
			state.modalType = null;
			state.modalProps = {} as TModal["modalProps"];
		});
	},
});

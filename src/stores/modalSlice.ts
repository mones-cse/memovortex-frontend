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
	modalSize: "lg",
	modalProps: {} as TModal["modalProps"],
	openModal: (modalType, modalTitle, modalProps, modalSize) => {
		zustendSet((state) => {
			state.modalType = modalType;
			state.modalTitle = modalTitle;
			state.modalProps = modalProps;
			state.modalSize = modalSize;
		});
	},
	closeModal: () => {
		zustendSet((state) => {
			state.modalType = null;
			state.modalTitle = "";
			state.modalProps = {} as TModal["modalProps"];
			state.modalSize = "lg";
		});
	},
});

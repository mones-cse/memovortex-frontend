import type { TModal } from "../types/modal.type";

import type { StateCreator } from "zustand";

export const ModalSlice: StateCreator<
	TModal,
	[["zustand/immer", never]],
	[],
	TModal
> = (zustendSet) => ({
	modalType: null,
	modalProps: {} as TModal["modalProps"],
	openModal: (modalType, modalProps) => {
		zustendSet((state) => {
			state.modalType = modalType;
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

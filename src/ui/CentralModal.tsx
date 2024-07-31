import { Modal } from "@mantine/core";
import { userStore } from "../stores/store";

import { FolderCreateModal } from "../components/modals/FolderCreateModal";
import { NoteCreateModal } from "../components/modals/NoteCreateModal";
import { NoteDeleteModal } from "../components/modals/NoteDeleteModal";
import { NoteUpdateModal } from "../components/modals/NoteUpdateModal";
import type { ModalProps } from "../types/modal.type";

export const CentralModal = () => {
	const { modalType, closeModal, modalProps, modalTitle, modalSize } =
		userStore();
	console.log("🚀 ~ CentralModal ~ modalType:", modalType);

	const renderModal = () => {
		switch (modalType) {
			case "updateNote":
				return (
					<NoteUpdateModal {...(modalProps as ModalProps["updateNote"])} />
				);
			case "deleteNote":
				return (
					<NoteDeleteModal {...(modalProps as ModalProps["deleteNote"])} />
				);
			case "newNote":
				return <NoteCreateModal />;
			case "createFolder":
				return <FolderCreateModal />;
			default:
				return null;
		}
	};

	return (
		<Modal
			opened={modalType !== null}
			onClose={closeModal}
			title={modalTitle || "Modal Title"}
			size={modalSize || "lg"}
			centered
		>
			{renderModal()}
		</Modal>
	);
};

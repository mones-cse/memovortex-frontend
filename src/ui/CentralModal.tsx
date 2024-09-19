import { Modal } from "@mantine/core";
import { userStore } from "../stores/store";

import { DeckCreateModal } from "../components/modals/DeckCreateModal";
import { DeckDeleteModal } from "../components/modals/DeckDeleteModal";
import { DocumentDeleteModal } from "../components/modals/DocumentDeleteModal";
import { DocumentRenameModal } from "../components/modals/DocumentRenameModal";
import { FilesUploadModal } from "../components/modals/FilesUploadModal";
import { FolderCreateModal } from "../components/modals/FolderCreateModal";
import { NoteCreateModal } from "../components/modals/NoteCreateModal";
import { NoteDeleteModal } from "../components/modals/NoteDeleteModal";
import { NoteUpdateModal } from "../components/modals/NoteUpdateModal";

import { DocumentPreviewModal } from "../components/modals/DocumentPreviewModal";
import type { ModalProps } from "../types/modal.type";

export const CentralModal = () => {
	const { modalType, closeModal, modalProps, modalTitle, modalSize } =
		userStore();

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
				return (
					<FolderCreateModal {...(modalProps as ModalProps["createFolder"])} />
				);
			case "filesUpload":
				return (
					<FilesUploadModal {...(modalProps as ModalProps["filesUpload"])} />
				);
			case "deleteDocument":
				return (
					<DocumentDeleteModal
						{...(modalProps as ModalProps["deleteDocument"])}
					/>
				);
			case "documentPreview":
				return (
					<DocumentPreviewModal
						{...(modalProps as ModalProps["documentPreview"])}
					/>
				);
			case "renameDocument":
				return (
					<DocumentRenameModal
						{...(modalProps as ModalProps["renameDocument"])}
					/>
				);
			case "newDeck":
				return <DeckCreateModal />;
			case "deleteDeck":
				return (
					<DeckDeleteModal {...(modalProps as ModalProps["deleteDeck"])} />
				);
			default:
				return null;
		}
	};

	const modalSizeCalculate = () => {
		if (modalSize) {
			if (modalSize === "xl") {
				return "70%";
			}
			return modalSize;
		}
		return "lg";
	};

	return (
		<Modal
			opened={modalType !== null}
			onClose={closeModal}
			title={modalTitle || "Modal Title"}
			size={modalSizeCalculate()}
			centered
		>
			{renderModal()}
		</Modal>
	);
};

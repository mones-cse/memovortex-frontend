import { Modal } from "@mantine/core";
import { userStore } from "../stores/store";

import { NoteDeleteModal } from "../components/modals/NoteDeleteModal";

export const CentralModal = () => {
	const { modalType, closeModal, modalProps } = userStore();
	console.log("🚀 ~ CentralModal ~ modalProps:", modalProps);

	const renderModal = () => {
		switch (modalType) {
			case "updateNote":
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				return <div>Update Modal</div>;
			case "deleteNote":
				// todo: fix this

				return <NoteDeleteModal {...modalProps} />;
			default:
				return null;
		}
	};

	return (
		<Modal
			opened={modalType !== null}
			onClose={closeModal}
			title="Modal Title"
			size="xl"
		>
			{renderModal()}
		</Modal>
	);
};

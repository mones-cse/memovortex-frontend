import { Button } from "@mantine/core";
import { useDeleteDocumentMutation } from "../../hooks/mutations/document";
import { userStore } from "../../stores/store";
import type { ModalProps } from "../../types/modal.type";
export const DocumentDeleteModal = ({ id }: ModalProps["deleteDocument"]) => {
	const store = userStore();
	const { mutateAsync } = useDeleteDocumentMutation();
	const handleDeleteDocument = async () => {
		await mutateAsync(id);
		store.closeModal();
	};
	return (
		<div>
			<p className="my-4">
				Are you sure you want to delete this? This action is destructive and you
				can not restore your data.
			</p>

			<div className="flex gap-1 justify-end">
				<Button variant="filled" onClick={() => store.closeModal()}>
					No don't delete it{" "}
				</Button>
				<Button variant="filled" color="red" onClick={handleDeleteDocument}>
					Confirm
				</Button>
			</div>
		</div>
	);
};

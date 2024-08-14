import { Button, Input } from "@mantine/core";
import { useState } from "react";
import { useRenameDocumentMutation } from "../../hooks/mutations/document";
import { userStore } from "../../stores/store";
import type { ModalProps } from "../../types/modal.type";
export const DocumentRenameModal = ({
	id,
	fileName,
}: ModalProps["renameDocument"]) => {
	const store = userStore();
	const [documentName, setDocumentName] = useState(fileName);
	const { mutateAsync } = useRenameDocumentMutation();
	const handleRenameDocument = async () => {
		await mutateAsync({ id, fileName: documentName });
		store.closeModal();
	};
	return (
		<div>
			<p className="my-4">
				Are you sure you want to rename this? This action is destructive and you
				can not restore your data.????
			</p>
			<Input
				type="text"
				value={documentName}
				onChange={(e) => setDocumentName(e.target.value)}
			/>
			<br />

			<div className="flex gap-1 justify-end">
				<Button variant="filled" onClick={() => store.closeModal()}>
					No don't delete it{" "}
				</Button>
				<Button variant="filled" color="red" onClick={handleRenameDocument}>
					Confirm
				</Button>
			</div>
		</div>
	);
};

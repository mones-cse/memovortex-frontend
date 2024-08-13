import { Button, Progress } from "@mantine/core";
import { useState } from "react";
import type { ChangeEventHandler } from "react";
import { useDocumentUpload } from "../../hooks/mutations/document";
import { userStore } from "../../stores/store";

export const FilesUploadModal = ({ parentId }: { parentId: string | null }) => {
	const store = userStore();

	const [file, setFile] = useState({ name: "", type: "", size: 0 });
	const { uploadDocument, uploadProgress } = useDocumentUpload({ parentId });

	const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};
	const handleUpload = async () => {
		if (!file) return;
		const result = await uploadDocument(file as File);
		console.log(result);
	};

	return (
		<div className="py-4">
			<input type="file" accept={"image/*"} onChange={handleFileChange} />
			{uploadProgress > 0 && <Progress value={uploadProgress} />}
			<div className="flex gap-1 justify-end">
				<Button
					variant="outline"
					color="gray"
					onClick={() => store.closeModal()}
				>
					Cancle
				</Button>
				<Button variant="filled" color="blue" onClick={handleUpload}>
					Upload
				</Button>
			</div>
		</div>
	);
};

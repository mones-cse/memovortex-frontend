import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
// import type { AxiosProgressEvent } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import {
	createDocument,
	createFolder,
	deleteDocument,
	generateS3UploadUrl,
	renameDocument,
	uploadFileToS3,
} from "../../api/document";

export const useCreateDocumentMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createDocument,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["documents"] });
			toast.success("Document created successfully");
		},
	});
};

export const useGenerateS3UploadUrlMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: generateS3UploadUrl,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["upload-url"] });
		},
	});
};

export const useDocumentUpload = ({
	parentId,
}: { parentId: string | null }) => {
	const [uploadProgress, setUploadProgress] = useState(0);

	const { mutateAsync: generateS3UploadUrlMutate } =
		useGenerateS3UploadUrlMutation();
	const { mutateAsync: createDocumentMutate } = useCreateDocumentMutation();

	const uploadDocument = async (file: File) => {
		try {
			const randomFileName = `${Math.random().toString(36).substring(2, 15) + Date.now().toString(36)}-${file.name}`;
			const data = await generateS3UploadUrlMutate({
				fileName: randomFileName,
				fileType: file.type,
			});

			await uploadFileToS3({
				url: data.data.url,
				file,
				onUploadProgress: (progressEvent) => {
					const progress = Math.round(
						(progressEvent.loaded * 100) / (progressEvent.total || 1),
					);
					setUploadProgress(progress);
				},
			});

			const documentData = {
				fileName: file.name,
				fileType: file.name.split(".").pop() || "uncategorized",
				mimeType: file.type,
				fileSize: BigInt(file.size),
				fileS3key: randomFileName,
				category: "file",
				parentId: parentId,
				isDirectory: false,
			};
			return createDocumentMutate(documentData);
		} catch (error) {
			if (isAxiosError(error)) {
				toast.error(
					error.response?.data?.message || error.message || "An error occurred",
				);
			} else {
				toast.error("An error occurred");
			}
		} finally {
			setUploadProgress(0);
		}
	};

	return { uploadDocument, uploadProgress };
};

export const useCreateFolderMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createFolder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["documents"] });
			toast.success("Folder created successfully");
		},
	});
};

export const useDeleteDocumentMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteDocument(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["documents"] });
			toast.success("Document deleted successfully");
		},
	});
};

export const useRenameDocumentMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: renameDocument,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["documents"] });
			toast.success("Document renamed successfully");
		},
	});
};

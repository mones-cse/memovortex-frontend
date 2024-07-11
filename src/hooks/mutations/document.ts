import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
// import type { AxiosProgressEvent } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import {
	createDocument,
	generateS3UploadUrl,
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

export const useDocumentUpload = () => {
	const [uploadProgress, setUploadProgress] = useState(0);

	const { mutateAsync: generateS3UploadUrlMutate } =
		useGenerateS3UploadUrlMutation();
	const { mutateAsync: createDocumentMutate } = useCreateDocumentMutation();

	const uploadDocument = async (file: File) => {
		try {
			const data = await generateS3UploadUrlMutate({
				fileName: file.name,
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
				fileS3key: file.name,
				category: "file",
				parentId: null,
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

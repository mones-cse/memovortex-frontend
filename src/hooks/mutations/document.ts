import { useMutation, useQueryClient } from "@tanstack/react-query";
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
			// toast.success("Generate s3 upload url successfully");
		},
	});
};

export const useDocumentUpload = () => {
	const [uploadProgress, setUploadProgress] = useState(0);

	const { mutateAsync } = useGenerateS3UploadUrlMutation();
	const { mutateAsync: createDocumentMutate } = useCreateDocumentMutation();

	const uploadDocument = async (file: File) => {
		console.log("called", file);

		try {
			const data = await mutateAsync({
				fileName: file.name,
				fileType: file.type,
			});

			try {
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
			} catch (error) {
				console.error("Upload fuck", error);
				throw error;
			}

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
			const result = await createDocumentMutate(documentData);
			return result;
		} catch (error) {
			console.error("Upload failed", error);
		} finally {
			setUploadProgress(0);
		}
	};

	return { uploadDocument, uploadProgress };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createDocument, generateS3UploadUrl } from "../../api/document";

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

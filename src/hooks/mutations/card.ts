import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
	createCard,
	deleteCard,
	reviewStudyCards,
	updateCard,
} from "./../../api/card";
import { generateS3UploadUrl, uploadFileToS3 } from "./../../api/document";

import type {
	ImageItem,
	TCreateCardFormData,
	TUpdateCardFormData,
} from "../../types/card.type";

const uploadImageToS3 = async (
	image: ImageItem,
): Promise<string | undefined> => {
	const fileName = `${Math.random().toString(36).substring(2, 15) + Date.now().toString(36)}-${image.file.name}`;
	const fileType = image.file.type;
	const signedUrlResult = await generateS3UploadUrl({
		fileName,
		fileType,
	});

	const result = await uploadFileToS3({
		url: signedUrlResult.data.url,
		file: image.file,
		onUploadProgress: (progressEvent) => {
			console.log("Upload progress:", progressEvent);
		},
	});

	return result.status === 200 ? fileName : undefined;
};

const uploadMultipleImages = async (
	images: ImageItem[] = [],
): Promise<string[]> => {
	const uploadedFileNames: string[] = [];

	for (const image of images) {
		const fileName = await uploadImageToS3(image);
		if (fileName) {
			uploadedFileNames.push(fileName);
		}
	}

	return uploadedFileNames;
};

const isNewImageAvailable = (data: TUpdateCardFormData): boolean => {
	return Boolean(data.newFrontImages?.length || data.newBackImages?.length);
};

export const useCreateCardMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: TCreateCardFormData) => {
			const dataToCreateCard = {
				deckId: data.deckId,
				frontText: data.frontText,
				backText: data.backText,
				cardType: data.cardType,
				frontImage: [] as string[],
				backImage: [] as string[],
			};

			// check if data has frontImage and backImage has any value
			if (data.frontImage.length > 0) {
				const uploadedFrontImages = await uploadMultipleImages(data.frontImage);
				dataToCreateCard.frontImage.push(...uploadedFrontImages);
			}
			if (data.backImage.length > 0) {
				const uploadedBackImages = await uploadMultipleImages(data.backImage);
				dataToCreateCard.backImage.push(...uploadedBackImages);
			}
			console.log("🔥🔥🔥🔥 mutaion ->", dataToCreateCard);
			const result = await createCard(dataToCreateCard);
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
			toast.success("Card created successfully");
		},
	});
};

export const useUpdateCardMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: TUpdateCardFormData) => {
			try {
				const dataToCreateCard = {
					deckId: data.deckId,
					frontText: data.frontText,
					backText: data.backText,
					cardType: data.cardType,
					frontImage: data.frontImage,
					backImage: data.backImage,
				};

				if (isNewImageAvailable(data)) {
					console.log("found new images to upload");

					if (data.newFrontImages && data.newFrontImages.length > 0) {
						const uploadedFrontImages = await uploadMultipleImages(
							data.newFrontImages,
						);
						dataToCreateCard.frontImage.push(...uploadedFrontImages);
					}

					if (data.newBackImages && data.newBackImages.length > 0) {
						const uploadedBackImages = await uploadMultipleImages(
							data.newBackImages,
						);
						dataToCreateCard.backImage.push(...uploadedBackImages);
					}
				}

				const result = await updateCard({
					id: data.id,
					...dataToCreateCard,
				});
				return result;
			} catch (error) {
				console.error("Error in useUpdateCardMutation:", error);
				toast.error("Error updating card");
				throw error; // Rethrow the error to be handled by the mutation
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
			toast.success("Card updated successfully");
		},
	});
};

export const useDeleteCardMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteCard,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
			toast.success("Card deleted successfully");
		},
	});
};

export const useReviewStudyCardsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: reviewStudyCards,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["studyCards"] });
			toast.success("Reviewed successfully");
		},
	});
};

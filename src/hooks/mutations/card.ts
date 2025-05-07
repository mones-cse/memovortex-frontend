import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createCard, deleteCard, reviewStudyCards, updateCard } from "./../../api/card";
import { generateS3UploadUrl, uploadFileToS3 } from "./../../api/document";

import type { ImageItem, TCreateCardFormData, TUpdateCardFormData } from "../../types/card.type";

const uploadImageToS3 = async (
	image: ImageItem,
	onProgress: (progress: number) => void,
): Promise<string | undefined> => {
	const fileName = `${
		Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
	}-${image.file.name}`;
	const fileType = image.file.type;
	const signedUrlResult = await generateS3UploadUrl({
		fileName,
		fileType,
	});

	const result = await uploadFileToS3({
		url: signedUrlResult.data.url,
		file: image.file,
		onUploadProgress: (progressEvent) => {
			if (progressEvent.total) {
				const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				onProgress(percentCompleted);
			}
		},
	});

	return result.status === 200 ? fileName : undefined;
};

const uploadMultipleImages = async (
	images: ImageItem[],
	onImageProgress: (index: number, progress: number) => void,
): Promise<string[]> => {
	const uploadedFileNames: string[] = [];

	// use empty array to store progress for each image
	const imagesToUpload = images || [];

	for (let i = 0; i < imagesToUpload.length; i++) {
		const image = imagesToUpload[i];
		const fileName = await uploadImageToS3(image, (progress) => onImageProgress(i, progress));
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
		mutationFn: async (
			data: TCreateCardFormData & {
				onImageProgress?: (side: "front" | "back", index: number, progress: number) => void;
			},
		) => {
			const dataToCreateCard = {
				deckId: data.deckId,
				frontText: data.frontText,
				backText: data.backText,
				cardType: data.cardType,
				frontImage: [] as string[],
				backImage: [] as string[],
				multipleChoiceOptions: data.multipleChoiceOptions,
			};

			// Upload front images with progress tracking
			if (data.frontImage.length > 0) {
				const uploadedFrontImages = await uploadMultipleImages(
					data.frontImage,
					(index, progress) => {
						if (data.onImageProgress) {
							// Instead of passing onImageProgress directly,
							// we change the function for specific front side
							data.onImageProgress("front", index, progress);
						}
					},
				);
				dataToCreateCard.frontImage.push(...uploadedFrontImages);
			}

			// Upload back images with progress tracking
			if (data.backImage.length > 0) {
				const uploadedBackImages = await uploadMultipleImages(data.backImage, (index, progress) => {
					if (data.onImageProgress) {
						// Instead of passing onImageProgress directly,
						// we change the function for specific back side
						data.onImageProgress("back", index, progress);
					}
				});
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
		mutationFn: async (
			data: TUpdateCardFormData & {
				onImageProgress?: (side: "front" | "back", index: number, progress: number) => void;
			},
		) => {
			try {
				const dataToCreateCard = {
					deckId: data.deckId,
					frontText: data.frontText,
					backText: data.backText,
					cardType: data.cardType,
					frontImage: data.frontImage,
					backImage: data.backImage,
					multipleChoiceOptions: data.multipleChoiceOptions,
				};

				if (isNewImageAvailable(data)) {
					console.log("found new images to upload");

					if (data.newFrontImages && data.newFrontImages.length > 0) {
						const uploadedFrontImages = await uploadMultipleImages(
							data.newFrontImages,
							(index, progress) => {
								if (data.onImageProgress) {
									// Instead of passing onImageProgress directly,
									// we change the function for specific front side
									data.onImageProgress("front", index, progress);
								}
							},
						);
						dataToCreateCard.frontImage.push(...uploadedFrontImages);
					}

					if (data.newBackImages && data.newBackImages.length > 0) {
						const uploadedBackImages = await uploadMultipleImages(
							data.newBackImages,
							(index, progress) => {
								if (data.onImageProgress) {
									// Instead of passing onImageProgress directly,
									// we change the function for specific back side
									data.onImageProgress("back", index, progress);
								}
							},
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

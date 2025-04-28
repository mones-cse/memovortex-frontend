import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
	createCard,
	deleteCard,
	reviewStudyCards,
	updateCard,
} from "./../../api/card";
import { generateS3UploadUrl, uploadFileToS3 } from "./../../api/document";

import type { ImageItem, TCreateCardFormData } from "../../types/card.type";

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

			const generateS3FileKey = async (image: ImageItem) => {
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
						console.log(
							"🚀 ~ file: card.ts:20 ~ useCreateCardMutation ~ progressEvent:",
							progressEvent,
						);
					},
				});
				if (result.status === 200) {
					return fileName;
				}
			};

			// check if data has frontImage and backImage has any value
			if (data.frontImage.length > 0) {
				for (const image of data.frontImage) {
					const temp = await generateS3FileKey(image);
					if (temp) {
						dataToCreateCard.frontImage.push(temp);
					}
				}
			}
			if (data.backImage.length > 0) {
				for (const image of data.backImage) {
					const temp = await generateS3FileKey(image);
					if (temp) {
						dataToCreateCard.backImage.push(temp);
					}
				}
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
		mutationFn: updateCard,
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

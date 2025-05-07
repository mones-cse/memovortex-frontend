import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { toast } from "react-toastify";
import { cardSchemas } from "../../schemas/index.schemas";
import type { ImageItem, TCardData } from "../../types/card.type";
import { useUpdateCardMutation } from "../mutations/card";

export const useCardUpdateForm = (selectedCard: TCardData, onUpdate: () => void) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { mutateAsync: updateCard } = useUpdateCardMutation();

	const form = useForm({
		mode: "controlled",
		initialValues: {
			frontText: selectedCard.cardContent.frontText,
			backText: selectedCard.cardContent.backText,
			cardType: selectedCard.cardContent.cardType,
			frontImage: selectedCard.cardContent.frontImage,
			backImage: selectedCard.cardContent.backImage,
			newBackImages: [] as ImageItem[],
			newFrontImages: [] as ImageItem[],
			multipleChoiceOptions: selectedCard.cardContent.multipleChoiceOptions,
		},
		validate: zodResolver(cardSchemas.cardUpdateSchema),
		validateInputOnChange: true,
	});

	const [uploadProgress, setUploadProgress] = useState<{
		front: Record<number, number>;
		back: Record<number, number>;
	}>({
		front: {},
		back: {},
	});

	const handleImageProgress = (side: "front" | "back", index: number, progress: number) => {
		setUploadProgress((prev) => ({
			...prev,
			[side]: {
				...prev[side],
				[index]: progress,
			},
		}));
	};

	const handleUpdateCard = async (values: typeof form.values) => {
		console.log("Form values:", values);
		setIsSubmitting(true);
		if (form.isValid()) {
			try {
				await updateCard({
					...values,
					id: selectedCard.card.id,
					deckId: selectedCard.card.deckId,
					onImageProgress: handleImageProgress,
				});

				// TODO: remove onUpdate and make updatebutton disabled till the form is dirty
				setIsSubmitting(false);
				onUpdate();
			} catch (error) {
				console.error("Error updating card:", error);
				setIsSubmitting(false);
				toast.error("Error updating card");
			}
		} else {
			setIsSubmitting(false);
			console.log("Form validation failed:", form.errors);
			const errors = Object.entries(form.errors)
				.map(([field, error]) => `${field}: ${error}`)
				.join("\n");
			toast.error(`Form validation failed:\n${errors}`);
		}
	};

	const handleRemoveImage = (isFront: boolean) => (s3FileKey: string) => {
		const field = isFront ? "frontImage" : "backImage";
		const currentImages = form.values[field];

		// Toggle the image: if it exists remove it, if it doesn't exist add it
		if (currentImages.includes(s3FileKey)) {
			form.setFieldValue(
				field,
				currentImages.filter((key) => key !== s3FileKey),
			);
		} else {
			form.setFieldValue(field, [...currentImages, s3FileKey]);
		}
	};

	return {
		form,
		handleUpdateCard,
		isSubmitting,
		uploadProgress,
		handleRemoveImage,
	};
};

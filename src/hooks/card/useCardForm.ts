import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { cardSchemas } from "../../schemas/index.schemas";
import { userStore } from "../../stores/store";
import type { ImageItem } from "../../types/card.type";
import { useCreateCardMutation } from "../mutations/card";

export const useCardForm = (deckId: string) => {
	const store = userStore();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [uploadProgress, setUploadProgress] = useState<{
		front: Record<number, number>;
		back: Record<number, number>;
	}>({
		front: {},
		back: {},
	});
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			frontText: "",
			frontImage: [] as ImageItem[],
			backText: "",
			backImage: [] as ImageItem[],
			cardType: "BASIC" as "BASIC" | "MULTIPLE_CHOICE",
			multipleChoiceOptions: [
				{ id: "opt1", text: "", isCorrect: true },
				{ id: "opt2", text: "", isCorrect: false },
				{ id: "opt3", text: "", isCorrect: false },
				{ id: "opt4", text: "", isCorrect: false },
			],
		},
		validate: zodResolver(cardSchemas.cardCreateSchema),
		validateInputOnChange: true,
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
	const { mutateAsync: useCreate } = useCreateCardMutation();
	const handleSaveCard = async (values: typeof form.values) => {
		console.log("Form values:", values);
		console.log("Form errors:", form.errors);
		console.log("Form valid?", form.isValid());

		setIsSubmitting(true);
		setUploadProgress({ front: {}, back: {} });
		if (form.isValid()) {
			try {
				const useCreateMutation = await useCreate({
					...values,
					deckId,
					onImageProgress: handleImageProgress,
				});
				if (useCreateMutation.isSuccess || useCreateMutation.isError) {
					setIsSubmitting(false);
				}
				store.closeModal();
			} catch (error) {
				console.error("Error creating card:", error);
				setIsSubmitting(false);
			}
		} else {
			setIsSubmitting(false);
		}
	};
	return { form, handleSaveCard, uploadProgress, isSubmitting, setIsSubmitting };
};

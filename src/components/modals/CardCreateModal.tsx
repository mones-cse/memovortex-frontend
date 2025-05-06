import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import { useCreateCardMutation } from "../../hooks/mutations/card";
import { cardSchemas } from "../../schemas/index.schemas";
import { userStore } from "../../stores/store";
import type { ImageItem } from "../../types/card.type";
import type { ModalProps } from "../../types/modal.type";
import { LoadingSpinner } from "../../ui/LoadingSpinner";
import { BasicCardForm } from "../card/BasicCardForm";
import { CardFormButtons } from "../card/CardFormButtons";
import { CardTypeSelector } from "../card/CardTypeSelector";
import { MultipleChoiceForm } from "../card/MultipleChoiceForm";

export const CardCreateModal = ({ deckId }: ModalProps["newCard"]) => {
	const store = userStore();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [cardType, setCardType] = useState<"BASIC" | "MULTIPLE_CHOICE">("BASIC");
	const [uploadProgress, setUploadProgress] = useState<{
		front: Record<number, number>;
		back: Record<number, number>;
	}>({
		front: {},
		back: {},
	});

	const { mutateAsync: useCreate } = useCreateCardMutation();
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

	const showLoadingIndicator =
		isSubmitting &&
		!Object.keys(uploadProgress.front).length &&
		!Object.keys(uploadProgress.back).length;

	return (
		<div className="py-2">
			<form onSubmit={form.onSubmit(handleSaveCard)}>
				<CardTypeSelector form={form} setCardType={setCardType} />

				{cardType === "BASIC" ? (
					<BasicCardForm form={form} uploadProgress={uploadProgress} isSubmitting={isSubmitting} />
				) : (
					<MultipleChoiceForm
						form={form}
						uploadProgress={uploadProgress}
						isSubmitting={isSubmitting}
					/>
				)}

				{showLoadingIndicator && <LoadingSpinner />}

				<CardFormButtons isSubmitting={isSubmitting} form={form} />
			</form>
		</div>
	);
};

// TODO: fillup form in multiple choice then switch to basic then fillup form after that submit
// will have multiple choice options in the basic card which is not correct

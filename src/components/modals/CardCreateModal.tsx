import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import { useCreateCardMutation } from "../../hooks/mutations/card";
import { cardSchemas } from "../../schemas/index.schemas";
import { userStore } from "../../stores/store";
import type { ImageItem } from "../../types/card.type";
import type { ModalProps } from "../../types/modal.type";
import { CardFormButtons } from "../card/CardFormButtons";
import { CardImageUploadProgress } from "../card/CardImageUploadProgress";
import { CardTypeSelector } from "../card/CardTypeSelector";
import MinimalInputWithImages from "../card/MinimalInputWithImages";
import { MultipleChoiceOptions } from "../card/MultipleChoiceOptions";

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
		// TODO: After refactor uncomment this code
		setIsSubmitting(true);
		// Reset progress
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

	const displayMultipleChoiceFormErrors = () => {
		if (!Object.keys(form.errors).length) return null;
		console.log("Form errors:", form.errors);
		return <p className="text-sm text-red-500">{form.errors.multipleChoiceOptions || ""}</p>;
	};

	return (
		<div className="py-2">
			<form onSubmit={form.onSubmit(handleSaveCard)}>
				<CardTypeSelector form={form} setCardType={setCardType} />
				{cardType === "BASIC" ? (
					<section>
						<MinimalInputWithImages
							label="Card Front"
							form={form}
							formKeyText={"frontText"}
							formKeyImage={"frontImage"}
						/>
						<CardImageUploadProgress
							images={form.getValues().frontImage}
							// images={form.values.frontImage}
							uploadProgress={uploadProgress.front}
							isSubmitting={isSubmitting}
						/>

						<MinimalInputWithImages
							label="Card Back"
							form={form}
							formKeyText={"backText"}
							formKeyImage={"backImage"}
						/>
						<CardImageUploadProgress
							images={form.getValues().backImage}
							uploadProgress={uploadProgress.back}
							isSubmitting={isSubmitting}
						/>
					</section>
				) : (
					<section>
						<MinimalInputWithImages
							label="Question"
							form={form}
							formKeyText={"frontText"}
							formKeyImage={"frontImage"}
						/>
						<CardImageUploadProgress
							images={form.getValues().frontImage}
							uploadProgress={uploadProgress.front}
							isSubmitting={isSubmitting}
						/>

						<MultipleChoiceOptions form={form} />

						{displayMultipleChoiceFormErrors()}
						<p className="text-gray-600 text-sm mt-2.5">
							Select the radio button next to correct answer option
						</p>
						<MinimalInputWithImages
							label="Explanation (Optional)"
							form={form}
							formKeyText={"backText"}
							formKeyImage={"backImage"}
						/>
						<CardImageUploadProgress
							images={form.getValues().backImage}
							uploadProgress={uploadProgress.back}
							isSubmitting={isSubmitting}
						/>
					</section>
				)}

				{isSubmitting &&
					!Object.keys(uploadProgress.front).length &&
					!Object.keys(uploadProgress.back).length && (
						<p className="text-sm font-bold text-gray-900 mt-2">
							Creating ... <span className="inline-block animate-spin duration-[500ms]">↻</span>
						</p>
					)}

				<CardFormButtons isSubmitting={isSubmitting} form={form} />
			</form>
		</div>
	);
};

// TODO: fillup form in multiple choice then switch to basic then fillup form after that submit
// will have multiple choice options in the basic card which is not correct

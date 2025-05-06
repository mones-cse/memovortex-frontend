import { Button, Progress, Radio, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import { useCreateCardMutation } from "../../hooks/mutations/card";
import { cardSchemas } from "../../schemas/index.schemas";
import { userStore } from "../../stores/store";
import type { ImageItem } from "../../types/card.type";
import type { ModalProps } from "../../types/modal.type";
import { CardTypeSelector } from "../card/CardTypeSelector";
import MinimalInputWithImages from "../card/MinimalInputWithImages";

export const CardCreateModal = ({ deckId }: ModalProps["newCard"]) => {
	const store = userStore();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [seletedRadioIndex, setSelectedRadioIndex] = useState<number | null>(0);
	const [cardType, setCardType] = useState<"BASIC" | "MULTIPLE_CHOICE">(
		"BASIC",
	);
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

	const handleImageProgress = (
		side: "front" | "back",
		index: number,
		progress: number,
	) => {
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
		// setIsSubmitting(true);
		// // Reset progress
		// setUploadProgress({ front: {}, back: {} });

		// if (form.isValid()) {
		// 	try {
		// 		const useCreateMutation = await useCreate({
		// 			...values,
		// 			deckId,
		// 			onImageProgress: handleImageProgress,
		// 		});
		// 		if (useCreateMutation.isSuccess || useCreateMutation.isError) {
		// 			setIsSubmitting(false);
		// 		}
		// 		store.closeModal();
		// 	} catch (error) {
		// 		console.error("Error creating card:", error);
		// 		setIsSubmitting(false);
		// 	}
		// } else {
		// 	setIsSubmitting(false);
		// }
	};

	// Helper to render progress bars for images
	const renderImageProgress = (side: "front" | "back", images: ImageItem[]) => {
		// Get all the indices from the progress object
		const indices = Object.keys(uploadProgress[side]).map(Number);

		if (!isSubmitting || (!images.length && !indices.length)) return null;

		// Store image file names in a ref to keep them available during upload
		const imageFileNames = images.map((img) => img.file.name);

		return (
			<div className="mt-2 space-y-2">
				{indices.map((index) => (
					<div key={index} className="flex items-center">
						<div className="w-8 text-xs">
							{uploadProgress[side][index] || 0}%
						</div>
						<div className="flex-1">
							<Progress
								value={uploadProgress[side][index] || 0}
								color={uploadProgress[side][index] === 100 ? "green" : "blue"}
								size="sm"
								radius="xl"
							/>
						</div>
						<div className="ml-2 text-xs truncate max-w-[120px]">
							{index < imageFileNames.length
								? imageFileNames[index]
								: `Image ${index + 1}`}
						</div>
					</div>
				))}
			</div>
		);
	};

	const handleCorrectOptionChange = (index: number) => {
		// Create a new array with all options set to isCorrect: false

		const newOptions = form.values.multipleChoiceOptions.map((option, i) => ({
			...option,
			isCorrect: i === index,
		}));
		setSelectedRadioIndex(index);

		// Update the form with the new options
		form.setFieldValue("multipleChoiceOptions", newOptions);
	};

	const displayMultipleChoiceFormErrors = () => {
		if (!Object.keys(form.errors).length) return null;
		console.log("Form errors:", form.errors);
		return (
			<p className="text-sm text-red-500">
				{form.errors.multipleChoiceOptions || ""}
			</p>
		);
	};

	return (
		<div className="py-2">
			<form onSubmit={form.onSubmit(handleSaveCard)}>
				<CardTypeSelector form={form} setCardType={setCardType} />

				{cardType === "BASIC" ? (
					<section>
						<MinimalInputWithImages
							lable="Card Front"
							form={form}
							formKeyText={"frontText"}
							formKeyImage={"frontImage"}
						/>
						{renderImageProgress("front", form.values.frontImage)}

						<MinimalInputWithImages
							lable="Card Back"
							form={form}
							formKeyText={"backText"}
							formKeyImage={"backImage"}
						/>
						{renderImageProgress("back", form.values.backImage)}
					</section>
				) : (
					<section>
						<MinimalInputWithImages
							lable="Question"
							form={form}
							formKeyText={"frontText"}
							formKeyImage={"frontImage"}
						/>
						{renderImageProgress("front", form.values.frontImage)}
						<p className="mt-4 font-semibold">Answer Options</p>
						{form.values.multipleChoiceOptions.map((option, index) => (
							<div
								key={option.id}
								className="flex items-center gap-2 my-2 justify-center"
							>
								<Radio
									checked={index === seletedRadioIndex}
									onChange={() => handleCorrectOptionChange(index)}
								/>
								<TextInput
									className="flex-1"
									placeholder={
										option.isCorrect
											? "Enter correct answer option..."
											: "Enter incorrect option..."
									}
									{...form.getInputProps(`multipleChoiceOptions.${index}.text`)}
								/>
							</div>
						))}

						{displayMultipleChoiceFormErrors()}
						<p className="text-gray-600 text-sm mt-2.5">
							Select the radio button next to correct answer option
						</p>
						<MinimalInputWithImages
							lable="Explanation (Optional)"
							form={form}
							formKeyText={"backText"}
							formKeyImage={"backImage"}
						/>
						{renderImageProgress("back", form.values.backImage)}
					</section>
				)}

				{isSubmitting &&
					!Object.keys(uploadProgress.front).length &&
					!Object.keys(uploadProgress.back).length && (
						<p className="text-sm font-bold text-gray-900 mt-2">
							Creating ...{" "}
							<span className="inline-block animate-spin duration-[500ms]">
								↻
							</span>
						</p>
					)}

				<div className="flex gap-1 justify-end mt-4">
					<Button
						variant="outline"
						color="gray"
						onClick={() => store.closeModal()}
						disabled={isSubmitting}
					>
						Cancel
					</Button>
					<Button
						variant="filled"
						color="blue"
						type="submit"
						disabled={!form.isDirty() || isSubmitting}
					>
						{isSubmitting ? "Saving..." : "Save"}
					</Button>
				</div>
			</form>
		</div>
	);
};

// TODO: fillup form in multiple choice then switch to basic then fillup form after that submit
// will have multiple choice options in the basic card which is not correct

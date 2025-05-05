import { Button, Input, Progress } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useCreateCardMutation } from "../../hooks/mutations/card";
import { cardSchemas } from "../../schemas/index.schemas";
import { userStore } from "../../stores/store";
import type { ImageItem } from "../../types/card.type";
import type { ModalProps } from "../../types/modal.type";
import MinimalInputWithImages from "../card/MinimalInputWithImages";

export const CardCreateModal = ({ deckId }: ModalProps["newCard"]) => {
	const store = userStore();
	const [isSubmitting, setIsSubmitting] = useState(false);
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

	return (
		<div className="py-2">
			<form onSubmit={form.onSubmit(handleSaveCard)}>
				<Input.Wrapper label="Card Type">
					<Input
						component="select"
						rightSection={<FaAngleDown size={14} />}
						pointer
						mt="sm"
						{...form.getInputProps("cardType")}
					>
						<option value="BASIC">Basic</option>
						<option value="MULTIPLE_CHOICE" disabled={true}>
							Multiple Choice
						</option>
					</Input>
				</Input.Wrapper>

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

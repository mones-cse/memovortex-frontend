// CardContentView.tsx

import { useForm } from "@mantine/form";

import { zodResolver } from "mantine-form-zod-resolver";
import React, { useState } from "react";

import { RiCloseCircleLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useUpdateCardMutation } from "../../hooks/mutations/card";
import { useFetchImageForCardWithSignedUrlQueryV2 } from "../../hooks/queries/card";
import { cardSchemas } from "../../schemas/index.schemas";
import type { ImageItem, TCardData, TCardImagesProps, TImageState } from "../../types/card.type";
import { CardImageUploadProgress } from "./CardImageUploadProgress";

import { CardContentActionButtons } from "./CardContentActionButtons";
import { CardDueDateInfo } from "./CardDueDateInfo";
import { CardTypeUpdateSelector } from "./CardTypeUpdateSelector";
import MinimalInputWithImagesUpdate from "./MinimalInputWithImagesUpdate";

type CardContentViewProps = {
	selectedCard: TCardData;
	onUpdate: () => void;
};

const CardImages: React.FC<TCardImagesProps> = ({ images, onRemoveImage }) => {
	const [deletingImages, setDeletingImages] = React.useState<TImageState>({});

	if (!images || images.length === 0) return null;

	return (
		<div className="mt-2 flex flex-wrap gap-2">
			{images.map((img) => (
				<div key={img.url} className="relative">
					<div
						className={`relative ${deletingImages[img.s3FileKey] ? "after:absolute after:inset-0 after:bg-black after:bg-opacity-50 after:rounded-md after:transition-all after:duration-200" : ""}`}
					>
						<img
							src={img.url}
							alt="Card content"
							className="w-[75px] h-[75px] object-cover rounded-md bg-gray-100 p-1"
						/>
					</div>
					<button
						type="button"
						className="absolute -top-2 -right-2 w-5 h-5 text-red-300 flex items-center rounded-full justify-center hover:text-red-600 hover:bg-gray-400 transition-colors duration-200 p-0 m-0 z-10"
						onClick={(e) => {
							e.preventDefault();
							setDeletingImages((prev) => ({
								...prev,
								[img.s3FileKey]: !prev[img.s3FileKey],
							}));
							onRemoveImage(img.s3FileKey);
						}}
						aria-label="Remove image"
					>
						<RiCloseCircleLine size={20} />
					</button>
				</div>
			))}
		</div>
	);
};

const CardContentView: React.FC<CardContentViewProps> = ({ selectedCard, onUpdate }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [cardType, setCardType] = useState<"BASIC" | "MULTIPLE_CHOICE">(
		selectedCard.cardContent.cardType,
	);
	const [uploadProgress, setUploadProgress] = useState<{
		front: Record<number, number>;
		back: Record<number, number>;
	}>({
		front: {},
		back: {},
	});

	const dueDate = new Date(selectedCard.card.due);
	const { mutateAsync: updateCard } = useUpdateCardMutation();

	const handleImageProgress = (side: "front" | "back", index: number, progress: number) => {
		setUploadProgress((prev) => ({
			...prev,
			[side]: {
				...prev[side],
				[index]: progress,
			},
		}));
	};

	const displayMultipleChoiceFormErrors = () => {
		console.log("Form errors:", form.errors);
		if (!Object.keys(form.errors).length) return null;
		return <p className="text-sm text-red-500">{form.errors.multipleChoiceOptions || ""}</p>;
	};

	const handleUpdateCard = async (values: typeof form.values) => {
		console.log("Form values:", values);
		//TODO: After testing remove this comment
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

	const { data: frontImage } = useFetchImageForCardWithSignedUrlQueryV2(
		selectedCard.cardContent.frontImage || [],
	);
	const { data: backImage } = useFetchImageForCardWithSignedUrlQueryV2(
		selectedCard.cardContent.backImage || [],
	);

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
		// TODO: remove validation comment
		validate: zodResolver(cardSchemas.cardUpdateSchema),
		validateInputOnChange: true,
	});

	return (
		<form onSubmit={form.onSubmit(handleUpdateCard)}>
			<div className="flex flex-col gap-2">
				<CardTypeUpdateSelector form={form} setCardType={setCardType} />
				{/* <CardType form={form} /> */}
				{/* <FrontText form={form} /> */}

				{cardType === "BASIC" ? (
					<section>
						<MinimalInputWithImagesUpdate
							formKeyText="frontText"
							formKeyImage="newFrontImages"
							form={form}
						/>

						<CardImageUploadProgress
							images={form.getValues().newFrontImages}
							uploadProgress={uploadProgress.front}
							isSubmitting={isSubmitting}
						/>
						<CardImages
							images={frontImage}
							onRemoveImage={handleRemoveImage(true)}
							key={form.key("frontImage")}
						/>
						<MinimalInputWithImagesUpdate
							formKeyText="backText"
							formKeyImage="newBackImages"
							form={form}
						/>
						<CardImageUploadProgress
							images={form.getValues().newBackImages}
							uploadProgress={uploadProgress.back}
							isSubmitting={isSubmitting}
						/>

						<CardImages
							images={backImage}
							onRemoveImage={handleRemoveImage(false)}
							key={form.key("backImage")}
						/>
						<CardDueDateInfo dueDate={dueDate} />
						{displayMultipleChoiceFormErrors()}
					</section>
				) : (
					<section>
						<p>wtf</p>
					</section>
				)}

				{isSubmitting && (
					<p className="text-sm font-bold text-gray-900 mt-2">
						Updating ... <span className="inline-block animate-spin duration-[500ms]">↻</span>
					</p>
				)}
				<CardContentActionButtons form={form} onUpdate={onUpdate} isSubmitting={isSubmitting} />
			</div>
		</form>
	);
};

export default CardContentView;

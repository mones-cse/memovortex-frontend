import React, { useCallback, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { useCardUpdateForm } from "../../hooks/card/useCardUpdateForm";
import { useFetchImageForCardWithSignedUrlQueryV2 } from "../../hooks/queries/card";
import type { TCardData, TCardImagesProps, TImageState } from "../../types/card.type";
import { LoadingSpinner } from "../../ui/LoadingSpinner";
import { CardContentActionButtons } from "./CardContentActionButtons";
import { CardDueDateInfo } from "./CardDueDateInfo";
import { CardImageUploadProgress } from "./CardImageUploadProgress";
import { CardTypeUpdateSelector } from "./CardTypeUpdateSelector";
import MinimalInputWithImagesUpdate from "./MinimalInputWithImagesUpdate";
import { MultipleChoiceOptionsUpdate } from "./MultipleChoiceOptionsUpdate";

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
	const [cardType, setCardType] = useState<"BASIC" | "MULTIPLE_CHOICE">(
		selectedCard.cardContent.cardType,
	);
	const { form, handleUpdateCard, isSubmitting, uploadProgress, handleRemoveImage } =
		useCardUpdateForm(selectedCard, onUpdate);

	const dueDate = new Date(selectedCard.card.due);

	// Replace the existing displayMultipleChoiceFormErrors function
	const displayMultipleChoiceFormErrors = useCallback(() => {
		console.log("Form errors:", form.errors);
		if (!form.errors || Object.keys(form.errors).length === 0) return null;

		// Directly return the error message component if there are errors
		return form.errors.multipleChoiceOptions ? (
			<p className="text-sm text-red-500">{form.errors.multipleChoiceOptions}</p>
		) : null;
	}, [form?.errors]);

	const { data: frontImage } = useFetchImageForCardWithSignedUrlQueryV2(
		selectedCard.cardContent.frontImage || [],
	);
	const { data: backImage } = useFetchImageForCardWithSignedUrlQueryV2(
		selectedCard.cardContent.backImage || [],
	);

	return (
		<form onSubmit={form.onSubmit(handleUpdateCard)}>
			<div className="flex flex-col gap-2">
				<CardTypeUpdateSelector form={form} setCardType={setCardType} />

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
						<MultipleChoiceOptionsUpdate form={form} />
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
					</section>
				)}

				{isSubmitting && <LoadingSpinner text="Updating ..." />}
				<CardContentActionButtons form={form} onUpdate={onUpdate} isSubmitting={isSubmitting} />
			</div>
		</form>
	);
};

export default CardContentView;

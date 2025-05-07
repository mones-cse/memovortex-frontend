import { useState } from "react";
import { useCardUpdateForm } from "../../hooks/card/useCardUpdateForm";
import { useFetchImageForCardWithSignedUrlQueryV2 } from "../../hooks/queries/card";
import type { TCardData } from "../../types/card.type";
import { LoadingSpinner } from "../../ui/LoadingSpinner";
import { CardContentActionButtons } from "./CardContentActionButtons";
import { CardDueDateInfo } from "./CardDueDateInfo";
import { CardImageUploadProgress } from "./CardImageUploadProgress";
import { CardImages } from "./CardImages";
import { CardTypeUpdateSelector } from "./CardTypeUpdateSelector";
import MinimalInputWithImagesUpdate from "./MinimalInputWithImagesUpdate";
import { MultipleChoiceOptionsUpdate } from "./MultipleChoiceOptionsUpdate";

type CardContentViewProps = {
	selectedCard: TCardData;
	onUpdate: () => void;
};

const CardContentView: React.FC<CardContentViewProps> = ({ selectedCard, onUpdate }) => {
	const [cardType, setCardType] = useState<"BASIC" | "MULTIPLE_CHOICE">(
		selectedCard.cardContent.cardType,
	);
	const { form, handleUpdateCard, isSubmitting, uploadProgress, handleRemoveImage } =
		useCardUpdateForm(selectedCard, onUpdate);

	const dueDate = new Date(selectedCard.card.due);

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
					{cardType === "MULTIPLE_CHOICE" && <MultipleChoiceOptionsUpdate form={form} />}

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

				{isSubmitting && <LoadingSpinner text="Updating ..." />}
				<CardContentActionButtons form={form} onUpdate={onUpdate} isSubmitting={isSubmitting} />
			</div>
		</form>
	);
};

export default CardContentView;

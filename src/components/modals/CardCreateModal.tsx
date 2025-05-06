import { useState } from "react";
import { useCardForm } from "../../hooks/card/useCardForm";
import type { ModalProps } from "../../types/modal.type";
import { LoadingSpinner } from "../../ui/LoadingSpinner";
import { BasicCardForm } from "../card/BasicCardForm";
import { CardFormButtons } from "../card/CardFormButtons";
import { CardTypeSelector } from "../card/CardTypeSelector";
import { MultipleChoiceForm } from "../card/MultipleChoiceForm";

export const CardCreateModal = ({ deckId }: ModalProps["newCard"]) => {
	const [cardType, setCardType] = useState<"BASIC" | "MULTIPLE_CHOICE">("BASIC");
	const { form, handleSaveCard, uploadProgress, isSubmitting } = useCardForm(deckId);
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

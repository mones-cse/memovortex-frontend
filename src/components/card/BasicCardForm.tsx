import type { UseFormReturnType } from "@mantine/form";
import type { TCardCreateFormValues } from "../../types/card.type";
import { CardImageUploadProgress } from "./CardImageUploadProgress";
import MinimalInputWithImages from "./MinimalInputWithImages";

type BasicCardFormProps = {
	form: UseFormReturnType<TCardCreateFormValues>;
	uploadProgress: {
		front: Record<number, number>;
		back: Record<number, number>;
	};
	isSubmitting: boolean;
};
export const BasicCardForm = ({ form, uploadProgress, isSubmitting }: BasicCardFormProps) => {
	return (
		<section>
			<MinimalInputWithImages
				label="Card Front"
				form={form}
				formKeyText={"frontText"}
				formKeyImage={"frontImage"}
			/>
			<CardImageUploadProgress
				images={form.getValues().frontImage}
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
	);
};

import type { FC } from "react";
import { AnswerSubmissionButtons } from "./AnswerSubmissionButtons";
import { ImageGallery } from "./ImageGallery";

interface BackCardProps {
	text: string;
	images?: string[];
	currentImageIndex: number;
	onNextImage: () => void;
	onPrevImage: () => void;
	onSubmitAnswer: (response: "easy" | "good" | "hard" | "again") => void;
}

export const BackCard: FC<BackCardProps> = ({
	text,
	images,
	currentImageIndex,
	onNextImage,
	onPrevImage,
	onSubmitAnswer,
}) => {
	return (
		<div className="h-full flex flex-col">
			<div className="flex-1 space-y-4 overflow-auto">
				<p className="text-lg font-medium">{text}</p>
				{images && images.length > 0 && (
					<ImageGallery
						images={images}
						currentIndex={currentImageIndex}
						onNext={onNextImage}
						onPrev={onPrevImage}
					/>
				)}
			</div>
			<AnswerSubmissionButtons onSubmitAnswer={onSubmitAnswer} />
		</div>
	);
};

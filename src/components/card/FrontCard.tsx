import type { FC } from "react";
import { ImageGallery } from "./ImageGallery";

interface FrontCardProps {
	text: string;
	images?: string[];
	currentImageIndex: number;
	onNextImage: () => void;
	onPrevImage: () => void;
	onShowAnswer: () => void;
}

export const FrontCard: FC<FrontCardProps> = ({
	text,
	images,
	currentImageIndex,
	onNextImage,
	onPrevImage,
	onShowAnswer,
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
			<button
				type="button"
				className="w-full mt-6 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors font-medium"
				onClick={onShowAnswer}
			>
				Show Answer
			</button>
		</div>
	);
};

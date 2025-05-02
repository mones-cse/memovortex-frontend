import { useState } from "react";
import type { FC } from "react";
import type { TImageGalleryProps } from "../../types/card.type";

export const ImageGallery: FC<TImageGalleryProps> = ({
	images,
	currentIndex,
	onNext,
	onPrev,
}) => {
	const [isLoading, setIsLoading] = useState(true);

	if (!images || images.length === 0) return null;

	return (
		<div className="space-y-4">
			<div className="relative w-full h-[40vh]">
				{isLoading && (
					<div className="absolute inset-0 animate-pulse">
						<div className="h-full w-full bg-gray-200 rounded-lg flex items-center justify-center">
							<svg
								className="w-12 h-12 text-gray-300"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 640 512"
							>
								<path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
							</svg>
						</div>
					</div>
				)}
				<img
					src={images[currentIndex]}
					alt={`Item ${currentIndex + 1} of ${images.length}`}
					className={`w-full h-full rounded-lg object-contain transition-opacity duration-300 ${
						isLoading ? "opacity-0" : "opacity-100"
					}`}
					onLoad={() => setIsLoading(false)}
					onLoadStart={() => setIsLoading(true)}
				/>
				<div className="absolute left-0 right-0 bottom-4 flex justify-center items-center gap-4">
					<button
						type="button"
						onClick={onPrev}
						disabled={currentIndex === 0}
						className="px-3 py-1 bg-gray-800/70 text-white rounded-md disabled:opacity-50"
					>
						←
					</button>
					<span className="px-2 py-1 bg-gray-800/70 text-white rounded-md">
						{currentIndex + 1}/{images.length}
					</span>
					<button
						type="button"
						onClick={onNext}
						disabled={currentIndex === images.length - 1}
						className="px-3 py-1 bg-gray-800/70 text-white rounded-md disabled:opacity-50"
					>
						→
					</button>
				</div>
			</div>
		</div>
	);
};

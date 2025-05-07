import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import type { TCardImagesProps, TImageState } from "../../types/card.type";

export const CardImages: React.FC<TCardImagesProps> = ({ images, onRemoveImage }) => {
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

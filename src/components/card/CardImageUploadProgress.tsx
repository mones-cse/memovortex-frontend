import { Progress } from "@mantine/core";
import type { ImageItem } from "../../types/card.type";

interface UploadProgressProps {
	images: ImageItem[];
	uploadProgress: Record<number, number>;
	isSubmitting: boolean;
}

export const CardImageUploadProgress = ({
	images,
	uploadProgress,
	isSubmitting,
}: UploadProgressProps) => {
	const indices = Object.keys(uploadProgress).map(Number);
	if (!isSubmitting || (!images.length && !indices.length)) return null;
	// Store image file names in a ref to keep them available during upload
	const imageFileNames = images.map((img) => img.file.name);
	return (
		<div className="mt-2 space-y-2">
			{indices.map((index) => (
				<div key={index} className="flex items-center">
					<div className="w-8 text-xs">{uploadProgress[index] || 0}%</div>
					<div className="flex-1">
						<Progress
							value={uploadProgress[index] || 0}
							color={uploadProgress[index] === 100 ? "green" : "blue"}
							size="sm"
							radius="xl"
						/>
					</div>
					<div className="ml-2 text-xs truncate max-w-[120px]">
						{index < imageFileNames.length ? imageFileNames[index] : `Image ${index + 1}`}
					</div>
				</div>
			))}
		</div>
	);
};

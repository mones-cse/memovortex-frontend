import { Textarea } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaPaperclip } from "react-icons/fa6";
import type { ImageItem } from "../../types/card.type";

const MinimalInputWithImages = ({
	lable,
	formKeyText,
	formKeyImage,
	form,
}: {
	lable: string;
	formKeyText: string;
	formKeyImage: string;
	form: UseFormReturnType<{
		frontText: string;
		backText: string;
		frontImage: ImageItem[];
		backImage: ImageItem[];
		cardType: "BASIC" | "MULTIPLE_CHOICE";
		multipleChoiceOptions: {
			id: string;
			text: string;
			isCorrect: boolean;
		}[];
	}>;
}) => {
	// const [inputValue, setInputValue] = useState<string>("");
	const [images, setImages] = useState<ImageItem[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const MAX_IMAGES: number = 10;
	const formRef = useRef(form);

	// Process the image file
	const handleImageFile = useCallback(
		(file: File): void => {
			if (!file || images.length >= MAX_IMAGES) return;

			setIsLoading(true);

			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result;
				if (typeof result === "string") {
					setImages((prevImages) => [
						...prevImages,
						{
							file,
							preview: result,
							id: Date.now() + Math.random().toString(36).substring(2, 9),
						},
					]);
				}
				setIsLoading(false);
			};

			reader.readAsDataURL(file);
		},
		[images],
	);

	// Handle paste event
	useEffect(() => {
		const handlePaste = (e: ClipboardEvent) => {
			if (document.activeElement !== inputRef.current) return;

			// Always process paste events
			const items = e.clipboardData?.items;
			if (!items) return;

			const imageItems: DataTransferItem[] = [];

			// Collect all image items from clipboard
			for (let i = 0; i < items.length; i++) {
				if (items[i].type.indexOf("image") !== -1) {
					imageItems.push(items[i]);
				}
			}

			if (imageItems.length === 0) return;

			// If this is an image paste into the input field, prevent default text paste
			if (document.activeElement === inputRef.current) {
				e.preventDefault();
			}

			// Check if adding these would exceed our limit
			const remainingSlots = MAX_IMAGES - images.length;
			if (imageItems.length > remainingSlots) {
				for (const item of imageItems.slice(0, remainingSlots)) {
					const blob = item.getAsFile();
					if (blob) handleImageFile(blob);
				}
			} else {
				// Process all image items found
				for (const item of imageItems) {
					const blob = item.getAsFile();
					if (blob) handleImageFile(blob);
				}
			}
		};

		window.addEventListener("paste", handlePaste);

		formRef.current.setFieldValue(formKeyImage, [...images]);
		return () => window.removeEventListener("paste", handlePaste);
		// TODO form is an object which may cause re-rendering need to check if it is necessary
	}, [images, formKeyImage, handleImageFile]);

	// Handle file input change for multiple files
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files) {
			const filesArray = Array.from(e.target.files);
			const remainingSlots = MAX_IMAGES - images.length;

			if (filesArray.length > remainingSlots) {
				for (const file of filesArray.slice(0, remainingSlots)) {
					handleImageFile(file);
				}
			} else {
				for (const file of filesArray) {
					handleImageFile(file);
				}
			}
		}
	};

	// Remove a specific image by its id
	const removeImage = (idToRemove: string): void => {
		setImages(images.filter((image) => image.id !== idToRemove));
	};

	// Attachment button click handler
	const handleAttachmentClick = (): void => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const ImageThumbnailPreviewer = ({ images }: { images: ImageItem[] }) => {
		return (
			<div className="flex flex-wrap gap-2">
				{images.map((image) => (
					<div key={image.id} className="relative group w-14 h-14">
						<img
							src={image.preview}
							alt="Thumbnail"
							className="w-full h-full object-cover rounded border-[1px] border-gray-300 shadow-md"
						/>
						<button
							type="button"
							onClick={() => removeImage(image.id)}
							className="absolute top-0 right-0 bg-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 border border-gray-200"
						>
							×
						</button>
					</div>
				))}
				{isLoading && (
					<div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded">
						<div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full" />
					</div>
				)}
			</div>
		);
	};

	const ImageUploaderButton = () => {
		return (
			<div className="ml-auto">
				<button
					type="button"
					onClick={handleAttachmentClick}
					className="text-gray-500 hover:text-gray-700"
					disabled={images.length >= MAX_IMAGES}
				>
					<FaPaperclip size={24} />
				</button>
			</div>
		);
	};

	return (
		<div className="w-full max-w-4xl mx-auto mt-4">
			<p className="text-black  mb-1 font-semibold">{lable}</p>
			<div className="bg-gray-50 rounded-t-lg  shadow-sm p-1">
				<Textarea
					ref={inputRef}
					// onChange={handleInputChange}
					minRows={4}
					autosize
					placeholder="Type or paste content here..."
					key={form.key(formKeyText)}
					{...form.getInputProps(formKeyText)}
				/>
			</div>

			<div className="bg-gray-50  rounded-b-lg border-dashed border-t-[1px] border-gray-300 p-2 shadow-sm">
				<div className="flex items-center">
					<ImageThumbnailPreviewer images={images} />
					<ImageUploaderButton />
				</div>
			</div>

			{/* Hidden file input */}
			<input
				type="file"
				ref={fileInputRef}
				className="hidden"
				accept="image/*"
				multiple
				onChange={handleFileChange}
			/>
		</div>
	);
};

export default MinimalInputWithImages;

// CardContentView.tsx

import { Button, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { UseFormReturnType } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useUpdateCardMutation } from "../../hooks/mutations/card";
import { useFetchImageForCardWithSignedUrlQueryV2 } from "../../hooks/queries/card";
import { cardSchemas } from "../../schemas/index.schemas";
import type {
	ImageItem,
	TCardData,
	TCardFormValues,
	TCardImagesProps,
	TImageState,
} from "../../types/card.type";
import MinimalInputWithImagesUpdate from "./MinimalInputWithImagesUpdate";

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

const DueDateInfo = ({ dueDate }: { dueDate: Date }) => {
	return (
		<p className="text-md text-gray-800">
			Due Date:{" "}
			{dueDate.toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			})}
		</p>
	);
};

const ActionsButtons = ({
	form,
	onUpdate,
}: { form: UseFormReturnType<TCardFormValues>; onUpdate: () => void }) => {
	return (
		// TODO: cancle button does not make sense here\
		<div className="flex gap-1 justify-end">
			<Button variant="outline" color="gray" onClick={() => onUpdate()}>
				Cancel
			</Button>
			<Button
				variant="filled"
				color="blue"
				type="submit"
				disabled={!form.isDirty()}
			>
				Update
			</Button>
		</div>
	);
};

const CardType = ({ form }: { form: UseFormReturnType<TCardFormValues> }) => {
	return (
		<Input.Wrapper label="Card Type">
			<Input
				component="select"
				rightSection={<FaAngleDown size={14} />}
				pointer
				mt="md"
				{...form.getInputProps("cardType")}
			>
				<option value="BASIC">Basic</option>
				<option value="MULTIPLE_CHOICE" disabled={true}>
					Multiple Choice
				</option>
			</Input>
		</Input.Wrapper>
	);
};

const CardContentView: React.FC<CardContentViewProps> = ({
	selectedCard,
	onUpdate,
}) => {
	const dueDate = new Date(selectedCard.card.due);
	const { mutateAsync: updateCard } = useUpdateCardMutation();

	const handleUpdateCard = async (values: typeof form.values) => {
		console.log("Form values:", values);
		if (form.isValid()) {
			await updateCard({
				...values,
				id: selectedCard.card.id,
				deckId: selectedCard.card.deckId,
			});
			// TODO: remove onUpdate and make updatebutton disabled till the form is dirty
			onUpdate();
		} else {
			console.log("Form validation failed:", form.errors);
			const errors = Object.entries(form.errors)
				.map(([field, error]) => `${field}: ${error}`)
				.join("\n");
			toast.error(`Form validation failed:\n${errors}`);
		}
	};

	const handleRemoveImage = (isFront: boolean) => (s3FileKey: string) => {
		const field = isFront ? "frontImage" : "backImage";
		const currentImages = form.values[field];

		// Toggle the image: if it exists remove it, if it doesn't exist add it
		if (currentImages.includes(s3FileKey)) {
			form.setFieldValue(
				field,
				currentImages.filter((key) => key !== s3FileKey),
			);
		} else {
			form.setFieldValue(field, [...currentImages, s3FileKey]);
		}
	};

	const { data: frontImage } = useFetchImageForCardWithSignedUrlQueryV2(
		selectedCard.cardContent.frontImage || [],
	);
	const { data: backImage } = useFetchImageForCardWithSignedUrlQueryV2(
		selectedCard.cardContent.backImage || [],
	);

	const form = useForm({
		mode: "controlled",
		initialValues: {
			frontText: selectedCard.cardContent.frontText,
			backText: selectedCard.cardContent.backText,
			cardType: selectedCard.cardContent.cardType,
			frontImage: selectedCard.cardContent.frontImage,
			backImage: selectedCard.cardContent.backImage,
			newBackImages: [] as ImageItem[],
			newFrontImages: [] as ImageItem[],
		},
		validate: zodResolver(cardSchemas.cardUpdateSchema),
		validateInputOnChange: true,
	});

	return (
		<form onSubmit={form.onSubmit(handleUpdateCard)}>
			<div className="flex flex-col gap-2">
				<CardType form={form} />
				{/* <FrontText form={form} /> */}
				<MinimalInputWithImagesUpdate
					formKeyText="frontText"
					formKeyImage="newFrontImages"
					form={form}
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
				{/* <BackText form={form} /> */}
				<CardImages
					images={backImage}
					onRemoveImage={handleRemoveImage(false)}
					key={form.key("backImage")}
				/>
				<DueDateInfo dueDate={dueDate} />
				<ActionsButtons form={form} onUpdate={onUpdate} />
			</div>
		</form>
	);
};

export default CardContentView;

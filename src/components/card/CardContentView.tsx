// CardContentView.tsx

import { Button, Input, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { FaAngleDown } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { useUpdateCardMutation } from "../../hooks/mutations/card";
import { useFetchImageForCardWithSignedUrlQuery } from "../../hooks/queries/card";
import { cardSchemas } from "../../schemas/index.schemas";
import { userStore } from "../../stores/store";
import type { TCardData } from "../../types/card.type";
interface CardContentViewProps {
	selectedCard: TCardData;
	onUpdate: () => void;
}

const CardContentView: React.FC<CardContentViewProps> = ({
	selectedCard,
	onUpdate,
}) => {
	const dueDate = new Date(selectedCard.card.due);
	const { mutateAsync } = useUpdateCardMutation();
	const store = userStore();

	const { data: frontImage } = useFetchImageForCardWithSignedUrlQuery(
		selectedCard.cardContent.frontImage || [],
	);
	const { data: backImage } = useFetchImageForCardWithSignedUrlQuery(
		selectedCard.cardContent.backImage || [],
	);

	const form = useForm({
		mode: "controlled",
		initialValues: {
			frontText: selectedCard.cardContent.frontText,
			backText: selectedCard.cardContent.backText,
			cardType: selectedCard.cardContent.cardType,
		},
		validate: zodResolver(cardSchemas.cardCreateSchema),
		validateInputOnChange: true,
	});

	const handleUpdateCard = async (values: typeof form.values) => {
		if (form.isValid()) {
			await mutateAsync({
				...values,
				id: selectedCard.card.id,
				deckId: selectedCard.card.deckId,
			});
			onUpdate();
		}
	};

	return (
		<form onSubmit={form.onSubmit(handleUpdateCard)}>
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
			<br />
			<div className="space-y-2">
				<Textarea
					label="Card Front"
					placeholder="Insert Question"
					autosize
					minRows={4}
					maxRows={6}
					{...form.getInputProps("frontText")}
					key={form.key("frontText")}
				/>
				{frontImage && frontImage.length > 0 && (
					<div className="mt-2 flex flex-wrap gap-2">
						{frontImage.map((url) => (
							<div key={url} className="relative">
								<img
									src={url}
									alt="Card front content"
									className="w-[75px] h-[75px] object-cover rounded-md bg-gray-300 p-1"
								/>
								<button
									type="button"
									className="absolute -top-2 -right-2 w-5 h-5 text-red-300 flex items-center rounded-full justify-center hover:*:text-red-600 hover:bg-gray-400 transition-colors duration-200 p-0 m-0"
									onClick={(e) => {
										e.preventDefault();
										// TODO: Implement image removal
									}}
									aria-label="Remove image"
								>
									<RiCloseCircleLine size={20} />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
			<br />
			<div className="space-y-2">
				<Textarea
					label="Card Back"
					placeholder="Insert Answer"
					autosize
					minRows={4}
					maxRows={6}
					{...form.getInputProps("backText")}
					key={form.key("backText")}
					mb="sm"
				/>
				{backImage && backImage.length > 0 && (
					<div className="mt-2 flex flex-wrap gap-2">
						{backImage.map((url) => (
							<div key={url} className="relative">
								<img
									src={url}
									alt="Card back content"
									className="w-[75px] h-[75px] object-cover rounded-md bg-gray-300 p-1"
								/>
								<button
									type="button"
									className="absolute -top-2 -right-2 w-5 h-5 text-red-300 flex items-center rounded-full justify-center hover:*:text-red-600 hover:bg-gray-400 transition-colors duration-200 p-0 m-0"
									onClick={(e) => {
										e.preventDefault();
										// TODO: Implement image removal
									}}
									aria-label="Remove image"
								>
									<RiCloseCircleLine size={20} />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
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
			<br />
			<div className="flex gap-1 justify-end">
				<Button
					variant="outline"
					color="gray"
					onClick={() => store.closeModal()}
				>
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
		</form>
	);
};

export default CardContentView;

// CardContentView.tsx

import { Button, Input, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { FaAngleDown } from "react-icons/fa";
import { useUpdateCardMutation } from "../../hooks/mutations/card";
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
	const { mutateAsync } = useUpdateCardMutation();
	const store = userStore();

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
			<Textarea
				label="Card Front"
				placeholder="Insert Question"
				autosize
				minRows={4}
				maxRows={6}
				{...form.getInputProps("frontText")}
				key={form.key("frontText")}
			/>
			<br />
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

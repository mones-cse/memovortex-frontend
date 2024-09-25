import { Button, Input, Menu, Table, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import {
	FaAngleDown,
	FaLayerGroup,
	FaPen,
	FaRegTrashAlt,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useUpdateCardMutation } from "../hooks/mutations/card";
import { useFetchCardsQuery } from "../hooks/queries/card";
import { cardSchemas } from "../schemas/index.schemas";
import { userStore } from "../stores/store";
import { MainContainer } from "../ui/MainContainer";

type TCardData = {
	card: {
		id: string;
		deckId: string;
		due: string;
		difficulty: number;
		elapsedDays: number;
		lastReview: string;
		lapses: number;
		reps: number;
		scheduledDays: number;
		state: number;
		stability: number;
		createdAt: string;
		updatedAt: string;
	};
	cardContent: {
		id: string;
		cardId: string;
		frontText: string;
		backText: string;
		createdAt: string;
		updatedAt: string;
		frontImageUrl: string;
		backImageUrl: string;
		cardType: "MULTIPLE_CHOICE" | "BASIC";
		multipleChoiceOptions: string[];
		tags: string[];
	};
};

const Card = () => {
	const { id } = useParams();
	const store = userStore();
	const { data, isPending, isError, error } = useFetchCardsQuery(id || "");
	const [selectedCard, setSelectedCard] = useState<TCardData | null>(null);

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	const handleNewDeckModal = () => {
		console.log(id);
		store.openModal("newCard", "New Card", { deckId: id || "" }, "lg");
	};

	const handleSelectCard = (card: TCardData) => {
		setSelectedCard(card);
		console.log("handleSelectCard called", selectedCard);
	};

	const CardContentView = ({ selectedCard }: { selectedCard: TCardData }) => {
		const { mutateAsync } = useUpdateCardMutation();

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
				setSelectedCard(null);
			}
		};
		console.log(form.isDirty());
		return (
			<div>
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
						minRows={4}
						{...form.getInputProps("frontText")}
						key={form.key("frontText")}
					/>
					<br />

					<Textarea
						label="Card Back"
						placeholder="Insert Answer"
						autosize
						minRows={4}
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
							Cancle
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
			</div>
		);
	};

	const TableView = () => {
		return (
			<Table striped highlightOnHover>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Front Text</Table.Th>
						<Table.Th className="float-end">Actions</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		);
	};

	const ActionButton = ({ card }: { card: TCardData }) => {
		return (
			<Menu shadow="md" width={120}>
				<Menu.Target>
					<Button variant="outline" size="xs">
						Action
					</Button>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Item
						leftSection={<FaPen />}
						onClick={() => console.log("handleUpdateDeckModal({ deck })")}
					>
						Rename
					</Menu.Item>
					<Menu.Item
						leftSection={<FaRegTrashAlt />}
						onClick={() => console.log("handleDeleteDeck(deck.id)")}
					>
						Delete
					</Menu.Item>
					<Menu.Item
						leftSection={<FaLayerGroup />}
						onClick={() => console.log("handleBrowse(deck.id)")}
					>
						Browse
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		);
	};

	const rows = data?.data.cards.map((each: TCardData) => (
		<Table.Tr key={each.card.id} onClick={() => handleSelectCard(each)}>
			<Table.Td>{each.cardContent.frontText}</Table.Td>
			<Table.Td className="float-end">
				<ActionButton card={each} />
			</Table.Td>
		</Table.Tr>
	));
	return (
		<MainContainer withSpace>
			<div className="flex justify-between">
				<p className="text-3xl">{data?.data.deck.deckTitle || "deck Title"}</p>
				<Button onClick={handleNewDeckModal}>New Card</Button>
			</div>
			<br />
			<div className="flex gap-4">
				<div className="w-1/2 bg-slate-100 rounded-sm">
					<TableView />
				</div>
				<div className="w-1/2 bg-slate-200 shadow-sm rounded-sm p-2">
					{selectedCard && <CardContentView selectedCard={selectedCard} />}
				</div>
			</div>
		</MainContainer>
	);
};

export default Card;

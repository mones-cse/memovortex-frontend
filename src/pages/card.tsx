import { Button, Menu, Table } from "@mantine/core";
import { useState } from "react";
import { FaLayerGroup, FaPen, FaRegTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useFetchCardsQuery } from "../hooks/queries/card";
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
			<div className="flex gap-4">
				<div className="w-1/2 bg-slate-100 rounded-sm">
					<Table striped highlightOnHover>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Front Text</Table.Th>
								<Table.Th className="float-end">Actions</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{rows}</Table.Tbody>
					</Table>
				</div>

				<div className="w-1/2 bg-slate-200 shadow-sm rounded-sm p-2">
					{selectedCard && (
						<div>
							<p>{selectedCard.cardContent.cardType}</p>
							<p>{selectedCard.cardContent.frontText}</p>
							<p>{selectedCard.cardContent.backText}</p>
						</div>
					)}
				</div>
			</div>
		</MainContainer>
	);
};

export default Card;

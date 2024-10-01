import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CardContentView from "../components/card/CardContentView";
import TableView from "../components/card/TableView";
import { useDeleteCardMutation } from "../hooks/mutations/card";
import { useFetchCardsQuery } from "../hooks/queries/card";
import { userStore } from "../stores/store";
import type { TCardData } from "../types/card.type";
import { MainContainer } from "../ui/MainContainer";

const Card: React.FC = () => {
	const { id } = useParams();
	const store = userStore();
	const { data, isPending, isError, error } = useFetchCardsQuery(id || "");
	const [selectedCard, setSelectedCard] = useState<TCardData | null>(null);
	const { mutateAsync: deleteMutateAsync } = useDeleteCardMutation();

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	const handleNewCardModal = () => {
		store.openModal("newCard", "New Card", { deckId: id || "" }, "lg");
	};

	const handleSelectCard = (card: TCardData) => {
		setSelectedCard(card);
	};

	const deleteModal = (card: TCardData) => {
		modals.openConfirmModal({
			title: "Please confirm your action",
			children: (
				<>
					<br />
					<Text size="sm">
						This action will permanently delete the card{" "}
						<Text span c="blue" inherit lineClamp={1}>
							{card.cardContent.frontText}
						</Text>{" "}
						Are you sure you want to proceed?
					</Text>
				</>
			),
			labels: { confirm: "Confirm", cancel: "Cancel" },
			onCancel: () => console.log("Cancel"),
			onConfirm: () => {
				deleteMutateAsync({ deckId: card.card.deckId, cardId: card.card.id });
				setSelectedCard(null);
			},
		});
	};

	return (
		<MainContainer withSpace>
			<div className="flex justify-between">
				<p className="text-3xl">{data?.data.deck.deckTitle || "deck Title"}</p>
				<Button onClick={handleNewCardModal}>New Card</Button>
			</div>
			<br />
			<div className="flex gap-4">
				<div className="w-1/2 bg-slate-100 rounded-sm">
					<TableView
						data={data?.data.cards || []}
						onSelectCard={handleSelectCard}
						onDeleteCard={deleteModal}
					/>
				</div>
				<div className="w-1/2 bg-slate-200 shadow-sm rounded-sm p-2">
					{selectedCard && (
						<CardContentView
							key={selectedCard.card.id}
							selectedCard={selectedCard}
							onUpdate={() => setSelectedCard(null)}
						/>
					)}
				</div>
			</div>
		</MainContainer>
	);
};

export default Card;

import {
	Badge,
	Button,
	Card,
	Group,
	Menu,
	SimpleGrid,
	Text,
} from "@mantine/core";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFetchDecksQuery } from "../hooks/queries/deck";
import { userStore } from "../stores/store";
import type { TDeck, TUpdateDeck } from "../types/deck.type";
import { MainContainer } from "../ui/MainContainer";

const Decks = () => {
	const navigate = useNavigate();
	const { data, isPending, isError, error } = useFetchDecksQuery();
	const store = userStore();
	const handleNewDeckModal = () => {
		store.openModal("newDeck", "New Deck", {}, "lg");
	};

	const handleUpdateDeckModal = ({ deck }: { deck: TUpdateDeck }) => {
		store.openModal(
			"updateDeck",
			"Update Deck",
			{
				id: deck.id,
				deckTitle: deck.deckTitle || "",
				deckDescription: deck.deckDescription || "",
			},
			"lg",
		);
	};

	const handleDeleteDeck = async (deckId: string) => {
		store.openModal("deleteDeck", "Delete Deck", { deckId }, "sm");
	};

	const handleStudy = (id: string) => {
		navigate(`/studies/${id}`);
	};

	const handleBrowse = (id: string) => {
		navigate(`/card/${id}`);
	};

	if (isPending) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	const ActionButton = ({ deck }: { deck: TUpdateDeck }) => {
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
						onClick={() => handleUpdateDeckModal({ deck })}
					>
						Rename
					</Menu.Item>
					<Menu.Item
						leftSection={<FaRegTrashAlt />}
						onClick={() => handleDeleteDeck(deck.id)}
					>
						Delete
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		);
	};

	const DeckCards = ({ decks }: { decks: TDeck[] }) => {
		return (
			<SimpleGrid cols={3} spacing="md">
				{decks.map((deck) => (
					<Card key={deck.id} shadow="sm" padding="lg" radius="md" withBorder>
						<Card.Section withBorder inheritPadding py="xs">
							<Group justify="space-between">
								<Text fw={500} size="lg">
									{deck.deckTitle}
								</Text>
								<ActionButton deck={deck} />
							</Group>
						</Card.Section>

						<Text mt="sm" c="dimmed" size="sm">
							{deck.deckDescription}
						</Text>

						<Group mt="md" justify="space-between">
							<Group gap={5}>
								<Badge color="blue" variant="light" radius="sm">
									New: {deck.stateNew}
								</Badge>
								<Badge color="violet" variant="light" radius="sm">
									Learning: {deck.stateLearning}
								</Badge>
								<Badge color="green" variant="light" radius="sm">
									Review: {deck.stateReview}
								</Badge>
								<Badge color="orange" variant="light" radius="sm">
									Relearning: {deck.stateRelearning}
								</Badge>
							</Group>
						</Group>

						<Group mt="md" grow>
							<Button
								variant="filled"
								color="blue"
								onClick={() => handleStudy(deck.id)}
							>
								Study
							</Button>
							<Button
								variant="outline"
								color="blue"
								onClick={() => handleBrowse(deck.id)}
							>
								Cards
							</Button>
						</Group>
					</Card>
				))}
			</SimpleGrid>
		);
	};

	return (
		<MainContainer withSpace>
			<div className="flex justify-between">
				<p className="text-3xl">Decks</p>
				<Button onClick={handleNewDeckModal}>Create Deck</Button>
			</div>
			<br />
			<DeckCards decks={data?.data || []} />
		</MainContainer>
	);
};

export default Decks;

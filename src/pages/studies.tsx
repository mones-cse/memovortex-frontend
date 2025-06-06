import { Button, Card, Group, SimpleGrid, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useFetchDecksQuery } from "../hooks/queries/deck";
import { userStore } from "../stores/store";
import type { TDeck } from "../types/deck.type";
import { MainContainer } from "../ui/MainContainer";

const Studies = () => {
	const navigate = useNavigate();
	const { data, isPending, isError, error } = useFetchDecksQuery();
	const store = userStore();
	const handleNewDeckModal = () => {
		store.openModal("newDeck", "New Deck", {}, "lg");
	};

	const handleStudy = (id: string) => {
		navigate(`/studies/${id}`);
	};

	if (isPending) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error: {error.message}</div>;
	}
	// TODO make it responsive if it's not already use tailwind if needed
	const DeckCards = ({ decks }: { decks: TDeck[] }) => {
		return (
			<SimpleGrid cols={3} spacing="md">
				{decks.map((deck) => (
					<Card key={deck.id} shadow="sm" padding="lg" radius="md" withBorder>
						<Card.Section withBorder inheritPadding py="xs">
							<Text fw={500} size="lg">
								{deck.deckTitle}
							</Text>
						</Card.Section>

						<Text mt="sm" c="dimmed" size="sm">
							{deck.deckDescription}
						</Text>

						<Group mt="md" justify="space-between">
							<Group gap={5}>
								<Text size="sm">New: {deck.stateNew}</Text>
								<Text size="sm">Learning: {deck.stateLearning}</Text>
								<Text size="sm">Review: {deck.stateReview}</Text>
								<Text size="sm">Relearning: {deck.stateRelearning}</Text>
							</Group>
						</Group>

						<Button
							fullWidth
							mt="md"
							radius="md"
							onClick={() => handleStudy(deck.id)}
						>
							Study
						</Button>
					</Card>
				))}
			</SimpleGrid>
		);
	};

	return (
		<MainContainer withSpace>
			<div className="flex justify-between">
				<p className="text-3xl">Studies</p>
				<Button onClick={handleNewDeckModal}>Create Deck</Button>
			</div>
			<br />
			<DeckCards decks={data?.data || []} />
		</MainContainer>
	);
};

export default Studies;

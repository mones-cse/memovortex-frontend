import { Button, Menu } from "@mantine/core";
import { Table } from "@mantine/core";
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

	const StudyButton = ({ deckId }: { deckId: string }) => {
		return (
			<Button
				size="xs"
				variant="outline"
				color="blue"
				className="mr-2"
				onClick={() => handleStudy(deckId)}
			>
				Study
			</Button>
		);
	};

	const BrowsButton = ({ deckId }: { deckId: string }) => {
		return (
			<Button
				size="xs"
				variant="outline"
				color="blue"
				className="mr-2"
				onClick={() => handleBrowse(deckId)}
			>
				Browse
			</Button>
		);
	};

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

	const rows = data?.data.map((element: TDeck) => (
		<Table.Tr key={element.id} className="justify-between">
			<Table.Td>{element.deckTitle}</Table.Td>
			<Table.Td>{element.deckDescription}</Table.Td>
			<Table.Td>{element.stateNew}</Table.Td>
			<Table.Td>{element.stateLearning}</Table.Td>
			<Table.Td>{element.stateReview}</Table.Td>
			<Table.Td>{element.stateRelearning}</Table.Td>
			<Table.Td className="float-end">
				<StudyButton deckId={element.id} />
				<BrowsButton deckId={element.id} />
				<ActionButton deck={element} />
			</Table.Td>
		</Table.Tr>
	));

	return (
		<MainContainer withSpace>
			<div className="flex justify-between">
				<p className="text-3xl">Decks</p>
				<Button onClick={handleNewDeckModal}>Create Deck</Button>
			</div>
			<br />
			<div>
				<Table>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Deck Title</Table.Th>
							<Table.Th>Deck Description</Table.Th>
							<Table.Th>New</Table.Th>
							<Table.Th>Learning</Table.Th>
							<Table.Th>Review</Table.Th>
							<Table.Th>Relearing</Table.Th>
							<Table.Th className="float-end">Actions</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</div>
		</MainContainer>
	);
};

export default Decks;

import { Button, Menu } from "@mantine/core";
import { Table } from "@mantine/core";
import { FaLayerGroup, FaPen, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFetchDecksQuery } from "../hooks/queries/deck";
import { userStore } from "../stores/store";
import type { TDeck, TUpdateDeck } from "../types/deck.type";
import { MainContainer } from "../ui/MainContainer";

const Deck = () => {
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
		navigate(`/study/${id}`);
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
					<Menu.Item
						leftSection={<FaLayerGroup />}
						onClick={() => handleBrowse(deck.id)}
					>
						Browse
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		);
	};

	const rows = data?.data.map((element: TDeck) => (
		<Table.Tr key={element.id} className="justify-between">
			<Table.Td>{element.deckTitle}</Table.Td>
			<Table.Td>{element.deckDescription}</Table.Td>
			<Table.Td className="float-end">
				<Button
					size="xs"
					variant="outline"
					color="blue"
					className="mx-2"
					onClick={() => handleStudy(element.id)}
				>
					Study
				</Button>
				<ActionButton deck={element} />
			</Table.Td>
		</Table.Tr>
	));

	return (
		<MainContainer withSpace>
			<div className="flex justify-between">
				<p className="text-3xl">Decks</p>
				<Button onClick={handleNewDeckModal}>New Deck</Button>
			</div>
			<br />
			<div>
				<Table>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Deck Title</Table.Th>
							<Table.Th>Deck Description</Table.Th>
							<Table.Th className="float-end">Actions</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</div>
		</MainContainer>
	);
};

export default Deck;

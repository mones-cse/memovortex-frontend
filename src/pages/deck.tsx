import { Button, Menu } from "@mantine/core";
import { Table } from "@mantine/core";
import { FaLayerGroup, FaPen, FaRegTrashAlt } from "react-icons/fa";
import { useFetchDecksQuery } from "../hooks/queries/deck";
import { userStore } from "../stores/store";
import type { TDeck } from "../types/deck.type";
import { MainContainer } from "../ui/MainContainer";

const Deck = () => {
	const { data, isPending, isError, error } = useFetchDecksQuery();
	const store = userStore();
	const handleNewNoteModal = () => {
		store.openModal("newDeck", "New Deck", {}, "lg");
		console.log("New Deck");
	};

	const handleDeleteDeck = async (deckId: string) => {
		store.openModal("deleteDeck", "Delete Deck", { deckId }, "sm");
	};

	if (isPending) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	const ActionButton = ({ deckId }: { deckId: string }) => {
		return (
			<Menu shadow="md" width={120}>
				<Menu.Target>
					<Button variant="outline" size="xs">
						Action
					</Button>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Item leftSection={<FaPen />}>Rename</Menu.Item>
					<Menu.Item
						leftSection={<FaRegTrashAlt />}
						onClick={() => handleDeleteDeck(deckId)}
					>
						Delete
					</Menu.Item>
					<Menu.Item leftSection={<FaLayerGroup />}>Browse</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		);
	};

	const rows = data?.data.map((element: TDeck) => (
		<Table.Tr key={element.id} className="justify-between">
			<Table.Td>{element.deckTitle}</Table.Td>
			<Table.Td>{element.deckDescription}</Table.Td>
			<Table.Td className="float-end">
				<Button size="xs" variant="outline" color="blue" className="mx-2">
					Study
				</Button>
				<ActionButton deckId={element.id} />
			</Table.Td>
		</Table.Tr>
	));

	return (
		<MainContainer withSpace>
			<div className="flex justify-between">
				<p className="text-3xl">Decks</p>
				<Button onClick={handleNewNoteModal}>New Deck</Button>
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

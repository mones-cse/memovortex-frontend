import { Button } from "@mantine/core";
import { userStore } from "../stores/store";
import { MainContainer } from "../ui/MainContainer";

const Deck = () => {
	const store = userStore();
	const handleNewNoteModal = () => {
		store.openModal("newDeck", "New Deck", {}, "lg");
		console.log("New Deck");
	};
	return (
		<MainContainer withSpace>
			<div className="flex justify-between">
				<p className="text-3xl">Notes</p>
				<Button onClick={handleNewNoteModal}>New Deck</Button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
				<p>list of decks</p>
			</div>
		</MainContainer>
	);
};

export default Deck;

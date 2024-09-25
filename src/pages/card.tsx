import { Button } from "@mantine/core";
import { useParams } from "react-router-dom";
import { userStore } from "../stores/store";
import { MainContainer } from "../ui/MainContainer";

const Card = () => {
	const { id } = useParams();
	const store = userStore();
	const handleNewDeckModal = () => {
		console.log(id);
		store.openModal("newCard", "New Card", { deckId: id || "" }, "lg");
	};
	return (
		<MainContainer withSpace>
			<div className="flex justify-between">
				<p className="text-3xl">Cards</p>
				<Button onClick={handleNewDeckModal}>New Card</Button>
			</div>
		</MainContainer>
	);
};

export default Card;

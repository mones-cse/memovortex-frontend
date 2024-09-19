import { Button, Textarea } from "@mantine/core";
import type { ModalProps } from "../../types/modal.type";

import { Input } from "@mantine/core";
import { useState } from "react";
import { useUpdateDeckMutation } from "../../hooks/mutations/deck";
import { userStore } from "../../stores/store";

export const DeckUpdateModal = ({
	id,
	deckTitle,
	deckDescription,
}: ModalProps["updateDeck"]) => {
	const { mutateAsync } = useUpdateDeckMutation();
	const store = userStore();

	const [deckTitleState, setDeckTitleState] = useState(deckTitle);
	const [deckDescriptionState, setDeckDescriptionState] =
		useState(deckDescription);

	const handleUpdateDeck = async () => {
		await mutateAsync({
			deckTitle: deckTitleState,
			deckDescription: deckDescriptionState,
			id,
		});
		store.closeModal();
	};

	return (
		<div className="py-4">
			<Input.Wrapper label="Deck Title" mb="sm">
				<Input
					placeholder=""
					value={deckTitleState}
					onChange={(e) => setDeckTitleState(e.target.value)}
				/>
			</Input.Wrapper>

			<Textarea
				label="Deck Details"
				placeholder=""
				autosize
				minRows={4}
				maxRows={8}
				value={deckDescriptionState}
				onChange={(e) => setDeckDescriptionState(e.currentTarget.value)}
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
				<Button variant="filled" color="blue" onClick={handleUpdateDeck}>
					Update
				</Button>
			</div>
		</div>
	);
};

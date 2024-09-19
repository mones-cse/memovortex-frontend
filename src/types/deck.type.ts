export type TDeck = {
	id: string;
	deckTitle: string;
	deckDescription: string;
	createdAt: string;
	updatedAt: string;
};

export type TCreateDeck = Pick<TDeck, "deckTitle" | "deckDescription">;

export type TUpdateNote = Partial<TCreateDeck>;
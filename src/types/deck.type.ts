export type TDeck = {
	id: string;
	deckTitle: string;
	deckDescription: string;
	stateNew: number;
	stateLearning: number;
	stateReview: number;
	stateRelearning: number;
	createdAt: string;
	updatedAt: string;
};

export type TCreateDeck = Pick<TDeck, "deckTitle" | "deckDescription">;

export type TUpdateDeck = Pick<TDeck, "id"> & Partial<TCreateDeck>;

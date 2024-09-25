export type TCard = {
	deckId: string;
	frontText: string;
	backText: string;
	frontImage: string;
	backImage: string;
	cardType: "MULTIPLE_CHOICE" | "BASIC";
	multipleChoiceOptions: string[];
	tags: string[];
};

export type TCreateCard = Pick<TCard, "deckId" | "frontText" | "backText">;

// export type TCreateDeck = Pick<TDeck, "deckTitle" | "deckDescription">;

// export type TUpdateDeck = Pick<TDeck, "id"> & Partial<TCreateDeck>;

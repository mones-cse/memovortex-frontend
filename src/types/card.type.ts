export type TCard = {
	id: string;
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

export type TUpdateCard = Pick<TCard, "id"> & Partial<TCreateCard>;

export type TCardData = {
	card: {
		id: string;
		deckId: string;
		due: string;
		difficulty: number;
		elapsedDays: number;
		lastReview: string;
		lapses: number;
		reps: number;
		scheduledDays: number;
		state: number;
		stability: number;
		createdAt: string;
		updatedAt: string;
	};
	cardContent: {
		id: string;
		cardId: string;
		frontText: string;
		backText: string;
		createdAt: string;
		updatedAt: string;
		frontImageUrl: string;
		backImageUrl: string;
		cardType: "MULTIPLE_CHOICE" | "BASIC";
		multipleChoiceOptions: string[];
		tags: string[];
	};
};

export type TReviewStudyCards = {
	deckId: string;
	cardId: string;
	rating: 1 | 2 | 3 | 4;
};

// export type TCreateDeck = Pick<TDeck, "deckTitle" | "deckDescription">;

// export type TUpdateDeck = Pick<TDeck, "id"> & Partial<TCreateDeck>;

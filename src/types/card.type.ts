export type ImageItem = {
	file: File;
	preview: string;
	id: string;
	progress?: number;
};

type MultipleChoiceOption = {
	id: string;
	text: string;
	isCorrect: boolean;
};

// used when creating a card, mantine form values
export type TCardCreateFormValues = {
	cardType: "MULTIPLE_CHOICE" | "BASIC";
	frontText: string;
	backText: string;
	frontImage: ImageItem[];
	backImage: ImageItem[];
	multipleChoiceOptions: MultipleChoiceOption[];
};

export type TCardCreateUpdateFormValues = {
	cardType: "MULTIPLE_CHOICE" | "BASIC";
	frontText: string;
	backText: string;
	frontImage: string[];
	backImage: string[];
	newFrontImages: ImageItem[];
	newBackImages: ImageItem[];
	multipleChoiceOptions: MultipleChoiceOption[];
};

// TODO: make it efficient
export type TCreateCardFormData = {
	deckId: string;
	frontText: string;
	backText: string;
	frontImage: ImageItem[];
	backImage: ImageItem[];
	cardType: "MULTIPLE_CHOICE" | "BASIC";
	multipleChoiceOptions?: MultipleChoiceOption[];
};

export type TUpdateCardFormData = {
	id: string;
	deckId: string;
	frontText: string;
	backText: string;
	frontImage: string[];
	backImage: string[];
	cardType: "MULTIPLE_CHOICE" | "BASIC";
	multipleChoiceOptions: MultipleChoiceOption[];
	tags?: string[];
	newFrontImages?: ImageItem[];
	newBackImages?: ImageItem[];
};

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

// TODO: make it efficient
export type TCreateCard = {
	deckId: string;
	frontText: string;
	backText: string;
	frontImage?: string[];
	backImage?: string[];
	cardType: "MULTIPLE_CHOICE" | "BASIC";
	multipleChoiceOptions?: MultipleChoiceOption[];
	tags?: string[];
};

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
		frontImage: string[];
		backImage: string[];
		cardType: "MULTIPLE_CHOICE" | "BASIC";
		multipleChoiceOptions: MultipleChoiceOption[];
		tags: string[];
	};
};

export type TReviewStudyCards = {
	deckId: string;
	cardId: string;
	rating: 1 | 2 | 3 | 4;
};

export interface TImageGalleryProps {
	images: string[];
	currentIndex: number;
	onNext: () => void;
	onPrev: () => void;
}

export interface TCardImagesProps {
	images: { url: string; s3FileKey: string }[] | undefined;
	onRemoveImage: (url: string) => void;
}

export type TCardFormValues = {
	frontText: string;
	backText: string;
	cardType: "MULTIPLE_CHOICE" | "BASIC";
	frontImage: string[];
	backImage: string[];
	newFrontImages: ImageItem[];
	newBackImages: ImageItem[];
	multipleChoiceOptions?: MultipleChoiceOption[];
};

export type TImageState = {
	[key: string]: boolean;
};

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReviewStudyCardsMutation } from "../hooks/mutations/card";
import { useFetchStudyCardsQuery } from "../hooks/queries/card";
import type { TCardData } from "../types/card.type";
import { MainContainer } from "../ui/MainContainer";

const Study = () => {
	const { id } = useParams();
	const { data, isPending, isError, error } = useFetchStudyCardsQuery(id || "");
	const [cardsData, setCardsData] = useState<TCardData[]>([]);
	const [currentCard, setCurrentCard] = useState<TCardData | null>(null);
	const [isQuestionWindow, setIsQuestionWindow] = useState(true);
	const [isStudyComplete, setIsStudyComplete] = useState(false);

	const { mutateAsync } = useReviewStudyCardsMutation();

	// TODO: I need approximate next schedule time for each type of card submission
	// Initialize cards when data is loaded
	useEffect(() => {
		if (data?.data.cards) {
			setCardsData(data.data.cards);
			if (data.data.cards.length > 0) {
				setCurrentCard(data.data.cards[0]);
			}
		}
	}, [data]);

	if (isPending) return <p className="text-center">Loading...</p>;
	if (isError)
		return <p className="text-center text-red-500">Error: {error.message}</p>;

	if (!data?.data.cards || data.data.cards.length === 0) {
		return (
			<MainContainer withSpace>
				<p className="text-2xl text-center">No cards available for study</p>
			</MainContainer>
		);
	}

	const handleShowAnswer = () => {
		setIsQuestionWindow(false);
	};

	const handleCardResponse = (response: "easy" | "good" | "hard" | "again") => {
		if (response === "again") {
			// Put current card at the end of the deck
			if (currentCard) {
				setCardsData([...cardsData, currentCard]);
			}
		}
		const responsInNumber =
			response === "easy"
				? 4
				: response === "good"
					? 3
					: response === "hard"
						? 2
						: 1;

		// submit api call to update card state
		mutateAsync({
			deckId: id || "",
			cardId: currentCard?.card?.id || "",
			rating: responsInNumber,
		});
		// Remove current card from the beginning
		const newCards = [...cardsData];
		newCards.shift();
		setCardsData(newCards);

		// Set next card or complete study
		if (newCards.length > 0) {
			setCurrentCard(newCards[0]);
			setIsQuestionWindow(true);
		} else {
			setIsStudyComplete(true);
		}
	};

	if (isStudyComplete) {
		return (
			<MainContainer withSpace>
				<p className="text-2xl text-center">Study session complete! 🎉</p>
			</MainContainer>
		);
	}

	const AnswerSubmissionButtons = () => {
		return (
			<div className="grid grid-cols-4 gap-4 mt-4">
				<button
					type="button"
					className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
					onClick={() => handleCardResponse("again")}
				>
					Again
				</button>
				<button
					type="button"
					className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
					onClick={() => handleCardResponse("hard")}
				>
					Hard
				</button>
				<button
					type="button"
					className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
					onClick={() => handleCardResponse("good")}
				>
					Medium
				</button>
				<button
					type="button"
					className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
					onClick={() => handleCardResponse("easy")}
				>
					Easy
				</button>
			</div>
		);
	};

	return (
		<MainContainer withSpace>
			<div className="flex flex-col space-y-6">
				<h1 className="text-2xl text-center">Study Session</h1>
				{currentCard && (
					<div className="w-full h-[60vh] bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
						<div className="h-full flex flex-col">
							<div className="p-6 flex-1 overflow-auto">
								{isQuestionWindow ? (
									<div className="h-full flex flex-col">
										<div className="flex-1 space-y-4 overflow-auto">
											<p className="text-lg font-medium">
												{currentCard.cardContent.frontText}
											</p>
											{currentCard.cardContent.frontImageUrl && (
												<div className="flex justify-center">
													<img
														src={currentCard.cardContent.frontImageUrl}
														alt="Front card"
														className="max-w-full h-auto rounded-lg object-contain"
													/>
												</div>
											)}
										</div>
										<button
											type="button"
											className="w-full mt-6 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors font-medium"
											onClick={handleShowAnswer}
										>
											Show Answer
										</button>
									</div>
								) : (
									<div className="h-full flex flex-col">
										<div className="flex-1 space-y-4 overflow-auto">
											<p className="text-lg font-medium">
												{currentCard.cardContent.backText}
											</p>
											{currentCard.cardContent.backImageUrl && (
												<div className="flex justify-center">
													<img
														src={currentCard.cardContent.backImageUrl}
														alt="Back card"
														className="max-w-full h-auto rounded-lg object-contain"
													/>
												</div>
											)}
										</div>
										<AnswerSubmissionButtons />
									</div>
								)}
							</div>
						</div>
					</div>
				)}
				<div className="space-y-2">
					<p className="text-sm text-gray-500 text-center">
						Cards remaining: {cardsData.length}
					</p>
					{data?.data.deck && (
						<div className="text-sm text-gray-500 space-y-1">
							<p className="text-center">New: {data.data.deck.stateNew}</p>
							<p className="text-center">
								Learning: {data.data.deck.stateLearning}
							</p>
							<p className="text-center">
								Review: {data.data.deck.stateReview}
							</p>
							<p className="text-center">
								Relearning: {data.data.deck.stateRelearning}
							</p>
						</div>
					)}
				</div>
			</div>
		</MainContainer>
	);
};

export default Study;

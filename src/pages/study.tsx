import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BackCard } from "../components/card/BackCard";
import { FrontCard } from "../components/card/FrontCard";
import { StudyInfo } from "../components/card/StudyInfo";
import { useReviewStudyCardsMutation } from "../hooks/mutations/card";
import {
	useFetchImageForCardWithSignedUrlQuery,
	useFetchStudyCardsQuery,
} from "../hooks/queries/card";
import type { TCardData } from "../types/card.type";
import { MainContainer } from "../ui/MainContainer";

const Study = () => {
	const { id } = useParams();

	const [cardsData, setCardsData] = useState<TCardData[]>([]);
	const [currentCard, setCurrentCard] = useState<TCardData | null>(null);
	const [isQuestionWindow, setIsQuestionWindow] = useState(true);
	const [isStudyComplete, setIsStudyComplete] = useState(false);
	const [currentFrontImageIndex, setCurrentFrontImageIndex] = useState(0);
	const [currentBackImageIndex, setCurrentBackImageIndex] = useState(0);

	const handleNextImage = (isFront: boolean) => {
		if (isFront) {
			setCurrentFrontImageIndex((prev) =>
				frontImage && prev < frontImage.length - 1 ? prev + 1 : prev,
			);
		} else {
			setCurrentBackImageIndex((prev) =>
				backImage && prev < backImage.length - 1 ? prev + 1 : prev,
			);
		}
	};

	const handlePrevImage = (isFront: boolean) => {
		if (isFront) {
			setCurrentFrontImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
		} else {
			setCurrentBackImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
		}
	};

	const { data, isPending, isError, error } = useFetchStudyCardsQuery(id || "");
	const { mutateAsync } = useReviewStudyCardsMutation();

	const { data: frontImage } = useFetchImageForCardWithSignedUrlQuery(
		currentCard?.cardContent.frontImage || [],
	);
	const { data: backImage } = useFetchImageForCardWithSignedUrlQuery(
		currentCard?.cardContent.backImage || [],
	);

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
		console.log("Response", response);
		const responsInNumber =
			response === "easy"
				? 4
				: response === "good"
					? 3
					: response === "hard"
						? 2
						: 1;

		mutateAsync({
			deckId: id || "",
			cardId: currentCard?.card?.id || "",
			rating: responsInNumber,
		});

		// Create a new array with the current state
		const newCards = [...cardsData];
		// remove current card from the beginning
		newCards.shift();

		if (response === "again" && currentCard) {
			newCards.push(currentCard);
		}

		// Update the cards data state
		setCardsData(newCards);

		// Set next card or complete study
		if (newCards.length > 0) {
			setCurrentCard(newCards[0]);
			setIsQuestionWindow(true);
			setCurrentFrontImageIndex(0);
			setCurrentBackImageIndex(0);
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

	return (
		<MainContainer withSpace>
			<div className="flex flex-col space-y-3">
				<h1 className="text-xl text-center">Study Session</h1>
				{currentCard && (
					<div className="w-full h-40vh] bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
						<div className="h-full flex flex-col">
							<div className="p-6 flex-1 overflow-auto">
								{isQuestionWindow ? (
									<FrontCard
										text={currentCard.cardContent.frontText}
										images={frontImage}
										currentImageIndex={currentFrontImageIndex}
										onNextImage={() => handleNextImage(true)}
										onPrevImage={() => handlePrevImage(true)}
										onShowAnswer={handleShowAnswer}
									/>
								) : (
									<BackCard
										text={currentCard.cardContent.backText}
										images={backImage}
										currentImageIndex={currentBackImageIndex}
										onNextImage={() => handleNextImage(false)}
										onPrevImage={() => handlePrevImage(false)}
										onSubmitAnswer={handleCardResponse}
									/>
								)}
							</div>
						</div>
					</div>
				)}
				<StudyInfo
					remainingCards={cardsData.length}
					deckStats={data?.data.deck}
				/>
			</div>
		</MainContainer>
	);
};

export default Study;

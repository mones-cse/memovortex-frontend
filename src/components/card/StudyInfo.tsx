import type { FC } from "react";

interface StudyInfoProps {
	remainingCards: number;
	deckStats?: {
		stateNew: number;
		stateLearning: number;
		stateReview: number;
		stateRelearning: number;
	};
}

export const StudyInfo: FC<StudyInfoProps> = ({
	remainingCards,
	deckStats,
}) => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
			<div className="flex flex-col m-auto text-center items-center justify-center">
				<span className="text-sm  text-gray-900 mb-4">
					{remainingCards} remaining
				</span>

				{deckStats && (
					<div className="flex w-full gap-4 justify-center text-center items-center">
						<div className="text-center">
							<span className="block text-sm font-medium text-blue-600">
								{deckStats.stateNew}
							</span>
							<span className="text-xs text-gray-500">New</span>
						</div>
						<div className="text-center">
							<span className="block text-sm font-medium text-yellow-600">
								{deckStats.stateLearning}
							</span>
							<span className="text-xs text-gray-500">Learning</span>
						</div>
						<div className="text-center">
							<span className="block text-sm font-medium text-green-600">
								{deckStats.stateReview}
							</span>
							<span className="text-xs text-gray-500">Review</span>
						</div>
						<div className="text-center">
							<span className="block text-sm font-medium text-orange-600">
								{deckStats.stateRelearning}
							</span>
							<span className="text-xs text-gray-500">Relearning</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

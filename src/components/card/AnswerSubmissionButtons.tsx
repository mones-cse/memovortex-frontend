import type { FC } from "react";

interface AnswerSubmissionButtonsProps {
	onSubmitAnswer: (response: "easy" | "good" | "hard" | "again") => void;
}

export const AnswerSubmissionButtons: FC<AnswerSubmissionButtonsProps> = ({
	onSubmitAnswer,
}) => {
	return (
		<div className="grid grid-cols-4 gap-4 mt-4">
			<button
				type="button"
				className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
				onClick={() => onSubmitAnswer("again")}
			>
				Again
			</button>
			<button
				type="button"
				className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
				onClick={() => onSubmitAnswer("hard")}
			>
				Hard
			</button>
			<button
				type="button"
				className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
				onClick={() => onSubmitAnswer("good")}
			>
				Medium
			</button>
			<button
				type="button"
				className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
				onClick={() => onSubmitAnswer("easy")}
			>
				Easy
			</button>
		</div>
	);
};

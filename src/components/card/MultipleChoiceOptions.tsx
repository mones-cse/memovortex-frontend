import { Radio, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { useState } from "react";
import type { TCardCreateFormValues } from "../../types/card.type";

export const MultipleChoiceOptions = ({
	form,
}: { form: UseFormReturnType<TCardCreateFormValues> }) => {
	const [seletedRadioIndex, setSelectedRadioIndex] = useState<number | null>(0);
	const handleCorrectOptionChange = (index: number) => {
		// Create a new array with all options set to isCorrect: false
		const currentOptions = form.getValues().multipleChoiceOptions;
		const newOptions = currentOptions.map((option, i) => ({
			...option,
			isCorrect: i === index,
		}));
		setSelectedRadioIndex(index);
		form.setFieldValue("multipleChoiceOptions", newOptions);
	};

	return (
		<div>
			<p className="mt-4 font-semibold">Answer Options</p>
			{form.values.multipleChoiceOptions.map((option, index) => (
				<div key={option.id} className="flex items-center gap-2 my-2 justify-center">
					<Radio
						checked={index === seletedRadioIndex}
						onChange={() => handleCorrectOptionChange(index)}
					/>
					<TextInput
						className="flex-1"
						placeholder={
							option.isCorrect ? "Enter correct answer option..." : "Enter incorrect option..."
						}
						{...form.getInputProps(`multipleChoiceOptions.${index}.text`)}
					/>
				</div>
			))}
		</div>
	);
};

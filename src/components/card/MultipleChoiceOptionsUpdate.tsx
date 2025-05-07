import { Radio, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { useState } from "react";
import type { TCardCreateUpdateFormValues } from "../../types/card.type";

export const MultipleChoiceOptionsUpdate = ({
	form,
}: { form: UseFormReturnType<TCardCreateUpdateFormValues> }) => {
	const selectedOptionIndex = form.values.multipleChoiceOptions.findIndex(
		(option) => option.isCorrect,
	);
	console.log("🚀 ~ selectedOptionIndex:", selectedOptionIndex, form.values.multipleChoiceOptions);

	const [selectedRadioIndex, setSelectedRadioIndex] = useState<number | null>(selectedOptionIndex);
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

	const displayMultipleChoiceFormErrors = () => {
		if (!Object.keys(form.errors).length) return null;
		return <p className="text-sm text-red-500">{form.errors.multipleChoiceOptions || ""}</p>;
	};

	return (
		<div>
			<p className="mt-4 font-semibold">Answer Options</p>
			{form.values.multipleChoiceOptions.map((option, index) => (
				<div key={option.id} className="flex items-center gap-2 my-2 justify-center">
					<Radio
						checked={index === selectedRadioIndex}
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
			{displayMultipleChoiceFormErrors()}
			<p className="text-gray-600 text-sm mt-2.5">
				Select the radio button next to correct answer option
			</p>
		</div>
	);
};

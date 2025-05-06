import { Input } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { FaAngleDown } from "react-icons/fa";
import type { TCardCreateFormValues } from "../../types/card.type";

type TCardTypeSelectorProps = {
	form: UseFormReturnType<TCardCreateFormValues>;
	setCardType: React.Dispatch<React.SetStateAction<"BASIC" | "MULTIPLE_CHOICE">>;
};

export const CardTypeSelector = ({ form, setCardType }: TCardTypeSelectorProps) => {
	const { onChange: onChangeCardType, ...otherCardTypePropery } = form.getInputProps("cardType");
	return (
		<div>
			<p className="font-semibold">Card Type </p>
			<Input
				component="select"
				rightSection={<FaAngleDown size={14} />}
				pointer
				mt="sm"
				{...otherCardTypePropery}
				onChange={(event) => {
					onChangeCardType(event);
					setCardType(event.currentTarget.value as "BASIC" | "MULTIPLE_CHOICE");
				}}
			>
				<option value="BASIC">Basic</option>
				<option value="MULTIPLE_CHOICE">Multiple Choice</option>
			</Input>
		</div>
	);
};

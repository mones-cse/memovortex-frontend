import { Button } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { TCardCreateUpdateFormValues } from "../../types/card.type";

export const CardContentActionButtons = ({
	form,
	onUpdate,
	isSubmitting,
}: {
	form: UseFormReturnType<TCardCreateUpdateFormValues>;
	onUpdate: () => void;
	isSubmitting: boolean;
}) => {
	return (
		// TODO: cancel button does not make sense here\
		<div className="flex gap-1 justify-end">
			<Button variant="outline" color="gray" onClick={() => onUpdate()}>
				Cancel
			</Button>
			<Button
				variant="filled"
				color="blue"
				type="submit"
				disabled={!form.isDirty() || isSubmitting}
			>
				Update
			</Button>
		</div>
	);
};

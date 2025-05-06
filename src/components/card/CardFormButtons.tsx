import { Button } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { userStore } from "../../stores/store";
import type { TCardCreateFormValues } from "../../types/card.type";

type CardFormButtonsProps = {
	isSubmitting: boolean;
	form: UseFormReturnType<TCardCreateFormValues>;
};

export const CardFormButtons = ({ isSubmitting, form }: CardFormButtonsProps) => {
	const store = userStore();

	return (
		<div className="flex gap-1 justify-end mt-4">
			<Button
				variant="outline"
				color="gray"
				onClick={() => store.closeModal()}
				disabled={isSubmitting}
			>
				Cancel
			</Button>
			<Button
				variant="filled"
				color="blue"
				type="submit"
				disabled={!form.isDirty() || isSubmitting}
			>
				{isSubmitting ? "Saving..." : "Save"}
			</Button>
		</div>
	);
};

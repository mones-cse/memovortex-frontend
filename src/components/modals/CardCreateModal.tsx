import { Button, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { FaAngleDown } from "react-icons/fa6";
import { useCreateCardMutation } from "../../hooks/mutations/card";
import { cardSchemas } from "../../schemas/index.schemas";
import { userStore } from "../../stores/store";
import type { ModalProps } from "../../types/modal.type";
import MinimalInputWithImages from "../card/MinimalInputWithImages";

interface ImageItem {
	file: File;
	preview: string;
	id: string;
}

export const CardCreateModal = ({ deckId }: ModalProps["newCard"]) => {
	const store = userStore();

	const { mutateAsync } = useCreateCardMutation();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			frontText: "",
			frontImage: [] as ImageItem[],
			backText: "",
			backImage: [] as ImageItem[],
			cardType: "BASIC",
		},
		validate: zodResolver(cardSchemas.cardCreateSchema),
		validateInputOnChange: true,
	});

	const handleSaveNote = async (values: typeof form.values) => {
		console.log("Form values:", values);
		if (form.isValid()) {
			await mutateAsync({ ...values, deckId });
			store.closeModal();
		}
	};

	return (
		<div className="py-2">
			<form onSubmit={form.onSubmit(handleSaveNote)}>
				<Input.Wrapper label="Card Type">
					<Input
						component="select"
						rightSection={<FaAngleDown size={14} />}
						pointer
						mt="sm"
						{...form.getInputProps("cardType")}
					>
						<option value="BASIC">Basic</option>
						<option value="MULTIPLE_CHOICE" disabled={true}>
							Multiple Choice
						</option>
					</Input>
				</Input.Wrapper>

				<MinimalInputWithImages
					lable="Card Front"
					form={form}
					formKeyText={"frontText"}
					formKeyImage={"frontImage"}
				/>

				<MinimalInputWithImages
					lable="Card Back"
					form={form}
					formKeyText={"backText"}
					formKeyImage={"backImage"}
				/>

				<div className="flex gap-1 justify-end mt-4">
					<Button
						variant="outline"
						color="gray"
						onClick={() => store.closeModal()}
					>
						Cancle
					</Button>
					<Button
						variant="filled"
						color="blue"
						type="submit"
						disabled={!form.isDirty()}
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
};

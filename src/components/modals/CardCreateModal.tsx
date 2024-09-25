import { Button, Input, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { FaAngleDown } from "react-icons/fa6";
import { useCreateCardMutation } from "../../hooks/mutations/card";
import { cardSchemas } from "../../schemas/index.schemas";
import { userStore } from "../../stores/store";
import type { ModalProps } from "../../types/modal.type";

export const CardCreateModal = ({ deckId }: ModalProps["newCard"]) => {
	const store = userStore();

	const { mutateAsync } = useCreateCardMutation();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			frontText: "",
			backText: "",
			cardType: "BASIC",
		},
		validate: zodResolver(cardSchemas.cardCreateSchema),
		validateInputOnChange: true,
	});

	const handleSaveNote = async (values: typeof form.values) => {
		if (form.isValid()) {
			await mutateAsync({ ...values, deckId });
			store.closeModal();
		}
	};

	return (
		<div className="py-4">
			<form onSubmit={form.onSubmit(handleSaveNote)}>
				<Input.Wrapper label="Card Type">
					<Input
						component="select"
						rightSection={<FaAngleDown size={14} />}
						pointer
						mt="md"
						{...form.getInputProps("cardType")}
					>
						<option value="BASIC">Basic</option>
						<option value="MULTIPLE_CHOICE" disabled={true}>
							Multiple Choice
						</option>
					</Input>
				</Input.Wrapper>
				<br />
				<Textarea
					label="Card Front"
					placeholder="Insert Question"
					minRows={4}
					{...form.getInputProps("frontText")}
					key={form.key("frontText")}
				/>
				<br />

				<Textarea
					label="Card Back"
					placeholder="Insert Answer"
					autosize
					minRows={4}
					{...form.getInputProps("backText")}
					key={form.key("backText")}
					mb="sm"
				/>
				<div className="flex gap-1 justify-end">
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

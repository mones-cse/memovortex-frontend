import { Button, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useCreateDeckMutation } from "../../hooks/mutations/deck";
import { deckSchemas } from "../../schemas/index.schemas";
import { userStore } from "../../stores/store";

export const DeckCreateModal = () => {
	const store = userStore();
	const { mutateAsync } = useCreateDeckMutation();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			deckTitle: "",
			deckDescription: "",
		},
		validate: zodResolver(deckSchemas.deckCreateSchema),
		validateInputOnChange: true,
	});

	const handleSaveNote = async (values: typeof form.values) => {
		if (form.isValid()) {
			await mutateAsync(values);
			store.closeModal();
		}
	};

	return (
		<div className="py-4">
			<form onSubmit={form.onSubmit(handleSaveNote)}>
				<TextInput
					label="Deck Title"
					placeholder="Insert deck title"
					{...form.getInputProps("deckTitle")}
					key={form.key("deckTitle")}
				/>
				<br />

				<Textarea
					label="Deck Details"
					placeholder=""
					autosize
					minRows={4}
					maxRows={8}
					{...form.getInputProps("deckDescription")}
					key={form.key("deckDescription")}
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

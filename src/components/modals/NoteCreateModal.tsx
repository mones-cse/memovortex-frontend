import { Button, Checkbox, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useCreateNoteMutation } from "../../hooks/mutations/note";
import { noteSchemas } from "../../schemas/index.schemas";
import { userStore } from "../../stores/store";
import { CustomColorPicker } from "../../ui/CustomColorPicker";

export const NoteCreateModal = () => {
	const store = userStore();
	const { mutateAsync } = useCreateNoteMutation();
	const setNoteBgColor = (color: string) => {
		form.setFieldValue("noteBgColor", color);
	};

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			noteTitle: "",
			noteContent: "",
			isNoteFavourite: false,
			noteBgColor: "#FFFFFF",
		},
		validate: zodResolver(noteSchemas.noteCreateSchema),
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
					label="Note Title"
					placeholder="Insert note title"
					{...form.getInputProps("noteTitle")}
					key={form.key("noteTitle")}
				/>

				<Textarea
					label="Note Details"
					placeholder=""
					autosize
					minRows={4}
					maxRows={8}
					{...form.getInputProps("noteContent")}
					key={form.key("noteContent")}
					mb="sm"
				/>
				<Checkbox
					label="Make this note star"
					{...form.getInputProps("isNoteFavourite")}
					key={form.key("isNoteFavourite")}
					mb="sm"
				/>
				<CustomColorPicker
					value={form.getValues().noteBgColor}
					onChange={setNoteBgColor}
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

import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useCreateFolderMutation } from "../../hooks/mutations/document";
import { folderSchemas } from "../../schemas/index.schemas";
import { userStore } from "../../stores/store";

export const FolderCreateModal = ({
	parentId,
}: { parentId: string | null }) => {
	const store = userStore();
	const { mutateAsync } = useCreateFolderMutation();

	const form = useForm({
		initialValues: {
			folderName: "",
			parentId: parentId,
		},
		validate: zodResolver(folderSchemas.folderCreateSchema),
	});

	const handleCreateFolder = async (values: typeof form.values) => {
		if (form.isValid()) {
			await mutateAsync(values);
			store.closeModal();
		}
	};

	return (
		<div className="py-4">
			<form onSubmit={form.onSubmit(handleCreateFolder)}>
				<TextInput
					label="Folder Name"
					placeholder="Insert folder name"
					{...form.getInputProps("folderName")}
					key={form.key("folderName")}
				/>
				<br />

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

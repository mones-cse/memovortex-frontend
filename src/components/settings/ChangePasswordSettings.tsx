import { Button, Card, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useChangePasswordMutation } from "../../hooks/mutations/auth";
import { userSchemas } from "../../schemas/index.schemas";

const CustomCard = Card.withProps({
	shadow: "md",
	padding: "md",
	radius: "md",
	withBorder: true,
});

const CustomCardSection = Card.Section.withProps({
	withBorder: true,
	inheritPadding: true,
	py: "xs",
	mb: "md",
});

export const ChangePasswordSettings = () => {
	const changePasswordMutation = useChangePasswordMutation();
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},

		validate: zodResolver(userSchemas.userPasswordChange),
		validateInputOnChange: true,
	});
	const handleSubmit = async (values: typeof form.values) => {
		if (form.isValid()) {
			const { currentPassword: oldPassword, newPassword } = values;
			await changePasswordMutation.mutateAsync({ oldPassword, newPassword });
			form.reset();
		}
	};

	return (
		<CustomCard>
			<CustomCardSection>Change password</CustomCardSection>
			<Stack gap={"md"}>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						label="Current Password"
						placeholder="Current Password"
						description="Provide your current password"
						key={form.key("currentPassword")}
						{...form.getInputProps("currentPassword")}
						mb="sm"
					/>
					<TextInput
						label="New Password"
						placeholder="New Password"
						description="Provide your new password"
						key={form.key("newPassword")}
						{...form.getInputProps("newPassword")}
						mb="sm"
					/>
					<TextInput
						label="Confirm New Password"
						placeholder="Confirm New Password"
						description="Confirm your new password"
						key={form.key("confirmNewPassword")}
						{...form.getInputProps("confirmNewPassword")}
						mb="sm"
					/>

					<Button type="submit" fullWidth disabled={!form.isDirty()} mt="md">
						Update Password
					</Button>
				</form>
			</Stack>
		</CustomCard>
	);
};

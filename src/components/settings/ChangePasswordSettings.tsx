import { Button, Card, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

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

const schema = z
	.object({
		currentPassword: z
			.string()
			.min(5, { message: "Password must be at least 5 characters" })
			.max(20, { message: "Password must be at most 20 characters" }),
		newPassword: z
			.string()
			.min(5, { message: "Password must be at least 5 characters" })
			.max(20, { message: "Password must be at most 20 characters" }),
		confirmNewPassword: z
			.string()
			.min(5, { message: "Password must be at least 5 characters" })
			.max(20, { message: "Password must be at most 20 characters" }),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "Passwords do not match",
		path: ["confirmNewPassword"],
	});

export const ChangePasswordSettings = () => {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},

		validate: zodResolver(schema),
		validateInputOnChange: true,
	});
	const handleSubmit = async (values: typeof form.values) => {
		if (form.isValid()) {
			const { currentPassword, newPassword, confirmNewPassword } = values;
			try {
				// Call API to change password
				console.log(
					"🚀 ~ handleSubmit ~ currentPassword, newPassword, confirmNewPassword:",
					currentPassword,
					newPassword,
					confirmNewPassword,
				);
			} catch (error) {
				// Handle error
				console.log("🚀 ~ handleSubmit ~ error:", error);
			}
		}
	};
	// form.clearErrors() can be used to clear errors

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
					/>
					<TextInput
						label="New Password"
						placeholder="New Password"
						description="Provide your new password"
						key={form.key("newPassword")}
						{...form.getInputProps("newPassword")}
					/>
					<TextInput
						label="Confirm New Password"
						placeholder="Confirm New Password"
						description="Confirm your new password"
						key={form.key("confirmNewPassword")}
						{...form.getInputProps("confirmNewPassword")}
					/>

					<Button type="submit" fullWidth disabled={!form.isDirty()} mt="md">
						Update Password
					</Button>
				</form>
			</Stack>
		</CustomCard>
	);
};

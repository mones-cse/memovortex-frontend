import { Avatar, Card, TextInput } from "@mantine/core";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import { RiEditFill } from "react-icons/ri";
import { useUserInformationMutation } from "../../hooks/mutations/user";
import { useAuth } from "../../hooks/useAuth";
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

export const AccountInfoSettings = () => {
	const userInformationMutation = useUserInformationMutation();
	const { user } = useAuth();
	const [isEditing, setIsEditing] = useState(false);

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			fullName: user?.fullName || "",
			email: user?.email || "",
		},
		validate: zodResolver(userSchemas.accountInfoSchema),
		validateInputOnChange: true,
	});

	const handleSubmit = async (values: typeof form.values) => {
		if (form.isValid()) {
			const { fullName } = values;
			await userInformationMutation.mutateAsync({
				fullName,
			});
			setIsEditing(false);
		}
	};

	return (
		<CustomCard>
			<CustomCardSection>
				<div className="flex justify-between">
					<p>Account Info</p>
					<Button
						variant="filled"
						onClick={() => {
							setIsEditing((x) => !x);
							form.setFieldValue("fullName", user?.fullName || "");
						}}
					>
						<RiEditFill />
					</Button>
				</div>
			</CustomCardSection>
			<Avatar
				key={user?.fullName}
				name={user?.fullName}
				color="initials"
				alt="it's me"
				mb="sm"
			/>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<TextInput
					label="Full Name"
					key={form.key("fullName")}
					{...form.getInputProps("fullName")}
					disabled={!isEditing}
					mb="sm"
				/>
				<TextInput
					label="Email"
					key={form.key("email")}
					{...form.getInputProps("email")}
					disabled
					mb="sm"
				/>
				<div className="flex justify-end gap-1">
					{isEditing && (
						<Button
							variant="outline"
							color="gray"
							onClick={() => {
								form.setFieldValue("fullName", user?.fullName || "");
								setIsEditing(false);
							}}
						>
							Cancle
						</Button>
					)}
					{isEditing && <Button type="submit">Save</Button>}
				</div>
			</form>
		</CustomCard>
	);
};

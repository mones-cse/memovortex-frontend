import { Avatar, Card, Input } from "@mantine/core";
import { Button } from "@mantine/core";
import { useState } from "react";
import { RiEditFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useUserInformationMutation } from "../../hooks/mutations/user";
import { useAuth } from "../../hooks/useAuth";

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
	const [fullName, setFullName] = useState(user?.full_name);

	const handleSubmit = async () => {
		console.log("Form submitted", fullName);
		try {
			const response = await userInformationMutation.mutateAsync({
				full_name: fullName || "",
			});
			if (response && response.status === 200) {
				toast.success("info updated successfully");
				setIsEditing(false);
			}
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: "An error occurred during password change",
			);
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
						}}
					>
						<RiEditFill />
					</Button>
				</div>
			</CustomCardSection>
			<Avatar
				key={user?.full_name}
				name={user?.full_name}
				color="initials"
				alt="it's me"
				mb="sm"
			/>

			<Input.Wrapper label="Full Name" mb="sm">
				<Input
					placeholder="Full Name"
					type="text"
					value={fullName}
					disabled={!isEditing}
					onChange={(event) => {
						setFullName(event.target.value);
					}}
				/>
			</Input.Wrapper>

			<Input.Wrapper label="Email">
				<Input placeholder="Full Name" value={user?.email} disabled mb="sm" />
			</Input.Wrapper>

			{isEditing && <Button onClick={handleSubmit}>Save</Button>}
		</CustomCard>
	);
};

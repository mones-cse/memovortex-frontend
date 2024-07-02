import { Avatar, Card, Space } from "@mantine/core";
import { useAuth } from "../../hooks/useAuth";
import { ChangePasswordSettings } from "./ChangePasswordSettings";

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

export const GeneralSettings = () => {
	const { user } = useAuth();

	return (
		<div>
			<CustomCard>Settings</CustomCard>
			<Space h="md" />
			<CustomCard>
				<CustomCardSection>Account Info</CustomCardSection>
				<Avatar
					key={user?.full_name}
					name={user?.full_name}
					color="initials"
					alt="it's me"
				/>
				<div> Name {user?.full_name} </div>
				<div>email {user?.email}</div>
			</CustomCard>
			<Space h="md" />
			<ChangePasswordSettings />
		</div>
	);
};

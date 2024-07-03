import { Avatar, Card, Input, Space } from "@mantine/core";
import { Button } from "@mantine/core";
import { RiEditFill } from "react-icons/ri";
import { useAuth } from "../../hooks/useAuth";
import { AccountInfoSettings } from "./AccountInfoSettings";
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
			<Space h="sm" />
			<AccountInfoSettings />
			<Space h="sm" />
			<ChangePasswordSettings />
		</div>
	);
};

import { Card, Space } from "@mantine/core";
import { AccountInfoSettings } from "./AccountInfoSettings";
import { ChangePasswordSettings } from "./ChangePasswordSettings";
const CustomCard = Card.withProps({
	shadow: "md",
	padding: "md",
	radius: "md",
	withBorder: true,
});

export const GeneralSettings = () => {
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

import { AppShell, Burger, Button, Flex } from "@mantine/core";
import { NavLink as RouterNavLink } from "react-router-dom";
import logo from "../../../public/logo.png";

export const TopNav = ({
	opened,
	toggle,
}: { opened: boolean; toggle: () => void }) => {
	// const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell.Header>
			<Flex
				justify="space-between"
				align="center"
				style={{ padding: "10px 20px" }}
			>
				<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
				<RouterNavLink to="/">
					<img src={logo} alt="logo" style={{ width: "30px" }} />
				</RouterNavLink>
				<Button size="xs">🌙</Button>
			</Flex>
		</AppShell.Header>
	);
};

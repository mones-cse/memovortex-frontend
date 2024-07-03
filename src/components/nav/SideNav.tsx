import { AppShell, NavLink as MantineNavLink, ScrollArea } from "@mantine/core";
import { FaHome, FaInfo, FaStickyNote } from "react-icons/fa";
import { NavLink as RouterNavLink } from "react-router-dom";

const mainLinksData = [
	{ icon: <FaHome />, label: "home", to: "/" },
	{ icon: <FaInfo />, label: "about", to: "/about" },
	{ icon: <FaStickyNote />, label: "notes", to: "/notes" },
];

export const SideNav = () => {
	return (
		<>
			<AppShell.Section grow component={ScrollArea}>
				{mainLinksData.map((link) => (
					<MantineNavLink
						label={link.label}
						component={RouterNavLink}
						to={link.to}
						leftSection={link.icon}
						key={link.label}
					/>
				))}
			</AppShell.Section>
		</>
	);
};

import { AppShell, NavLink as MantineNavLink, ScrollArea } from "@mantine/core";
import { FaFolder, FaHome, FaInfo, FaStickyNote } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa6";

import { NavLink as RouterNavLink } from "react-router-dom";

const mainLinksData = [
	{ icon: <FaHome />, label: "home", to: "/" },
	{ icon: <FaInfo />, label: "about", to: "/about" },
	{ icon: <FaStickyNote />, label: "notes", to: "/notes" },
	{ icon: <FaFolder />, label: "Documents", to: "/documents" },
	{ icon: <FaRegFolderOpen />, label: "Deck", to: "/deck" },
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

import { AppShell, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SideNav } from "../components/nav/SideNav";
import { TopNav } from "../components/nav/TopNav";
import { UserMenuNav } from "../components/nav/UserMenuNav";

type MainLayoutProps = {
	children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const [opened, { toggle }] = useDisclosure();
	return (
		<AppShell
			header={{ height: { base: 48, sm: 60, lg: 76 } }}
			navbar={{
				width: 200,
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			style={{ padding: "0px" }}
		>
			<TopNav opened={opened} toggle={toggle} />
			<AppShell.Navbar p="xs">
				<SideNav />
				<Divider my="xs" />
				<UserMenuNav />
			</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
};

export default MainLayout;

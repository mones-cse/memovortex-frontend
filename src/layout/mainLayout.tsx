import {
	ActionIcon,
	AppShell,
	Avatar,
	Burger,
	Button,
	Divider,
	Flex,
	Menu,
	ScrollArea,
} from "@mantine/core";
import { NavLink as MantineNavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CiLogout, CiSettings } from "react-icons/ci";
import { FaHome, FaInfo } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink as RouterNavLink } from "react-router-dom";
import logo from "../../public/logo.png";
import { useAuth } from "../hooks/useAuth";

type MainLayoutProps = {
	children: React.ReactNode;
};

const mainLinksData = [
	{ icon: <FaHome />, label: "home", to: "/" },
	{ icon: <FaInfo />, label: "about", to: "/about" },
];
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const { logout, user } = useAuth();
	const [opened, { toggle }] = useDisclosure();
	const MainLinks = () => {
		return (
			<>
				{mainLinksData.map((link) => (
					<MantineNavLink
						label={link.label}
						component={RouterNavLink}
						to={link.to}
						leftSection={link.icon}
						key={link.label}
					/>
				))}
			</>
		);
	};
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
			{/* <SideNav /> */}
			<AppShell.Header style={{}}>
				<Flex
					justify="space-between"
					align="center"
					style={{ padding: "10px 20px" }}
				>
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
					{/* <div>Logo</div> */}
					<RouterNavLink to="/">
						<img src={logo} alt="logo" style={{ width: "30px" }} />
					</RouterNavLink>
					<Button size="xs">🌙</Button>
				</Flex>
			</AppShell.Header>
			<AppShell.Navbar p="sm">
				<AppShell.Section grow component={ScrollArea}>
					<MainLinks />
				</AppShell.Section>
				<Divider my="xs" />
				<AppShell.Section>
					<div className="flex items-center justify-between">
						<div>
							<Avatar name={user?.full_name} color="initials" />
						</div>
						<div>
							<p className="text-sm font-bold">{user?.full_name}</p>
							<p className="text-xs text-slate-500">{user?.email}</p>
						</div>
						<Menu>
							<Menu.Target>
								<ActionIcon
									radius={100}
									size="auto"
									color="indigo"
									variant="outline"
								>
									<MdKeyboardArrowRight />
								</ActionIcon>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Label>Options</Menu.Label>
								<RouterNavLink to="/settings">
									<Menu.Item leftSection={<CiSettings />}>Settings</Menu.Item>
								</RouterNavLink>

								<Menu.Item leftSection={<CiLogout />} onClick={logout}>
									Logout
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</div>
					{/* <Flex justify={"space-around"} align={"center"}>
            <ActionIcon radius={100} size="auto">
              <Avatar src={avatar} alt="avatar" />
            </ActionIcon>

            <div className="flex">
              <p className="text-sm text-left">User Name</p>
              <p className="text-sm">random@email.com</p>
            </div>

            <Menu>
              <Menu.Target>
                <ActionIcon radius={100} size="auto">
                  <MdKeyboardArrowRight />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Options</Menu.Label>
                <RouterNavLink to="/settings">
                  <Menu.Item leftSection={<CiSettings />}>Settings</Menu.Item>
                </RouterNavLink>
                <RouterNavLink to="/logout">
                  <Menu.Item leftSection={<CiLogout />}>Logout</Menu.Item>
                </RouterNavLink>
              </Menu.Dropdown>
            </Menu>
          </Flex> */}
				</AppShell.Section>
			</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
};

export default MainLayout;

//use this code for nested links
/* <MantineNavLink
      label="Nested parent link"
      childrenOffset={28}
      href="#required-for-focus"
    >
      <MantineNavLink label="home" component={RouterNavLink} to={"/"} />
      <MantineNavLink
        label="about"
        component={RouterNavLink}
        to={"/about"}
      />
    </MantineNavLink> */

// use this code while loading the page to test the scrollable section

/* <AppShell.Section grow my="md" component={ScrollArea}>
      60 links in a scrollable section
      {Array(60)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} h={28} mt="sm" animate={false} />
        ))}
    </AppShell.Section> */

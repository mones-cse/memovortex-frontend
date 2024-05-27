import {
  AppShell,
  Burger,
  ScrollArea,
  Flex,
  Button,
  Avatar,
  Menu,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink as RouterNavLink } from "react-router-dom";
import { NavLink as MantineNavLink } from "@mantine/core";
import { FaHome, FaInfo } from "react-icons/fa";
import logo from "../../public/logo.png";
import avatar from "../assets/avatar.png";
import { CiSettings, CiLogout } from "react-icons/ci";
// import SideNav from "../components/sidenav/SideNav";
type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: { base: 48, sm: 60, lg: 76 } }}
      navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
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
      <AppShell.Navbar p="md">
        <AppShell.Section grow component={ScrollArea}>
          <MantineNavLink
            label="home"
            component={RouterNavLink}
            to={"/"}
            leftSection={<FaHome />}
          />
          <MantineNavLink
            label="about"
            component={RouterNavLink}
            to={"/about"}
            leftSection={<FaInfo />}
          />
        </AppShell.Section>

        <AppShell.Section>
          <Flex justify={"space-around"} align={"center"}>
            User Name
            <br />
            <Menu>
              <Menu.Target>
                <ActionIcon radius={100} size="auto">
                  <Avatar src={avatar} alt="avatar" />
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
          </Flex>
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
{
  /* <AppShell.Section grow my="md" component={ScrollArea}>
      60 links in a scrollable section
      {Array(60)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} h={28} mt="sm" animate={false} />
        ))}
    </AppShell.Section> */
}

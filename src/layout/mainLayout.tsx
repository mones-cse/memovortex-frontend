import {
  AppShell,
  Burger,
  Group,
  Skeleton,
  ScrollArea,
  Flex,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// import SideNav from "../components/sidenav/SideNav";
type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: { base: 48, sm: 60, lg: 76 } }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      {/* <SideNav /> */}
      <AppShell.Header>
        <Flex
          justify="space-between"
          align="center"
          style={{ padding: "10px 20px" }}
        >
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>Logo</div>

          <Button size="xs">🌙</Button>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section>Navbar header</AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
          60 links in a scrollable section
          {Array(60)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
        </AppShell.Section>
        <AppShell.Section>
          Navbar footer – always at the bottom
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;

import SideNav from "../components/sidenav/SideNav";
type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <SideNav />
      {children}
    </div>
  );
};

export default MainLayout;

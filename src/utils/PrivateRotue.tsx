import { Outlet, Navigate } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
const PrivateRoute = () => {
  const auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export const PrivateRouteWithLayout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
export default PrivateRoute;

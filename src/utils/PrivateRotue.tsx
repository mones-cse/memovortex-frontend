import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MainLayout from "../layout/mainLayout";

interface PrivateRouteProps {
	withLayout?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ withLayout = false }) => {
	const [isLoading, setIsLoading] = useState(true);
	const { isAuthenticated, checkAuth } = useAuth();

	useEffect(() => {
		console.log("called !!!!");
		const verifyAuth = async () => {
			await checkAuth();
			setIsLoading(false);
		};

		verifyAuth();
	}, [checkAuth]);

	if (isLoading) {
		return <div>Loading...</div>; // Or a proper loading component
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	if (withLayout) {
		return (
			<MainLayout>
				<Outlet />
			</MainLayout>
		);
	}

	return <Outlet />;
};

export default PrivateRoute;

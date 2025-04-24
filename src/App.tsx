import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import About from "./pages/about.tsx";
import Home from "./pages/home.tsx";
import Landing from "./pages/landing.tsx";
import Login from "./pages/login.tsx";
import Logout from "./pages/logout.tsx";
import Notes from "./pages/notes.tsx";
import Registration from "./pages/registration.tsx";
import Settings from "./pages/settings.tsx";
import Test from "./pages/test.tsx";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import Card from "./pages/card.tsx";
import Decks from "./pages/decks.tsx";
import Documents from "./pages/documents.tsx";
import Studies from "./pages/studies.tsx";
import Study from "./pages/study.tsx";
import { CentralModal } from "./ui/CentralModal.tsx";
import PrivateRoute from "./utils/PrivateRotue.tsx";

function App() {
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					{/* <PublicRoute path="/" element={<Landing />} /> */}
					<Route element={<PrivateRoute />}>
						<Route element={<PrivateRoute withLayout={true} />}>
							<Route path="/about" element={<About />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/notes" element={<Notes />} />
							<Route path="/documents" element={<Documents />} />
							<Route path="/folder/:id" element={<Documents />} />
							<Route path="/decks" element={<Decks />} />
							<Route path="/studies" element={<Studies />} />
							<Route path="/card/:id" element={<Card />} />
							<Route path="/studies/:id" element={<Study />} />
							<Route path="/logout" element={<Logout />} />
							<Route path="test" element={<Test />} />
							<Route path="/" element={<Home />} />
							<Route path="*" element={<Home />} />
						</Route>
					</Route>
					<Route path="/landing" element={<Landing />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/login" element={<Login />} />
				</Routes>

				<CentralModal />
				<ToastContainer closeOnClick />
			</Suspense>
		</>
	);
}

export default App;

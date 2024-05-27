import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./containers/home.tsx";
import Landing from "./containers/landing.tsx";
// import { PublicRoute } from "./components/routes/customeRoute.tsx";
import PrivateRoute, { PrivateRouteWithLayout } from "./utils/PrivateRotue.tsx";
import Login from "./containers/login.tsx";
import Registration from "./containers/registration.tsx";
import About from "./containers/about.tsx";
function App() {
  return (
    <>
      <Routes>
        {/* <PublicRoute path="/" element={<Landing />} /> */}
        <Route element={<PrivateRoute />}>
          <Route element={<PrivateRouteWithLayout />}>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

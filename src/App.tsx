import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home.tsx";
import Landing from "./pages/landing.tsx";
function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/landing">Landing</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
      {/* <p>Hello world</p> */}
    </>
  );
}

export default App;

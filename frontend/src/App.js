import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import AuthPage from "./AuthPage";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import MyTrips from "./pages/MyTrips";

function App() {

  const token = localStorage.getItem("token");

  if (!token) {
    return <AuthPage />;
  }

  return (

    <BrowserRouter>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/destinations"
          element={<Destinations />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/help"
          element={<Help />}
        />

        <Route
          path="/my-trips"
          element={<MyTrips />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
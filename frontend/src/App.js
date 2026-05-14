import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from "./AuthPage";
import MainApp from "./MainApp";

function App() {

  const isLoggedIn =
    localStorage.getItem("travelUser");

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            isLoggedIn
              ? <MainApp />
              : <AuthPage />
          }
        />

        <Route
          path="/home"
          element={<MainApp />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
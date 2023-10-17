import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/user/landingPage";
import RegistrationPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";

function App() {
  return (
    <div data-theme="light">

      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route element={<LoginPage />} path="/login" />


      </Routes>

    </div>
  );
}

export default App;
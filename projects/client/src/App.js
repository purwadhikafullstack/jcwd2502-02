//import component/pages
import RegistrationPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import {useNavigate, useLocation, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div data-theme="light">
        <div>
          <Routes>
            <Route path="register" element={<RegistrationPage />}/>
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
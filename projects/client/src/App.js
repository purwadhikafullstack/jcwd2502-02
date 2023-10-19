import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/user/landingPage";
import RegistrationPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import ProductListPage from "./pages/user/productList";
import ProfilePage from "./pages/user/profilePage";
import UpdateProfile from "./pages/user/updateProfilePage";

function App() {
  return (
    <div data-theme="light">

      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ProductListPage />} path="/products" />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/updateprofile' element={<UpdateProfile />} />
      </Routes>

    </div>
  );
}

export default App;
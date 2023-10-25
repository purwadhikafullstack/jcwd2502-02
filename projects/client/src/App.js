import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/user/landingPage";
import LandingPage2 from "./pages/user/landingPage2";
import RegistrationPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import ProductListPage from "./pages/user/productList";
import ProfilePage from "./pages/user/profilePage";
import UpdateProfile from "./pages/user/updateProfilePage";
import VerificationPage from "./pages/verificationPage";

function App() {
  // setup onCheckIsLogin
  return (
    <div data-theme="light">

      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<LandingPage2 />} path="/v2" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ProductListPage />} path="/products" />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/updateprofile' element={<UpdateProfile />} />
        <Route path='/verify/:id' element={<VerificationPage />} />
      </Routes>

    </div>
  );
}

export default App;
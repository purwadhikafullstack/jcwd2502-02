import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/user/landingPage";
import LandingPage2 from "./pages/user/landingPage2";
import RegistrationPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import ProductListPage from "./pages/user/productList";
import ProfilePage from "./pages/user/profilePage";
import UpdateProfile from "./pages/user/updateProfilePage";
import VerificationPage from "./pages/verificationPage";
import UpdateProductsCategoryPage from "./pages/admin/updateCategoryPage";

import { onCheckIsLogin } from "./redux/Features/users";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onGetBranchAsync } from "./redux/Features/branch";
import { nearestBranch } from "./redux/Features/branch";

// import routes baru
import routes from "./routes/Routes";

function App() {
  const user = useSelector((state) => state.users)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onCheckIsLogin());
    dispatch(onGetBranchAsync())
    dispatch(nearestBranch())
  }, [user.id])

  return (
    <div data-theme="light">
      {/* <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<LandingPage2 />} path="/v2" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ProductListPage />} path="/products" />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/updateprofile' element={<UpdateProfile />} />
        <Route path='/verify/:id' element={<VerificationPage/>} />
      </Routes> */}

      <Routes>
        {routes.map((value) => value)}
      </Routes>
    </div>
  );
}

export default App;
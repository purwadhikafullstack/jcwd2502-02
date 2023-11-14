import { Route } from "react-router-dom";
import LandingPage from "../pages/user/landingPage";
import LandingPage2 from "../pages/user/landingPage2";
import RegistrationPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";
import ProductListPage from "../pages/user/productList";
import ProductListAdminPage from "../pages/admin/productListAdmin";
import ProfilePage from "../pages/user/profilePage";
import UpdateProfile from "../pages/user/updateProfilePage";
import VerificationPage from "../pages/verificationPage";
import UpdateProductsCategoryPage from "../pages/admin/updateCategoryPage";
import UpdateProductsPage from "../pages/admin/updateProductsPage";
import UpdateProductStocksPage from "../pages/admin/updateProductStocks";
import ForgotPasswordPage from "../pages/forgotPasswordPage";
import ChangePasswordPage from "../pages/changePassPage";
import UpdatePasswordPage from "../pages/user/profilePasswordPage";
import NotFoundPage from "../pages/404";
import UpdatePass2 from "../pages/user/profilePassword";
import ProductDetailPage from "../pages/user/productDetailPage";
import BranchProductDetailPage from "../pages/user/branchProductDetailPage";
import ManageAddress from "../pages/user/manageAddressPage";
import Cart from "../pages/user/cartPage";
import CheckoutPage from "../pages/user/checkoutPage";
import CreateAdminPage from "../pages/admin/createAdminPage";
import SuperOrderList from "../pages/admin/superOrderListPage";
import AdminDashboardPage from "../pages/admin/adminDashboard";
import ProductStockHistoryPage from "../pages/admin/productStockHistory";
import UserOrderDetail from "../pages/user/orderDetailPage";

import Protected from "./protected";

const routes = [
    <Route path='/' element={
        <Protected userPage={true}>
            <LandingPage />
        </Protected>
    } />,
    <Route path='/v2' element={
        <Protected userPage={true}>
            <LandingPage2 />
        </Protected>
    } />,
    <Route path='/profile' element={
        <Protected userPage={true}>
            <ProfilePage />
        </Protected>
    } />,
    <Route path='/updateprofile' element={
        <Protected userPage={true}>
            <UpdateProfile />
        </Protected>
    } />,
    <Route path='/updatecategory' element={
        <UpdateProductsCategoryPage />
    } />,
    <Route path='/updateproducts' element={
        <UpdateProductsPage />
    } />,
    <Route path='/register' element={
        <Protected guestPage={true}>
            <RegistrationPage />
        </Protected>
    } />,
    <Route path='/login' element={
        <Protected guestPage={true}>
            <LoginPage />
        </Protected>
    } />,
    <Route path='/products' element={
        <ProductListPage />
    } />,
    <Route path='/all-product-list' element={
        <ProductListAdminPage />
    } />,
    <Route path='/products/detail/:id' element={
        <ProductDetailPage />
    } />,
    <Route path='/branch/products/detail/:id' element={
        <BranchProductDetailPage />
    } />,
    <Route path='/update-product-stocks' element={
        <UpdateProductStocksPage />
    } />,
    <Route path='/verify/:id' element={
        <VerificationPage />
    } />,
    <Route path='/forgot-password' element={
        <ForgotPasswordPage />
    } />,
    <Route path='/change-password/:id' element={
        <ChangePasswordPage />
    } />,
    <Route path='/profile-password' element={
        < UpdatePasswordPage />
    } />,

    <Route path='/profile-password2' element={
        < UpdatePass2 />
    } />,

    <Route path='/manage-address' element={
        < ManageAddress />
    } />,
    <Route path='/cart' element={
        <Cart />
    } />,
    <Route path='/checkout' element={
        <CheckoutPage />
    } />,
    <Route path='/order/:id' element={
        <UserOrderDetail />
    } />,
    <Route path='/admin/order-list' element={
        <SuperOrderList />
    } />,

    <Route path='/user-management' element={
        < CreateAdminPage />
    } />,

    <Route path='/admin-dashboard' element={
        < AdminDashboardPage />
    } />,

    <Route path='/stock-history' element={
        < ProductStockHistoryPage />
    } />,

    <Route path='/*' element={
        < NotFoundPage />
    } />,
]

export default routes;

// logikanya adalah
// admin TIDAK BOLEH MASUK PAGE USER
// user TIDAK BOLEH MASUK PAGE ADMIN
// KETIKA TERJADI UNAUTHORIZED ACCESS MAKA AKAN DI REDIRECT KE PAGE 404 ERROR
//  DISITU AKAN DIKABARKAN BAHWA AKUN INI TIDAK MEMILIKI AKSES KE PAGE PAGE TERSEBUT LALU AKAN DI REDIRECT KE HOME ('/') UNTUK USER, ATAU ('/ADMIN') UNTUK ADMIN

import { Route } from "react-router-dom";
import LandingPage from "../pages/user/landingPage";
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
import AdminDashboardPage from "../pages/admin/adminDashboard";
import ProductStockHistoryPage from "../pages/admin/productStockHistory";
import ManageProductDiscountPage from "../pages/admin/manageDiscountPage";
import UserOrderDetail from "../pages/user/orderDetailPage";
import UserOrderList from "../pages/user/orderListPage";
import Navbar from "../components/navbarUser";
import SalesReportPage from "../pages/admin/salesReport";
import AdminOrderList from "../pages/admin/adminOrderListPage";
import AdminOrderDetail from "../pages/admin/manageOrderDetailPage";

import SalesReportProduct from "../pages/admin/salesReportProduct";
import Protected from "./protected";

const routes = [
    <Route path='/' element={
        <Protected userPage={true}>
            <LandingPage />
        </Protected>
    } />,
    <Route path='/profile' element={
        <Protected userPage={false}>
            <ProfilePage />
        </Protected>
    } />,
    <Route path='/updateprofile' element={
        <Protected userPage={false}>
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
    <Route path='/manage-product-discount' element={
        <ManageProductDiscountPage />
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
    <Route path='/order-list' element={
        <UserOrderList />
    } />,
    <Route path='/order/:id' element={
        <Protected userPage={false}>
            <UserOrderDetail />
        </Protected>
    } />,
    <Route path='/admin/order-list' element={
        <AdminOrderList />
    } />,
    <Route path='/admin/order/:id' element={
        <AdminOrderDetail />
    } />,

    <Route path='/user-management' element={
        <Protected superadminPage={false}>
            < CreateAdminPage />
        </Protected>
    } />,

    <Route path='/admin-dashboard' element={
        <Protected superadminPage={false}>
            < AdminDashboardPage />
        </Protected>
    } />,

    <Route path='/sales-report/user' element={
        <Protected adminPage={false}>
            < SalesReportPage />
        </Protected>
    } />,

    <Route path='/sales-report/product' element={
        <Protected adminPage={false}>
            < SalesReportProduct />
        </Protected>
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

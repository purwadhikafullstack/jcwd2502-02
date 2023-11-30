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
import UpdatePasswordPage from "../pages/user/profilePasswordPage";
import NotFoundPage from "../pages/404";
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
        <Protected adminPage={true}>
            <UpdateProductsCategoryPage />
        </Protected>
    } />,
    <Route path='/updateproducts' element={
        <Protected adminPage={true}>
            <UpdateProductsPage />
        </Protected>
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
        <Protected userPage={true}>
            <ProductListPage />
        </Protected>
    } />,
    <Route path='/all-product-list' element={
        <Protected adminPage={true}>
            <ProductListAdminPage />
        </Protected>
    } />,
    <Route path='/products/detail/:id' element={
        <Protected userPage={true}>
            <ProductDetailPage />
        </Protected>
    } />,
    <Route path='/branch/products/detail/:id' element={
        <Protected userPage={true}>
            <BranchProductDetailPage />
        </Protected>
    } />,
    <Route path='/update-product-stocks' element={
        <Protected adminPage={true}>
            <UpdateProductStocksPage />
        </Protected>
    } />,
    <Route path='/manage-product-discount' element={
        <Protected adminPage={true}>
            <ManageProductDiscountPage />
        </Protected>
    } />,
    <Route path='/verify/:id' element={
        <VerificationPage />
    } />,
    <Route path='/forgot-password' element={
        <ForgotPasswordPage />
    } />,
    <Route path='/profile-password' element={
        <Protected userPage={true}>
            < UpdatePasswordPage />
        </Protected>
    } />,
    <Route path='/manage-address' element={
        <Protected userPage={true}>
            < ManageAddress />
        </Protected>
    } />,
    <Route path='/cart' element={
        <Protected userPage={true}>
            <Cart />
        </Protected>
    } />,
    <Route path='/checkout' element={
        <Protected userPage={true}>
            <CheckoutPage />
        </Protected>
    } />,
    <Route path='/order-list' element={
        <Protected userPage={true}>
            <UserOrderList />
        </Protected>
    } />,
    <Route path='/order/:id' element={
        <Protected userPage={true}>
            <UserOrderDetail />
        </Protected>
    } />,
    <Route path='/admin/order-list' element={
        <Protected adminPage={true}>
            <AdminOrderList />
        </Protected>
    } />,
    <Route path='/admin/order/:id' element={
        <Protected adminPage={true}>
            <AdminOrderDetail />
        </Protected>
    } />,
    <Route path='/user-management' element={
        <Protected superadminPage={true}>
            < CreateAdminPage />
        </Protected>
    } />,
    <Route path='/admin-dashboard' element={
        <Protected superadminPage={true}>
            < AdminDashboardPage />
        </Protected>
    } />,
    <Route path='/sales-report/user' element={
        <Protected adminPage={true}>
            < SalesReportPage />
        </Protected>
    } />,
    <Route path='/sales-report/product' element={
        <Protected adminPage={true}>
            < SalesReportProduct />
        </Protected>
    } />,
    <Route path='/stock-history' element={
        <Protected adminPage={true}>
            < ProductStockHistoryPage />
        </Protected>
    } />,
    <Route path='/*' element={
        < NotFoundPage />
    } />,
]
export default routes;

import { HiShoppingCart } from "react-icons/hi";
import { HiMenu } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import { FaUserLarge } from "react-icons/fa6";
import { RiFileList3Fill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAppSelector } from '../redux/App/Store';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Features/users";
import { getCartAsync } from "../redux/Features/cart";
import { clearCart } from "../redux/Features/cart";
import { useEffect } from "react";

const Navbar = () => {
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.cart)
    const user = useSelector((state) => state.users)
    const handleLogout = async (e) => {
        e.preventDefault()
        dispatch(logout());
        dispatch(clearCart());
    }

    useEffect(() => {
        dispatch(getCartAsync());
    }, [dispatch]);

    return (
        <div className="relative">
            < div className="bg-gradient-to-r from-yellow-300 to-green-600 flex justify-between px-3 md:px-20 lg:px-32 fixed top-0 w-screen z-50">
                <Link to={'/'}>
                    <div>
                        <img src="./buyfresh_logo.png" alt="app_logo" className="h-[70px]" />
                    </div>
                </Link>
                <div className="grid items-center">
                    <div className=" flex rounded-full bg-white">
                        <div className="flex items-center pl-2 text-green-800"><BiSearchAlt /></div>
                        <input type="text" className=" outline-none rounded-full h-[30px] w-[140px] md:w-[250px] lg:w-[300px] text-xs pl-2" placeholder=" Search on BuyFresh" />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="grid items-center relative mt-2 px-5">
                        <div><HiShoppingCart className="text-white text-4xl" /></div>
                        <div className="absolute top-0 right-0 border-2 border-green-800 rounded-full px-2 font-black bg-yellow-300 text-green-800 text-sm">{cart?.length}</div>
                    </div>

                    <div className="grid items-center">
                        <div className="drawer-end">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                <label htmlFor="my-drawer" className="drawer-button">
                                    {user.username ? (
                                        <img
                                            className="w-[45px] h-[45px] bg-base-200 rounded-full drawer-button"
                                            src={process.env.REACT_APP_URL + (user?.profile_picture || '')}
                                            alt=""
                                        />
                                    ) : (
                                        <HiMenu className="text-white text-3xl" />
                                    )}
                                    {/* 
                                    <img className="w-[45px] h-[45px] bg-base-200 rounded-full drawer-button " src={process.env.REACT_APP_URL + `${user?.profile_picture}`} alt="" /> */}
                                </label>
                            </div>
                            <div className="drawer-side">
                                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                                {
                                    user.username ?
                                        <ul className="menu p-4 w-64 md:w-80 min-h-full bg-white border-l-4 border-yellow-300 text-xl text-black ">
                                            <div className="grid place-content-center">
                                                <img className="w-[150px] h-[150px] bg-base-200 rounded-full drawer-button border-4 border-green-600" src={process.env.REACT_APP_URL + `${user?.profile_picture}`} alt="" />
                                            </div>
                                            <div className="bg-gradient-to-b from-yellow-300 to-green-600 rounded-3xl my-5 text-white">
                                                <div className="flex justify-center text-xl font-black pt-5">Welcome, {user?.username}!</div>
                                                <div className="flex justify-center text-md pb-5">{user?.email}</div>
                                            </div>
                                            <Link to={'/profile'}>
                                                <li className="hover:bg-green-600 rounded-full ease-in duration-200">
                                                    <div className="flex gap-5 hover:text-white rounded-full "><FaUserLarge /> My Profile</div>
                                                </li>
                                            </Link>
                                            <li className="hover:bg-green-600 rounded-full ease-in duration-200"><div className="flex gap-5 hover:text-white rounded-full ">
                                                <RiFileList3Fill />
                                                My Order</div></li>
                                            <li className="hover:bg-red-600 rounded-full ease-in duration-200" onClick={handleLogout}><div className="flex gap-5 hover:text-white rounded-full ">
                                                <RiLogoutBoxFill />Sign Out</div></li>
                                        </ul>
                                        :
                                        <ul className="menu p-4 w-60 min-h-full bg-base-200 text-xl">
                                            <Link to={`/login`}>
                                                <li className="hover:bg-green-600 rounded-full ease-in duration-200">
                                                    <div className="flex gap-5 hover:text-white rounded-full ease-in duration-200">
                                                        <RiLogoutBoxRFill />
                                                        Log in</div>
                                                </li>
                                            </Link>
                                            <Link to={`/register`}>
                                                <li className="hover:bg-green-600 rounded-full ease-in duration-200">
                                                    <div className="flex gap-5 hover:text-white rounded-full ease-in duration-200"><FaUserLarge />Sign Up</div></li>
                                            </Link>
                                        </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}
export default Navbar
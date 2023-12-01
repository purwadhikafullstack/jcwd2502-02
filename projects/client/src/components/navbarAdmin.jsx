import { HiShoppingCart } from "react-icons/hi";
import { HiMenu } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUserLarge } from "react-icons/fa6";
import { RiFileList3Fill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { logout } from "../redux/Features/users";
import { BsFillPieChartFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";



const NavbarAdmin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users)
    const handleLogout = async (e) => {
        e.preventDefault()
        dispatch(logout());
        navigate('/login')

    }

    return (
        <div className="relative">
            < div className="bg-gradient-to-r from-yellow-300 to-green-600 flex justify-between px-3 md:px-20 lg:px-32 fixed top-0 w-screen z-50">
                <div>
                    <Link to={"/admin-dashboard"}><img src={"./buyfresh_logo.png" && "https://cdn.discordapp.com/attachments/1159339445049368588/1174957031107608636/buyfresh_logo.png?ex=65697b01&is=65570601&hm=ff2240905e431008b2dccd668e94ce44a2e248efb11493b26c265c7dba380f28&"} alt="app_logo" className="h-[70px]" /></Link>
                </div>
                <div className="flex gap-5">
                    <div className="grid items-center">
                        <div className="drawer-end z-50">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle z-50" />
                            <div className="drawer-content">
                                <label htmlFor="my-drawer" className="drawer-button">
                                    {user.username ? (
                                        <img
                                            className="w-[45px] border-4 border-yellow-300 h-[45px] bg-base-200 rounded-full drawer-button"
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
                                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay z-0"></label>
                                {/* <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
                                    <li className="hover:bg-green-200"><a>Profile</a></li>
                                    <li className="hover:bg-green-200"><a>Manage Order</a></li>
                                    <li className="hover:bg-green-200"><a>Manage Product</a></li>
                                    <li className="hover:bg-green-200"><a>Manage Stock</a></li>
                                    <li className="hover:bg-green-200"><a>Manage Discount</a></li>
                                    <li className="hover:bg-green-200"><a>Sign Out</a></li>
                                </ul> */}

                                {
                                    user.username ?
                                        <ul className="menu p-4 w-64 md:w-80 min-h-full bg-white text-xl text-black ">

                                            <div>
                                                <div className="grid place-content-center">
                                                    <img className="w-[150px] h-[150px] bg-base-200 rounded-full drawer-button " src={process.env.REACT_APP_URL + `${user?.profile_picture}`} alt="" />
                                                </div>

                                                <div className="bg-gradient-to-b from-yellow-300 to-green-600 rounded-3xl my-5 text-white">
                                                    <div className="flex justify-center text-xl font-black pt-5">Welcome, {user?.username}!</div>
                                                    <div className="flex justify-center text-md pb-5">{user?.email}</div>
                                                </div>
                                            </div>
                                            {user.role == "superadmin" ?
                                                <Link to={'/user-management'}>
                                                    <li className="hover:bg-green-600 rounded-full ease-in duration-200">
                                                        <div className="flex gap-5 hover:text-white rounded-full "><FaUserLarge />Manage Admin</div>
                                                    </li>
                                                </Link>
                                                : null}
                                            <Link to={'/admin/order-list'}>
                                                <li className="hover:bg-green-600 rounded-full ease-in duration-200">
                                                    <div className="flex gap-5 hover:text-white rounded-full "><HiShoppingCart />Manage Order</div>
                                                </li>
                                            </Link>
                                            <Link to={'/updateproducts'}>
                                                <li className="hover:bg-green-600 rounded-full ease-in duration-200"><div className="flex gap-5 hover:text-white rounded-full ">
                                                    <RiFileList3Fill />
                                                    Manage Inventory</div></li>
                                            </Link>
                                            <Link to={'/stock-history'}>
                                                <li className="hover:bg-green-600 rounded-full ease-in duration-200"><div className="flex gap-5 hover:text-white rounded-full ">
                                                    <FaHistory />
                                                    Stock History</div></li>
                                            </Link>
                                            <Link to={'/sales-report/user'}>
                                                <li className="hover:bg-green-600 rounded-full ease-in duration-200"><div className="flex gap-5 hover:text-white rounded-full ">
                                                    <BsFillPieChartFill />
                                                    Sales Report</div></li>
                                            </Link>
                                            {/* <Link to={'/updatecategory'}>
                                                <li className="hover:bg-green-600 rounded-full ease-in duration-200"><div className="flex gap-5 hover:text-white rounded-full ">
                                                    <RiFileList3Fill />
                                                    Manage Category</div></li>
                                            </Link>
                                            <Link to={'/updateproducts'}>
                                                <li className="hover:bg-green-600 rounded-full ease-in duration-200"><div className="flex gap-5 hover:text-white rounded-full ">
                                                    <RiFileList3Fill />
                                                    Manage Product</div></li>
                                            </Link>
                                            <Link to={'/update-product-stocks?category='}>
                                                <li className="hover:bg-green-600 rounded-full ease-in duration-200"><div className="flex gap-5 hover:text-white rounded-full ">
                                                    <RiFileList3Fill />
                                                    Manage Stock</div></li>
                                            </Link>
                                            <Link to={'/manage-product-discount?category='}>
                                                <li className="hover:bg-green-600 rounded-full ease-in duration-200"><div className="flex gap-5 hover:text-white rounded-full ">
                                                    <RiFileList3Fill />
                                                    Manage Discount</div></li>
                                            </Link> */}
                                            {/* <Link to={'/update-product-stocks'}>
                                                <li className="hover:bg-green-600 rounded-full ease-in duration-200"><div className="flex gap-5 hover:text-white rounded-full ">
                                                    <FaBoxOpen />
                                                    Manage Stock</div></li>
                                            </Link> */}
                                            {/* <Link to={'/manage-product-discount'}>
                                                <li className="hover:bg-green-600 rounded-full ease-in duration-200"><div className="flex gap-5 hover:text-white rounded-full ">
                                                    <PiPercentFill />
                                                    Manage Discount</div></li>
                                            </Link> */}
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

export default NavbarAdmin
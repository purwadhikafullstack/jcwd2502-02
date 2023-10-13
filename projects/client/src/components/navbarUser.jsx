import { HiShoppingCart } from "react-icons/hi";
// import { HiMenu } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";


const Navbar = () => {
    return (
        <div className="relative">
            < div className="bg-gradient-to-r from-emerald-100 to-green-700 flex justify-between px-3 md:px-20 lg:px-32 fixed top-0 w-screen ">

                <div>
                    <img src="./buyfresh_logo.png" alt="app_logo" className="h-[70px]" />
                </div>

                <div className="grid items-center">
                    <div className=" flex rounded-full bg-white">
                        <div className="flex items-center pl-2 text-green-800"><BiSearchAlt /></div>
                        <input type="text" className=" outline-none rounded-full h-[30px] w-[140px] md:w-[250px] lg:w-[300px] text-xs pl-2" placeholder=" Search on BuyFresh" />
                    </div>

                </div>

                <div className="flex gap-5">
                    <div className="grid items-center">
                        <HiShoppingCart className="text-white text-3xl" />
                    </div>

                    <div className="grid items-center">
                        <div className="drawer-end">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                <label htmlFor="my-drawer" className="drawer-button">
                                    {/* <HiMenu className="text-white text-3xl" /> */}
                                    <img className="w-[45px] h-[45px] bg-base-200 rounded-full drawer-button" src="" alt="" />
                                </label>
                            </div>
                            <div className="drawer-side">
                                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                                <ul className="menu p-4 w-60 min-h-full bg-base-200 text-xl">
                                    <li className="hover:bg-green-200"><a>Profile</a></li>
                                    <li className="hover:bg-green-200"><a>MyOrder</a></li>
                                    <li className="hover:bg-green-200"><a>Sign Out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </div>
    )
}

export default Navbar
import { HiShoppingCart } from "react-icons/hi";
import { HiMenu } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";

const NavbarAdmin = () => {
    return (
        <div className="relative">
            < div className="bg-gradient-to-r from-emerald-100 to-green-700 flex justify-between px-3 md:px-20 lg:px-32 fixed top-0 w-screen">

                <div>
                    <img src="./buyfresh_logo.png" alt="app_logo" className="h-[70px]" />
                </div>


                <div className="flex gap-5">

                    <div className="grid items-center">
                        <div className="drawer-end">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                <label htmlFor="my-drawer" className="drawer-button">
                                    <HiMenu className="text-white text-3xl" />
                                </label>
                            </div>
                            <div className="drawer-side">
                                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                                <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
                                    <li className="hover:bg-green-200"><a>Profile</a></li>
                                    <li className="hover:bg-green-200"><a>Manage Order</a></li>
                                    <li className="hover:bg-green-200"><a>Manage Product</a></li>
                                    <li className="hover:bg-green-200"><a>Manage Stock</a></li>
                                    <li className="hover:bg-green-200"><a>Manage Discount</a></li>
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

export default NavbarAdmin
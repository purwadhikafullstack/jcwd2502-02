import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import Jumbotron from "../../components/jumbotron"
import RecommendProducts from "../../components/recommendProducts"
import CategoryCard from "../../components/categoryCard"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { api1 } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import { getMainAddress, nearestBranch } from "../../redux/Features/branch"
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidDownArrow } from "react-icons/bi";
import WAChat from "../../components/waChat"
import { useAppSelector } from '../../redux/App/Store';

const LandingPage = () => {
    const [branchLoc, setBranchLoc] = useState("")
    const [products, setProducts] = useState("")
    const [branchName, setBranchName] = useState()
    const [category, setCategory] = useState([]);
    const dispatch = useDispatch();
    const api = api1();
    const closestBranch = useSelector((state) => state.branch.closestBranch);
    const mainAddress = useSelector((state) => state.branch.mainAddress)
    const userSelector = useAppSelector((state) => state.users)
    const onGetCategory = async () => {
        try {
            const category = await api.get(`/category/all`);
            setCategory(category.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getBranch = async () => {
        try {
            const allBranch = await api.get('/branch/all')
            setBranchLoc(allBranch.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const nearestBranch = async () => {
        try {
            if (closestBranch.id === undefined) {
                const branch = await api.get(`/branch/recommend?branchId=`)
                setProducts(branch.data.products)
            } else {
                const branch = await api.get(`/branch/recommend?branchId=${closestBranch.id}`)
                setProducts(branch.data.products)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        onGetCategory();
        getBranch()
        nearestBranch()
    }, [closestBranch]);
    useEffect(() => {
        dispatch(getMainAddress());
    }, []);

    return (
        <div className="">
            <WAChat />
            <Toaster />
            <Navbar />
            <div className="mt-[70px]">
                <div className="flex justify-center mx-5 md:justify-end md:mr-20 lg:mr-48 py-5">
                    {userSelector.role === "customer" ?
                        <Link to={'/manage-address'}>
                            <div className="flex p-1 px-3 w-[350px] rounded-full md:w-auto md:mx-0 border-t-2 border-r-8 border-l-2 border-b-2 border-green-700 hover:underline justify-center gap-3 text-green-700 bg-yellow-300">
                                <div className="grid place-content-center ">
                                    <FaLocationDot />
                                </div>
                                {
                                    !mainAddress?.name ?
                                        <div className="font-bold truncate">Add New Address</div>
                                        :
                                        <div className="font-bold truncate">Delivered to {mainAddress?.name}</div>
                                }
                                <div className="grid place-content-center "><BiSolidDownArrow /></div>
                            </div>
                        </Link>
                        :
                        null
                    }
                </div>
                <Jumbotron />
                <div className="">
                    <div className="h-[160px] mt-10 lg:pt-5 pt-3 px-5 lg:h-[190px] lg:py-5 overflow-x-auto  m-5 md:mx-24 lg:mx-48 lg:gap-5 flex shadow-xl rounded-3xl border-l-8 border-r-8 border-r-green-600  border-yellow-300 hide-scrollbar">
                        {category.map((value, index) => {
                            return (
                                <div key={index} className="">
                                    <Link to={`/products?category=${value.id}`}>
                                        <CategoryCard name={value.name} image={value.image} />
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="mt-12 h-[5px] bg-gradient-to-r from-yellow-300 to-green-600 m-5 md:mx-24 lg:mx-48 rounded-full"></div>
                <div className="pb-10 mt-5 md:mt-10">
                    <RecommendProducts user={userSelector.role} data={products} branchName={closestBranch.name ? closestBranch.name : ""} />
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default LandingPage
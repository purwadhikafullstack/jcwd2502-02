import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import Jumbotron from "../../components/jumbotron"
import RecommendProducts from "../../components/recommendProducts"
import ModalAddress from "../../components/modalAddress"
import CategoryCard from "../../components/categoryCard"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { onCheckIsLogin } from "../../redux/Features/users";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { api1 } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
const LandingPage = () => {
    const [branchLoc, setBranchLoc] = useState("")
    const [products, setProducts] = useState("")
    const [branchName, setBranchName] = useState()
    const [currentLocation, setCurrentLocation] = useState(null);
    const [nearestLocation, setNearestLocation] = useState(null);
    const [category, setCategory] = useState([]);
    const dispatch = useDispatch();
    const api = api1();
    const onGetCategory = async () => {
        try {
            const category = await api.get(`/products/category`);
            // console.log(category.data.data);
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
    const calculation = () => {
        let nearest = null;
        navigator.geolocation.getCurrentPosition((position) => {
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;
            setCurrentLocation({ latitude: userLatitude, longitude: userLongitude });
            // Rumus untuk mencari nearest location
            let minDistance = Infinity;
            branchLoc.forEach((location, idx) => {
                const lat1 = userLatitude;
                const lon1 = userLongitude;
                const lat2 = location.latitude;
                const lon2 = location.longitude;
                const R = 6371; // Earth's radius in km
                const dLat = (lat2 - lat1) * (Math.PI / 180);
                const dLon = (lon2 - lon1) * (Math.PI / 180);
                const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distance = R * c;
                // console.log(distance, minDistance, idx);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = location;
                }
            });
            console.log(nearest.name);
            setBranchName(nearest.name)
            nearestBranch(nearest.id)
        });
    }
    const nearestBranch = async (storeId) => {
        try {
            const branch = await api.get(`/branch/nearest/${storeId}`)
            console.log(branch.data.data, "ini data branch");
            setProducts(branch.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        onGetCategory();
        getBranch()
        // Check if user is logged in
        // console.log('checking if logged in');
        // dispatch(onCheckIsLogin())
    }, []);
    useEffect(() => {
        if (branchLoc.length) calculation()
        console.log(branchLoc);
    }, [branchLoc])

    // useEffect(() => {
    //     console.log("current", currentLocation);
    //     console.log("nearest", nearestLocation);
    // }, [nearestLocation])
    return (
        <div className="">
            <Toaster />
            <Navbar />
            <div className="mt-[70px]">
                <div className="flex justify-center px-3 md:justify-end md:mr-20 lg:mr-48 py-5">
                    <ModalAddress />
                </div>
                <Jumbotron />
                <div className="h-[190px] mt-10 pt-5 px-5 lg:h-[190px] lg:py-5 overflow-x-auto m-5 md:mx-24 lg:mx-48 gap-5 flex bg-gradient-to-b from-yellow-200 to-green-200 rounded-3xl">
                    {category.map((value, index) => {
                        return (
                            <div key={index}>
                                <Link to={`/products?category=${value.id}`}>
                                    <CategoryCard name={value.name} image={value.image} />
                                </Link>
                            </div>

                        )
                    })}
                </div>
                <div className="mb-10">
                    <RecommendProducts data={products} branchName={branchName} />
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default LandingPage
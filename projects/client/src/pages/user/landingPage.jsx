import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import Jumbotron from "../../components/jumbotron"
import RecommendProducts from "../../components/recommendProducts"
import ModalAddress from "../../components/modalAddress"
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidDownArrow } from "react-icons/bi";
import ProductCard from "../../components/productCard"
import CategoryCard from "../../components/categoryCard"

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";


const LandingPage = () => {
    const [branchLoc, setBranchLoc] = useState("")
    const [storeID, setStoreID] = useState(null)
    const [products, setProducts] = useState("")
    const [currentLocation, setCurrentLocation] = useState(null);
    const [nearestLocation, setNearestLocation] = useState(null);
    const [category, setCategory] = useState([]);

    const onGetCategory = async () => {
        try {
            const category = await axios.get(`http://localhost:8905/api/products/category`);
            console.log(category.data.data);
            setCategory(category.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getBranch = async () => {
        try {
            const allBranch = await axios.get('http://localhost:8905/api/branch/all')
            // console.log(allBranch.data.data);
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

                console.log(distance, minDistance, idx);

                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = location;
                }
                // setStoreID(branchLoc.indexOf(nearest) + 1)

                // setNearestLocation(nearest);
            });
            console.log(nearest);
            nearestBranch(nearest.id)
        });


    }

    const nearestBranch = async (storeId) => {
        try {

            const branch = await axios.get(`http://localhost:8905/api/branch/nearest/${storeId}`)
            console.log(branch.data.data, "ini data branch");
            setProducts(branch.data.data)
            // console.log(products[0].product.name);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        onGetCategory();
        getBranch()
        // console.log(branchLoc);
        // Get current location
        // nearestBranch()

    }, [products]);

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

            <Navbar />

            <div className="mt-[70px]">

                <div className="flex justify-center px-3 md:justify-end md:mr-20 lg:mr-48 py-5">
                    <ModalAddress />
                </div>


                <Jumbotron />

                <div className="h-[130px] lg:h-[180px] lg:py-5 overflow-x-auto m-5 md:mx-24 lg:mx-40 gap-5 flex w-auto lg:justify-center">
                    <CategoryCard name={"Show All"} image={"ALL"} />
                    {category.map((value, index) => {
                        return (
                            <CategoryCard name={value.name} image={value.image} />
                        )
                    })}
                </div>


                <div>
                    {/* <RecommendProducts data={products} /> */}
                    {/* {products.map((value, index) => {
                        return (
                            <div key={index}>
                                <ProductCard
                                    name={value.product.name}
                                    image={value.product.image}
                                    description={value.product.description}
                                    price={value.product.price}
                                />
                            </div>
                        )
                    })} */}
                </div>

            </div>

            <Footer />


        </div>
    )
}

export default LandingPage
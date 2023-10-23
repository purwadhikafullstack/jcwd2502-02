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


const LandingPage2 = () => {
    const [branchLoc, setBranchLoc] = useState("")
    const [products, setProducts] = useState("")
    const [currentLocation, setCurrentLocation] = useState(null);
    const [category, setCategory] = useState([]);
    const [nearestPointId, setNearestPointId] = useState(null);
    const [dataFromBackend, setDataFromBackend] = useState([]);

    const onGetCategory = async () => {
        try {
            const category = await axios.get(`http://localhost:8905/api/products/category`);
            console.log(category.data.data);
            setCategory(category.data.data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        onGetCategory()
        // getBranch()
        navigator.geolocation.getCurrentPosition((position) => {
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;
            setCurrentLocation({ longitude, latitude })
        })
        axios.get('http://localhost:8905/api/branch/all')
            .then((response) => {
                console.log(response.data.data);
                setDataFromBackend(response.data.data); // Assuming the response is an array of objects
            })
            .catch((error) => {
                console.error('Error fetching data from the backend:', error);
            });
    }, [])

    useEffect(() => {

        console.log(dataFromBackend);

        if (currentLocation && dataFromBackend.length > 0) {
            let minDistance = Infinity;
            let nearestId = null;

            dataFromBackend.forEach((point) => {
                const lat1 = currentLocation.latitude;
                const lon1 = currentLocation.longitude;
                const lat2 = point.latitude;
                const lon2 = point.longitude;

                const R = 6371; // Earth's radius in kilometers
                const dLat = (lat2 - lat1) * (Math.PI / 180);
                const dLon = (lon2 - lon1) * (Math.PI / 180);
                const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distance = R * c;

                if (distance < minDistance) {
                    minDistance = distance;
                    nearestId = point.id;
                }

            })

            setNearestPointId(nearestId);
            localStorage.setItem('nearestPointId', nearestId);
        }

        console.log(nearestPointId);

    }, [currentLocation, dataFromBackend])


    useEffect(() => {

        const initialNearestPointId = localStorage.getItem('nearestPointId');


        axios.get(`http://localhost:8905/api/branch/nearest/${initialNearestPointId}`)
            .then((response) => {
                console.log(response.data.data);
                setProducts(response.data.data); // Assuming the response is an array of objects
            })
            .catch((error) => {
                console.error('Error fetching data from the backend:', error);
            });


    }, [currentLocation, dataFromBackend, products])

    console.log(products);


    return (
        <div className="">

            <Navbar />

            <div className="mt-[70px]">

                {nearestPointId}
                <div className="flex justify-center px-3 md:justify-end md:mr-20 lg:mr-48 py-5">
                    <ModalAddress />
                </div>
                <Jumbotron />
                <div className="lg:py-5 py-5 overflow-x-auto m-5 md:mx-24 lg:mx-40 gap-5 flex w-auto">
                    {/* <CategoryCard name={"Show All"} image={"ALL"} /> */}
                    {category.map((value, index) => {
                        return (
                            <div key={index}> < CategoryCard name={value.name} image={value.image} /></div>
                        )
                    })}
                </div>

                <div className="flex gap-2 justify-center my-10">



                    <RecommendProducts data={products} />

                    {/* {products && products.map((value, index) => {
                        return (
                            <div>
                                <div>
                                    <div className={`hover:border-green-700 hover:border-2 ease-in duration-200 border w-[160px] md:w-[160px] lg:w-[240px] h-[280px] lg:h-[380px] rounded-xl`}>
                                        <div><img className="object-fill rounded-t-xl h-[160px] lg:h-[220px] w-full" src={`http://localhost:8905/${value.product.image.substring(7)}`} alt="" /></div>
                                        <div className="h-[110px] lg:h-[130px] flex flex-col justify-between p-2 pl-4">
                                            <div className="font-semibold "> {value.product.name}</div>
                                            <div className="text-green-700 font-bold">Rp {value.product.price.toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div >


                            </div>
                        )
                    })} */}

                </div>


            </div>

            <Footer />


        </div>
    )
}

export default LandingPage2
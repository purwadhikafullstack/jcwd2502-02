import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import Jumbotron from "../../components/jumbotron"
import RecommendProducts from "../../components/recommendProducts"
import ModalAddress from "../../components/modalAddress"
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidDownArrow } from "react-icons/bi";

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { onCheckIsLogin } from "../../redux/Features/users";
import { useDispatch, useSelector } from "react-redux";


const LandingPage = () => {

    const [currentLocation, setCurrentLocation] = useState(null);
    const [nearestLocation, setNearestLocation] = useState(null);
    const dispatch = useDispatch();

    // contoh koordinat
    const locations = [
        { name: 'Location A', latitude: 40.7128, longitude: -74.0060 },
        { name: 'Location B', latitude: 34.0522, longitude: -118.2437 },
        { name: 'Location C', latitude: 51.5074, longitude: -0.1278 },
    ];

    useEffect(() => {
        // Get current location
        navigator.geolocation.getCurrentPosition((position) => {
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;

            setCurrentLocation({ latitude: userLatitude, longitude: userLongitude });

            // Rumus untuk mencari nearest location
            let minDistance = Number.MAX_VALUE;
            let nearest = null;

            locations.forEach((location) => {
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

                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = location;
                }
            });
            setNearestLocation(nearest);
        });
        // Check if user is logged in
        console.log('checking if logged in');
        dispatch(onCheckIsLogin())
    }, []);

    console.log(currentLocation);
    console.log(nearestLocation);

    return (
        <div className="">

            <Navbar />

            <div className="mt-[70px]">

                {/* <div>
                    <p>Your current location: Latitude {currentLocation.latitude}, Longitude {currentLocation.longitude}</p>
                </div>
                <div>
                    <p>Your nearest location is {nearestLocation.name}: Latitude {nearestLocation.latitude}, Longitude {nearestLocation.longitude}</p>
                </div> */}

                <div className="flex justify-center px-3 md:justify-end md:mr-20 lg:mr-48 py-5">
                    <ModalAddress />
                </div>


                <Jumbotron />

                <div className="h-[130px] lg:h-[180px] lg:py-5 overflow-x-auto m-5 md:mx-24 lg:mx-40 gap-5 flex w-auto lg:justify-center">

                    <div className=" card flex flex-col justify-between w-[100px] flex-none hover:font-bold ease-in duration-200">
                        <div className="border hover:border-green-300 grid place-content-center h-[100px] rounded-full hover:shadow-lg hover:shadow-green-200 hover:scale-105 ease-in duration-200"><img src="https://jcwdol0905.purwadhikabootcamp.com/api/categories/sayuran_medium-1686110433857.png" alt="" /></div>
                        <div className="flex justify-center z-0">Category X</div>
                    </div>
                    <div className=" card flex flex-col justify-between w-[100px] flex-none hover:font-bold ease-in duration-200">
                        <div className="border hover:border-green-300 grid place-content-center h-[100px] rounded-full hover:shadow-lg hover:shadow-green-200 hover:scale-105 ease-in duration-200"><img src="https://jcwdol0905.purwadhikabootcamp.com/api/categories/sayuran_medium-1686110433857.png" alt="" /></div>
                        <div className="flex justify-center z-0">Category X</div>
                    </div>
                    <div className=" card flex flex-col justify-between w-[100px] flex-none hover:font-bold ease-in duration-200">
                        <div className="border hover:border-green-300 grid place-content-center h-[100px] rounded-full hover:shadow-lg hover:shadow-green-200 hover:scale-105 ease-in duration-200"><img src="https://jcwdol0905.purwadhikabootcamp.com/api/categories/sayuran_medium-1686110433857.png" alt="" /></div>
                        <div className="flex justify-center z-0">Category X</div>
                    </div>
                    <div className=" card flex flex-col justify-between w-[100px] flex-none hover:font-bold ease-in duration-200">
                        <div className="border hover:border-green-300 grid place-content-center h-[100px] rounded-full hover:shadow-lg hover:shadow-green-200 hover:scale-105 ease-in duration-200"><img src="https://jcwdol0905.purwadhikabootcamp.com/api/categories/sayuran_medium-1686110433857.png" alt="" /></div>
                        <div className="flex justify-center z-0">Category X</div>
                    </div>
                    <div className=" card flex flex-col justify-between w-[100px] flex-none hover:font-bold ease-in duration-200">
                        <div className="border hover:border-green-300 grid place-content-center h-[100px] rounded-full hover:shadow-lg hover:shadow-green-200 hover:scale-105 ease-in duration-200"><img src="https://jcwdol0905.purwadhikabootcamp.com/api/categories/sayuran_medium-1686110433857.png" alt="" /></div>
                        <div className="flex justify-center z-0">Category X</div>
                    </div>
                    <div className=" card flex flex-col justify-between w-[100px] flex-none hover:font-bold ease-in duration-200">
                        <div className="border hover:border-green-300 grid place-content-center h-[100px] rounded-full hover:shadow-lg hover:shadow-green-200 hover:scale-105 ease-in duration-200"><img src="https://jcwdol0905.purwadhikabootcamp.com/api/categories/sayuran_medium-1686110433857.png" alt="" /></div>
                        <div className="flex justify-center z-0">Category X</div>
                    </div>
                    <div className=" card flex flex-col justify-between w-[100px] flex-none hover:font-bold ease-in duration-200">
                        <div className="border hover:border-green-300 grid place-content-center h-[100px] rounded-full hover:shadow-lg hover:shadow-green-200 hover:scale-105 ease-in duration-200"><img src="https://jcwdol0905.purwadhikabootcamp.com/api/categories/sayuran_medium-1686110433857.png" alt="" /></div>
                        <div className="flex justify-center z-0">Category X</div>
                    </div>
                    <div className=" card flex flex-col justify-between w-[100px] flex-none hover:font-bold ease-in duration-200">
                        <div className="border hover:border-green-300 grid place-content-center h-[100px] rounded-full hover:shadow-lg hover:shadow-green-200 hover:scale-105 ease-in duration-200"><img src="https://jcwdol0905.purwadhikabootcamp.com/api/categories/sayuran_medium-1686110433857.png" alt="" /></div>
                        <div className="flex justify-center z-0">Category X</div>
                    </div>

                </div>

                <div>
                    <RecommendProducts />
                </div>

            </div>

            <Footer />


        </div>
    )
}

export default LandingPage
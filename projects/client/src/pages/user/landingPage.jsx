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
import { useState } from "react";


const LandingPage = () => {


    const [modal, setModal] = useState(false)

    return (
        <div className="">

            <Navbar />

            <div className="mt-[70px]">

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
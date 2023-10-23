import ProductCard from "./productCard"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/style.css"
import { FaLocationDot } from "react-icons/fa6";
import { useEffect } from "react";

const RecommendProducts = (props) => {


    const products = props.data

    console.log(products);


    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 4000,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    return (
        <div className="w-[auto] px-5 md:px-20 lg:px-48 py-5 ">

            <div>
                <div className="pb-5">
                    <div className="text-4xl font-bold my-5">Only Made For You!</div>

                    <div className="flex justify-between">
                        <div className="flex gap-2"> <FaLocationDot className="mt-1" /> Branch Tangerang Selatan</div>
                        <div className="text-green-600 hover:underline"> See More!</div>
                    </div>
                </div>

                <div className="">

                    <Slider {...settings}>
                        {products
                            ? products.map((value, index) => (
                                <div key={index} className="">
                                    <ProductCard
                                        name={value.product.name}
                                        image={value.product.image}
                                        description={value.product.description}
                                        price={value.product.price}
                                    />
                                </div>
                            ))
                            : <span className="loading loading-spinner loading-lg"></span>
                        }
                    </Slider>

                </div>


            </div>
        </div >
    )
}

export default RecommendProducts
import ProductCard from "./productCard"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/style.css"
import { FaLocationDot } from "react-icons/fa6";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "../redux/Features/cart";
import { Link } from "react-router-dom";

const RecommendProducts = (props) => {
    const dispatch = useDispatch()
    const products = props.data
    // console.log(products);
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
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
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
        <div className="w-[auto] px-5 md:px-20 lg:px-48 ">
            <div className="">
                <div className="pb-5">
                    <div className="text-4xl font-bold my-5 ">Products Nearby!</div>
                    <div className="flex justify-between">
                        <div className="flex gap-2 text-lg"> <FaLocationDot className="mt-1" /> {props.branchName}</div>
                        <Link to={`/products?category=`}>
                            <div className="text-green-600 hover:underline"> See More!</div>
                        </Link>

                    </div>
                </div>
                <div className="">
                    <div>
                        <Slider {...settings}>
                            {products
                                ? products.map((value, index) => (
                                    <div key={index} className="w-auto mx-1 md:mx-3">
                                        <ProductCard
                                            name={value.product.name}
                                            image={value.product.image}
                                            description={value.product.description}
                                            price={value.product.price}
                                            stock={value.stock}
                                            data={value.products_id}
                                        />
                                    </div>
                                ))
                                : null
                            }
                        </Slider>
                    </div>
                    <div className="grid place-content-center pt-5">
                        {!products && <span className="loading loading-spinner w-[100px] text-green-700"></span>}
                    </div>
                </div>
            </div>
        </div >
    )
}
export default RecommendProducts
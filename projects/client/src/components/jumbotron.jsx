import Slider from 'react-slick';
import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/style.css'
const Jumbotron = () => {
    const cards = ["./jumbotron2.jpg", "./jumbotron1.jpg", "./jumbotron3.jpg"]
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 4000,
    };
    return (
        <div className='w-full px-5 md:px-20 lg:px-48'>
            <div >
                <Slider {...settings}>
                    {cards.map((url, index) => (
                        <div key={index}>
                            <img className='rounded-3xl w-full h-[200px] md:h-[350px] lg:h-[500px]' src={url}></img>
                        </div>
                    ))}
                </Slider></div>
        </div>
    )
}
export default Jumbotron
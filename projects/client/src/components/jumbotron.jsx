import Slider from 'react-slick';
import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/style.css'
const Jumbotron = () => {
    const cards = ["https://jcwdol0905.purwadhikabootcamp.com/static/media/banner4.d41a4fe88c1ac43e55cf.jpg", "https://jcwdol0905.purwadhikabootcamp.com/static/media/banner3.1eb5955923005037ed13.jpg", "https://jcwdol0905.purwadhikabootcamp.com/static/media/banner2.c1651131755f5a5cf4f3.jpg"]
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
        <div className='w-[auto] px-5 md:px-20 lg:px-48'>
            <div >
                <Slider {...settings}>
                    {cards.map((url, index) => (
                        <div key={index}>
                            <img className='rounded-3xl h-[200px] md:h-[350px] lg:h-[500px]' src={url}></img>
                        </div>
                    ))}
                </Slider></div>
        </div>
    )
}
export default Jumbotron
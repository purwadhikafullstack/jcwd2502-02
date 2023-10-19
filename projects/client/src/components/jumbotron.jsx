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
            {/* <div className="grid place-items-center p-5 md:px-24 md:pt-10 lg:px-48">
                <div className="w-auto carousel rounded-box ">
                    <div className="carousel-item w-full ">
                        <img src="https://assets.grab.com/wp-content/uploads/sites/9/2023/03/15080812/KV-MTU-GRAB-x-BNI_1440x700px.jpg" className="w-auto" alt="Tailwind CSS Carousel component" />
                    </div>
                    <div className="carousel-item w-full">
                        <img src="https://lelogama.go-jek.com/post_featured_image/promo-tokopedia-agustus.jpg" className="w-auto" alt="Tailwind CSS Carousel component" />
                    </div>
                    <div className="carousel-item w-full">
                        <img src="https://radarjabar.disway.id/upload/340b55d46c4ccdc0148ec0cec58731c0.jpg" className="w-auto" alt="Tailwind CSS Carousel component" />
                    </div></div>
            </div> */}

            <div >
                <Slider {...settings}>
                    {cards.map((url) => (
                        <div>
                            <img className='rounded-3xl lg:h-[500px]' src={url}></img>
                        </div>
                    ))}
                </Slider></div>

        </div>
    )
}

export default Jumbotron
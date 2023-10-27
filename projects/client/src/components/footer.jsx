import { FaInstagram } from "react-icons/fa6";
import { BsFacebook } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
    return (
        <div>
            <div className="grid place-items-center gap-5 text-green-800 py-10 bg-gradient-to-b from-yellow-200 to-green-200">
                <div>Follow Us:</div>
                <div className="flex gap-10 text-3xl">
                    <div>
                        <a href="https://www.instagram.com/"><FaInstagram /></a>
                    </div>
                    <div>
                        <a href="https://www.facebook.com/"><BsFacebook /></a>
                    </div>
                    <div>
                        <a href="https://twitter.com/"><FaXTwitter /></a>
                    </div>
                </div>
                <div className="px-10 text-center">Copyright © 2023 BuyFresh. All rights reserved. Your fresh, online grocery shopping experience.</div>
            </div>
        </div >
    )
}

export default Footer
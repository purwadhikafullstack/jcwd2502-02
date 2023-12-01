import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { BsFillPatchCheckFill } from "react-icons/bs";

export default function VerificationPage() {
    const accessToken = useParams()
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();
    const apiInstance = api();
    const verifyAccount = async () => {
        const response = await apiInstance.patch(`/users/verify-user`, null, { headers: { authorization: `Bearer ${accessToken.id}` } })
        if (response.data.isError == false) {
            setIsVerified(true)
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            verifyAccount()
        }, 2000)
    }, [])
    return (
        <div className="h-screen bg-gradient-to-r from-yellow-300 to-green-600 grid place-content-center">
            <div className="px-5 md:px-20 lg:px-40">
                {
                    isVerified ?
                        <div className=" text-3xl shadow-xl rounded-2xl p-10 font-semibold bg-green-600 text-white border-4">
                            <div className="flex justify-center font-black text-center"> Congratulations! Your account has now been verified
                                <div className="pl-2 grid place-content-center"><BsFillPatchCheckFill /></div>
                            </div>
                            <div className="pt-5 text-3xl flex justify-center font-bold text-center">                             Please wait while we redirect you to the login page.
                            </div>
                            <div className="text-lg flex justify-center pt-10 text-center">
                                Please click here if the page does not automatically redirect you to the login page
                            </div>
                            <div className="grid place-content-center pt-5">
                                <span className="loading loading-dots loading-lg"></span>
                            </div>
                        </div>
                        :
                        <div className="shadow-xl rounded-2xl p-10 font-semibold bg-green-600 text-white border-4 ">
                            <div className="pb-5 text-3xl flex justify-center font-black text-center">Thank you for choosing BuyFresh! </div>
                            <div className="  text-3xl flex justify-center font-bold text-center">Please wait while we verify your account</div>
                            <div className="text-lg flex justify-center pt-10 text-center">
                                We appreciate your trust in BuyFresh and for choosing us to be a part of your digital journey. Our commitment to providing you with a secure and seamless experience is our top priority.
                            </div>
                            <div className="grid place-content-center pt-5">
                                <span className="loading loading-dots loading-lg"></span>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
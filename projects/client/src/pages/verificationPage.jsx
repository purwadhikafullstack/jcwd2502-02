import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api1 } from "../api/api";

export default function VerificationPage() {
    const accessToken = useParams()
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();
    const apiInstance = api1();
    const verifyAccount = async () => {
        const response = await apiInstance.patch(`/users/verify-user`, null, {headers: {authorization: accessToken.id}})
        if(response.data.isError == false) {
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

    return(
        <div className="h-screen md:h-screen bg-gradient-to-b from-green-700 to-emerald-300">
            <div className="grid grid-cols-5">
                {
                    isVerified ?                 
                    <div className="border shadow-xl rounded-2xl col-start-2 col-span-3 mt-28 p-3 font-semibold text-center">
                        Congratulations! Your account has now been verified, please wait while we redirect you to the login page.
                    </div>
                    :
                    <div className="border shadow-xl rounded-2xl col-start-2 col-span-3 mt-28 p-3 font-semibold text-center">
                        Please wait while we verify your account.
                    </div> 
                }
            </div>
            <div className="grid grid-cols-7">
                {
                    isVerified ? 
                    <div className="border shadow-xl rounded-2xl col-start-3 col-span-3 mt-28 p-3 font-semibold text-center">
                        Please click here if the page does not automatically redirect you to the login page
                    </div>
                    :
                    <div className="border shadow-xl rounded-2xl col-start-3 col-span-3 mt-28 p-3 font-semibold text-center">
                        BuyFresh is proud to provide the best online commercial experience towards our buyers!
                    </div>
                }
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { onCheckIsLogin } from "../redux/Features/users";
import { useDispatch, useSelector } from "react-redux";

export default function Protected({ children, adminPage, userPage, guestPage, superadminPage }) {

    const [loading, setLoading] = useState(true);
    // const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users)
    // => user.role

    useEffect(() => {
        console.log(user.role);
        if (user.role !== "" && guestPage) return setTimeout(() => {
            setLoading(false)
        }, 1500), navigate('/')

        if (user && user.role == "customer" && (adminPage || superadminPage)) return setTimeout(() => {
            setLoading(false)
        }, 1500), navigate('/')

        if (user && user.role == "admin" && (userPage || superadminPage)) return setTimeout(() => {
            setLoading(false)
        }, 1500), navigate('/admin-dashboard')

        if (user && user.role == "superadmin" && (userPage)) return setTimeout(() => {
            setLoading(false)
        }, 1500), navigate('/admin-dashboard')

        setTimeout(() => {
            setLoading(false)
        }, 2000)

    }, [children, user]);

    // useEffect(() => {
    //     console.log(`protected routes finding user`);
    //     console.log(user);
    // }, [user])

    return (
        <>
            {
                loading ?
                    <div className="h-screen bg-gradient-to-r from-yellow-300 to-green-700 grid place-content-center">

                        <div className="">
                            <div className="grid place-content-center">
                                <img src={"./buyfresh_logo.png" && "https://cdn.discordapp.com/attachments/1159339445049368588/1174957031107608636/buyfresh_logo.png?ex=65697b01&is=65570601&hm=ff2240905e431008b2dccd668e94ce44a2e248efb11493b26c265c7dba380f28&"} alt="app_logo" className="h-[250px] w-[250px] md:h-[350px] md:w-[350px]" />
                            </div>
                            <div className="grid place-content-center">
                                <span className="loading loading-dots w-[50px] text-green-800"></span>
                            </div>
                        </div>

                    </div>
                    :
                    children
            }
        </>
    )
}
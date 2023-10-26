import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { onCheckIsLogin } from "../redux/Features/users";
import { useDispatch, useSelector } from "react-redux";

export default function Protected({children, adminPage, userPage, guestPage}){

    const [loading, setLoading] = useState(true);
    // const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users) 
    // => user.role

    useEffect(() => {
        // setUserRole(user.role)
        console.log(user.role, guestPage, `>>>>>`);
        if(user.role && guestPage) return setTimeout(() => {
            setLoading(false)
        }, 1500), navigate('/')

        if(user && user.role == "customer" && adminPage) return setTimeout(() => {
            setLoading(false)
            console.log(`protected.jsx: user access denied`);
        }, 1500), navigate('/')

        if(user && user.role !== "customer" && userPage) return setTimeout(() => {
            setLoading(false)
            console.log(`protected.jsx: user access denied`);
        }, 1500), navigate('/') 

        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [children, user]);

    // useEffect(() => {
    //     console.log(`protected routes finding user`);
    //     console.log(user);
    // }, [user])

    return(
        <>
            {
                loading ? 
                    'Page is currently Loading' 
                    :
                    children
            }
        </>
    )
}

// FORBIDDEN => PAGE 404 => /HOME /ADMIN
//  TAMBAHKAN GUEST PAGE jika ada role maka akan block akses ke guest page
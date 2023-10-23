import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../api/api";

const ProfilePage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const apiInstance = api()
    const [data, setData] = useState('')

    const getUserData = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            console.log("ini token", accessToken);

            const data = await apiInstance.get("/users/finduser")
            console.log(data.data.data);
            setData(data.data.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getUserData()
    }, [])


    return (
        <div>

            <Navbar />

            <div className="mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32 ">

                <div className="flex text-4xl font-bold gap-2 py-5">My Profile <div className="grid place-content-center">
                    <Link to={'/updateprofile'}> <AiFillEdit /></Link>
                </div></div>

                <div className="grid md:grid-cols-3 md:mb-20 ">

                    <div className="bg-green-700 md:rounded-l-3xl md:shadow-xl">
                        <div className="grid place-content-center py-10 ">
                            <img className="w-[200px] h-[200px] md:w-[180px] lg:w-[220px] lg:h-[220px] md:h-[180px] bg-base-200 rounded-full drawer-button" src="" alt="" />
                        </div>

                        <div className=" mb-5 p-3 md:p-5 text-white md:flex md:flex-col md:justify-center">
                            <div>
                                <div className="font-bold">Main Shipping Address</div>
                                <div>Rumah Bayu Krisna</div>
                                <div>Melia Grove Graha Raya Blok GMB/22</div>
                                <div>Tangerang Selatan</div>
                                <div>Banten</div>
                            </div>

                            <div className="my-3">
                                <div className="font-bold">Phone Number</div>
                                <div>082112436747</div>
                            </div>

                            <div className="my-3">
                                <div className="font-bold">Referral Code</div>
                                <div>082112436747</div>
                            </div>

                            <div className=" mt-5 md:mt-10 grid gap-2">
                                <div className="hover:underline ease-in duration-200">Manage Address</div>
                                <div className="hover:underline ease-in duration-200">Change Password</div>
                            </div>
                        </div>
                    </div>

                    <div className="my-5 md:my-0 md:p-10  mb-10 flex flex-col gap-3 border p-3 py-5 rounded-xl  md:rounded-none md:rounded-r-3xl md:col-span-2 shadow-xl">
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">Username</div>
                            <div className="rounded-2xl border border-green-800 p-3">{data.username}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">Email</div>
                            <div className="rounded-2xl border border-green-800 p-3">{data.email}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">Gender</div>
                            <div className="rounded-2xl border border-green-800 p-3">{data.gender == null ? "Data is not Yet Set" : data.gender}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">Birthday</div>
                            <div className="rounded-2xl border border-green-800 p-3">{data.birthdate == null ? "Data is not Yet Set" : data.birthdate}</div>
                        </div>
                    </div>

                </div>

            </div>

            <Footer />

        </div>
    )
}

export default ProfilePage
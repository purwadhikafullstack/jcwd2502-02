import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { api } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { onCheckIsLogin, setProfile_Picture } from "../../redux/Features/users";
import toast, { Toaster } from "react-hot-toast";
import { getMainAddress } from "../../redux/Features/branch";
const ProfilePage = () => {
    const apiInstance = api()
    const [data, setData] = useState('')
    const mainAddress = useSelector((state) => state.branch.mainAddress)
    const inputFileRef = useRef(null);

    const user = useSelector(state => (state.users))

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(onCheckIsLogin())
    }, [])

    const getUserData = async () => {
        try {
            // const accessToken = localStorage.getItem("accessToken");
            // console.log("ini token", accessToken);
            const data = await apiInstance.get("/users/fetch-user")
            // console.log(data.data.data);
            setData(data.data.data)
        } catch (error) {
        }
    }

    const onSelectImages = async (event) => {
        try {
            const file = event.target.files[0]

            if (file) {
                // Check file size and type here (validation)
                if (file.size > 1000000 || !/image\/(png|jpg|jpeg)/.test(file.type)) throw {
                    message: 'File must be less than 1MB and in png, jpg, or jpeg format!'
                }
                console.log(file);

                const formData = new FormData();
                formData.append('image', file);

                const response = await apiInstance.patch(`users/update-image`, formData)
                console.log(response.data.data);
                dispatch(setProfile_Picture(response.data.data.profile_picture))
                toast.success("Profile Picture Updated")
            }


        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        getUserData()
    }, [])

    useEffect(() => {
        getUserData();
        console.log(user);
    }, [user])

    useEffect(() => {
        dispatch(getMainAddress());
    }, []);

    return (
        <div>
            <Toaster />
            <Navbar />
            <div className="mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32 ">
                <div className="flex text-5xl font-bold gap-2 py-5 pl-5 text-green-800">My Profile
                </div>
                <div className="grid md:grid-cols-3 md:mb-20 ">
                    <div className="bg-gradient-to-r from-green-700 from-90% via-green-500 via-5% to-yellow-300 to-5% md:rounded-l-3xl md:shadow-xl">
                        <div className="grid place-content-center py-10 ">
                            {/* <img className="w-[200px] h-[200px] md:w-[180px] lg:w-[220px] lg:h-[220px] md:h-[180px] bg-base-200 rounded-full drawer-button" src={process.env.REACT_APP_URL + `${data?.profile_picture
                                }`} alt="" /> */}

                            <div className="relative">
                                <img className="w-[200px] h-[200px] md:w-[180px] lg:w-[220px] lg:h-[220px] md:h-[180px] bg-base-200 rounded-full" src={process.env.REACT_APP_URL + `${data?.profile_picture
                                    }`} alt="" />
                                <input
                                    type="file" accept=".jpg, .jpeg, .png" name="file" hidden ref={inputFileRef} onChange={onSelectImages}
                                />
                                <div onClick={() => inputFileRef.current.click()}>
                                    <AiFillEdit className="text-3xl rounded-full p-2 w-[50px] h-[50px] absolute top-0 right-0 z-1 bg-white text-green-800 hover:scale-105 ease-in duration-200 " />
                                </div>
                            </div>

                        </div>
                        <div className=" mb-5 p-5 md:p-5 text-white md:flex md:flex-col md:justify-center">
                            <div className="w-[90%] flex flex-col gap-3 mb-3">
                                <div className="font-bold text-xl">Main Shipping Address</div>
                                <div>{mainAddress?.name}</div>
                                <div>{mainAddress?.address}</div>
                                <div>{mainAddress?.city?.name} - {mainAddress?.city?.province?.name}</div>
                            </div>
                            <div className="my-3">
                                <div className="font-bold text-xl">Phone Number</div>
                                <div>{data.phone_number}</div>
                            </div>
                            <div className="my-3">
                                <div className="font-bold text-xl">Referral Code</div>
                                <div>xxx</div>
                            </div>
                            <div className=" mt-5 md:mt-10 grid gap-2 text-lg">
                                <Link to={'/manage-address'}>
                                    <div className="hover:underline ease-in duration-200">Manage Address</div>
                                </Link>
                                <Link to={'/profile-password'}>
                                    <div className="hover:underline ease-in duration-200">Change Password</div>
                                </Link>
                                <Link to={'/updateprofile'}>
                                    <div className="hover:underline ease-in duration-200 flex gap-1">Update Profile <div className="grid place-content-center pt-1"> <AiFillEdit /></div></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="my-5 md:my-0 md:p-10  mb-10 flex flex-col gap-3 border p-3 py-5 rounded-xl  md:rounded-none md:rounded-r-3xl md:col-span-2 shadow-xl">
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800 text-2xl">Username</div>
                            <div className="h-[5px] bg-green-800"></div>
                            <div className="p-2 text-xl">{data.username}</div>
                            {/* <div className="h-[5px] bg-green-800"></div> */}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800 text-2xl">Email</div>
                            <div className="h-[5px] bg-green-800"></div>
                            <div className="p-2 text-xl">{data.email}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800 text-2xl">Gender</div>
                            <div className="h-[5px] bg-green-800"></div>
                            <div className="p-2 text-xl">{data.gender == null ? "Data is not Yet Set" : data.gender}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800 text-2xl">Birthday</div>
                            <div className="h-[5px] bg-green-800"></div>
                            <div className="p-2 text-xl">{data.birthdate == null ? "Data is not Yet Set" : data.birthdate}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default ProfilePage
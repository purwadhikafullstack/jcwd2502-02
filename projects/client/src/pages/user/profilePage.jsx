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
import { PiPercentFill } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import moment from 'moment';

const ProfilePage = () => {
    const apiInstance = api()
    const [disabled, setDisabled] = useState(false)
    const [data, setData] = useState('')
    const [coupon, setCoupon] = useState()
    const mainAddress = useSelector((state) => state.branch.mainAddress)
    const inputFileRef = useRef(null);
    const user = useSelector(state => (state.users))
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(onCheckIsLogin())
    }, [])

    const getUserData = async () => {
        try {
            const data = await apiInstance.get("/users/fetch-user")
            setData(data.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getUserCoupon = async () => {
        try {
            const data = await apiInstance.get(`transaction/coupon/user`)
            setCoupon(data.data.data)
        } catch (error) {
            console.log(error);
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
                const formData = new FormData();
                formData.append('image', file);
                const response = await apiInstance.patch(`users/update-image`, formData)
                dispatch(setProfile_Picture(response.data.data.profile_picture))
                toast.success("Profile Picture Updated")
            }
        } catch (error) {
            toast.error(error.message)
        }
    };
    const verifyAccount = async () => {
        try {
            setDisabled(true)
            const response = await api().post('/users/verify-user-profile');
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            setDisabled(false)
        }
        finally {
            setDisabled(false)
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        getUserData()
        getUserCoupon()
    }, [])
    useEffect(() => {
        getUserData();
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
                                <img className={data.profile_picture ? "w-[200px] h-[200px] md:w-[180px] lg:w-[220px] lg:h-[220px] md:h-[180px] bg-base-200 rounded-full" : " skeleton w-[200px] h-[200px] md:w-[180px] lg:w-[220px] lg:h-[220px] md:h-[180px] bg-base-200 rounded-full"} src={process.env.REACT_APP_URL + `${data?.profile_picture
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
                                {mainAddress ?
                                    <div>
                                        <div>{mainAddress?.name}</div>
                                        <div>{mainAddress?.address}</div>
                                        <div>{mainAddress?.city?.name} - {mainAddress?.city?.province?.name}</div>
                                    </div> :
                                    <Link to={`/manage-address`}>
                                        <div className="hover:text-yellow-300 hover:underline">Create Main Address!</div></Link>
                                }

                            </div>
                            <div className="my-3">
                                <div className="font-bold text-xl">Phone Number</div>
                                <div>{data.phone_number}</div>
                            </div>
                            <div className="my-3">
                                <div className="font-bold text-xl">Referral Code</div>
                                <div>{data.referral_code}</div>
                            </div>
                            <div className=" mt-5 md:mt-10 grid gap-2 text-lg">
                                <Link to={'/manage-address'}>
                                    <div className="hover:underline ease-in duration-200">Manage Address</div>
                                </Link>

                                <div onClick={() => document.getElementById('my_modal_1').showModal()} className="hover:underline ease-in duration-200">My Coupon</div>
                                <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box text-black">
                                        <div className="text-2xl font-black ">Coupon(s) You Owned!</div>

                                        <div className="grid gap-3 mt-2">
                                            {coupon ? coupon.map((value, index) => {
                                                return (
                                                    <div>
                                                        <div className="flex border-l-8 border p-3 border-green-700 rounded-xl">
                                                            <div className="grid place-content-center"><PiPercentFill /></div>
                                                            <div className="lg:flex lg:justify-between w-full ml-2">
                                                                <div className="">{value.coupon_name}</div>
                                                                <div>EXP {moment(value.createdAt).format('DD/MMM/YYYY')}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                                : null}
                                        </div>


                                        {coupon?.length === 0 ? <div>Oops, Looks like you dont have any coupon at the momment. You can get coupon by shopping at BuyFresh!</div> : null}
                                        <div></div>

                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn">Close</button>
                                            </form>
                                            <Link to={'/products?category='}>
                                                <button className="btn">SHOP NOW</button>
                                            </Link>
                                        </div>
                                    </div>
                                </dialog>

                                <Link to={'/profile-password'}>
                                    <div className="hover:underline ease-in duration-200">Change Password</div>
                                </Link>




                            </div>
                        </div>
                    </div>
                    <div className="my-5 md:my-0 md:p-10  mb-10 flex flex-col gap-3 border p-3 py-5 rounded-xl  md:rounded-none md:rounded-r-3xl md:col-span-2 shadow-xl">

                        {disabled ?

                            <div className=" ease-in duration-200 flex justify-center btn hover:bg-yellow-300 hover:border-green-800 bg-yellow-300 border-4 border-green-800 cursor-not-allowed" > Sending Verification Email... </div>
                            :
                            <>{
                                user.isVerified == "verified" ?
                                    <Link to={'/updateprofile'}>
                                        <div className="flex place-content-end gap-3 text-green-800 text-lg">
                                            <div className="grid place-content-center"><MdEdit></MdEdit></div>
                                            <div className="hover:underline ease-in duration-200 grid place-content-end">Update Profile  </div>
                                        </div>
                                    </Link>
                                    :
                                    <div className=" ease-in duration-200 flex justify-center btn hover:bg-yellow-400 hover:border-green-800 bg-yellow-300 border-4 border-green-800" onClick={() => verifyAccount()}> Verify Account </div>
                            }
                            </>}

                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800 text-2xl">Username</div>
                            <div className="h-[5px] bg-green-800"></div>
                            <div className="p-2 text-xl">{data.username ? data.username : <span className="loading loading-dots loading-sm"></span>
                            }</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800 text-2xl">Email</div>
                            <div className="h-[5px] bg-green-800"></div>
                            <div className="p-2 text-xl">{data.email ? data.email : <span className="loading loading-dots loading-sm"></span>}</div>
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
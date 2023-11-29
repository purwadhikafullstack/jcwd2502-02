import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import Button from "../../components/button"
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from "react-hot-toast";
import debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";


const UpdateProfile = () => {
    const navigate = useNavigate()
    const apiInstance = api()
    const [disabled, setDisabled] = useState(false)
    const [data, setData] = useState('')
    const [preview, setPreview] = useState();
    const inputFileRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(null)
    let today = new Date().toISOString().split('T')[0];
    const getUserData = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            // console.log("ini token", accessToken);
            const data = await apiInstance.get("/users/fetch-user")
            setData(data.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        initialValues: {
            file: null,
            id: "",
            username: "",
            email: "",
            gender: "",
            birthdate: "",
        },
        onSubmit: async (values) => {
            try {
                setDisabled(true)
                if (!values.username || !values.email || !values.gender || !values.birthdate) {
                    toast.error("Please input all data.");
                    setDisabled(false)
                    return;
                }
                const updateUserData = await apiInstance.patch('/users/update-user', formik.values)
                toast.success(updateUserData.data.message);
                setTimeout(() => {
                    navigate('/profile')
                }, 1500);
            } catch (error) {
                console.log(error);
                setDisabled(false)
            }
        },
        validationSchema: yup.object().shape({
            username: yup.string().required().min(3).max(10),
            email: yup.string().required().email(),
            gender: yup.string().required(),
            birthdate: yup.string().required(),
        })
    });
    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    }
    const debouncedHandleSubmit = debounce(() => {
        formik.handleSubmit();
        setTimeout(() => {
            navigate('/profile')
        }, 1500);
    }, 1000);

    useEffect(() => {
        getUserData();
        setCurrentImage(process.env.REACT_APP_URL + `${data?.profile_picture}`);
        data.id
            ? formik.setValues({
                id: data.id,
                username: data.username,
                email: data.email,
                gender: data.gender,
                birthdate: data.birthdate,
            })
            : formik.setValues({
                id: '',
                username: '',
                email: '',
                gender: '',
                birthdate: '',
            });
    }, [data.id])

    return (
        <div>
            <Toaster />

            <div className="grid place-content-center h-screen bg-gradient-to-b from-green-700 to-yellow-300">
                <div className="px-5 md:px-8 lg:px-10 flex-col gap-3 p-3 py-5 mb-10 rounded-xl shadow-lg bg-green-700 w-[300px] lg:w-[350px]">
                    {/* <div className="mt-10"></div> */}
                    <div className="text-center text-yellow-300 text-3xl font-black pb-5">Update Profile </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-bold text-sm">Username</div>
                        <input type="text" onChange={formik.handleChange} name="username" className="rounded-2xl border border-green-800 p-3 " defaultValue={formik.values.username} />
                        <div className=" text-orange-400 font-medium pl-3">{formik.errors.username}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-bold text-sm">Email</div>
                        <input type="text" onChange={formik.handleChange} name="email" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.email} />
                        <div className="text-orange-400 font-medium pl-3">{formik.errors.email}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-bold text-sm">Gender</div>
                        <select onChange={formik.handleChange} name="gender" defaultValue={formik.values.gender} className="rounded-2xl border border-green-800 p-3">
                            <option value="" disabled>
                                Select Gender
                            </option>
                            <option value="male" selected={formik.values.gender === "male"}>
                                Male
                            </option>
                            <option value="female" selected={formik.values.gender === "female"}>
                                Female
                            </option>
                        </select>
                        <div className="text-orange-400 font-medium pl-3">{formik.errors.gender}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-bold text-sm">Birthdate</div>
                        <input type="date" name="birthdate" onChange={formik.handleChange} className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.birthdate} max={today} />
                        <div className="text-orange-400 font-medium pl-3">{formik.errors.birthdate}</div>

                    </div>
                    <div className="grid place-content-center mt-5">

                        {disabled ? <button className={"btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900 cursor-not-allowed"}>APPLYING CHANGES</button>
                            :

                            <button disabled={disabled} onClick={() => formik.handleSubmit()} type="submit" className={`${disabled ? "btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900 " : "btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900"} `}>{disabled ? "APPLYING CHANGES" : "SUBMIT CHANGES"}</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdateProfile
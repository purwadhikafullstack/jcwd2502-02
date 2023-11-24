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

                const updateUserData = await apiInstance.patch('/users/update-user', formik.values)
                toast.success(updateUserData.data.message);
            } catch (error) {
                console.log(error);
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
            {/* <Navbar /> */}
            <div className="grid place-content-center h-screen bg-gradient-to-b from-green-700 to-yellow-300">




                <div className="px-5 md:px-8 lg:px-10 flex-col gap-3 p-3 py-5 mb-10 rounded-xl shadow-lg bg-green-700">
                    {/* <div className="mt-10"></div> */}
                    <div className="text-center text-yellow-300 text-3xl font-black pb-5">Update Profile </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-bold text-sm">Username</div>
                        <input type="text" onChange={formik.handleChange} name="username" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.username} />
                        <div className=" pl-3 text-red-600">{formik.errors.username}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-bold text-sm">Email</div>
                        <input type="text" onChange={formik.handleChange} name="email" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.email} />
                        <div className="pl-3 text-red-600">{formik.errors.email}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-bold text-sm">Gender</div>
                        <select onChange={formik.handleChange} name="gender" defaultValue={formik.values.gender} className="rounded-2xl border border-green-800 p-3">
                            {formik.values.gender != "male" ? (<option value="male">Male</option>
                            ) : (<option value="male" selected>Male</option>
                            )}
                            {formik.values.gender == "female" ? (
                                <option value="female" selected>Female</option>
                            ) : (<option value="female">Female</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-bold text-sm">Birthdate</div>
                        <input type="date" name="birthdate" onChange={formik.handleChange} className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.birthdate} max={today} />
                    </div>
                    <div className="grid place-content-center mt-5">
                        <Button onClick={() => debouncedHandleSubmit()} text={"Submit Changes"} />
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
export default UpdateProfile
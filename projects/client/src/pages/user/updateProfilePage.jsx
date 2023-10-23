import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import Button from "../../components/button"
import axios from "axios";
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from "react-hot-toast";
import debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const UpdateProfile = () => {
    const navigate = useNavigate()
    const apiInstance = api()
    const [data, setData] = useState('')




    let today = new Date().toISOString().split('T')[0];

    const formik = useFormik({
        initialValues: {
            id: "",
            username: "",
            email: "",
            gender: "",
            birthdate: "",
        },
        onSubmit: async () => {
            try {
                const updateUserData = await axios.patch('http://localhost:8905/api/users/update-user', formik.values)
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

    const debouncedHandleChange = debounce((name, value) => {
        formik.setFieldValue(name, value);
    }, 1500);

    const debouncedHandleSubmit = debounce(() => {
        formik.handleSubmit();
        setTimeout(() => {
            navigate('/profile')
        }, 1500);
    }, 1000);

    const getUserData = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            console.log("ini token", accessToken);

            const data = await apiInstance.get("/users/finduser")
            setData(data.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserData()

        data.id
            ? formik.setValues({
                id: data.id,
                username: data.username,
                email: data.email,
                gender: data.gender, // Set default values or fetch from data
                birthdate: data.birthdate, // Set default values or fetch from data
            })
            : formik.setValues({
                id: 'Loading',
                username: 'Loading',
                email: 'Loading',
                gender: 'Loading', // Set default values or fetch from data
                birthdate: 'Loading', // Set default values or fetch from data
            });
    }, [data.id])

    console.log(data);
    console.log(data.username);
    console.log('form values', formik.values);

    return (
        <div>
            <Toaster />
            <Navbar />
            <div className="mt-[70px]">
                <div className="grid place-content-center py-10 ">
                    <img className="w-[200px] h-[200px] md:w-[180px] lg:w-[220px] lg:h-[220px] md:h-[180px] bg-base-200 rounded-full drawer-button" src="" alt="" />
                </div>
                <div className="my-10 mx-5 md:p-10 md:mx-36 lg:mx-64 flex flex-col gap-3 border p-3 py-5 rounded-xl shadow-lg">
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Username</div>
                        <input type="text" onChange={(e) => debouncedHandleChange('username', e.target.value)} name="username" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.username} />
                        <div className=" pl-3 text-red-600">{formik.errors.username}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Email</div>
                        <input type="text" onChange={(e) => debouncedHandleChange('email', e.target.value)} name="email" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.email} />
                        <div className="pl-3 text-red-600">{formik.errors.email}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Gender</div>
                        <select onChange={(e) => debouncedHandleChange('gender', e.target.value)} name="gender" defaultValue={formik.values.gender} className="rounded-2xl border border-green-800 p-3">
                            {formik.values.gender != "male" ? (
                                <option value="male">Male</option>
                            ) : (<option value="male" selected>Male</option>
                            )}
                            {formik.values.gender == "female" ? (
                                <option value="female" selected>Female</option>
                            ) : (<option value="female">Female</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Birthdate</div>
                        <input type="date" name="birthdate" onChange={(e) => debouncedHandleChange('birthdate', e.target.value)} className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.birthdate} max={today} />
                    </div>
                </div>
                <div className="grid place-content-center mb-10">
                    <Button onClick={() => debouncedHandleSubmit()} text={"Submit Changes"} />
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default UpdateProfile
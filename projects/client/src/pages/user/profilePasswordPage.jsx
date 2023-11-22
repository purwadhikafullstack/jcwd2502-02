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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";

const UpdatePasswordPage = () => {
    const navigate = useNavigate()
    const apiInstance = api()

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        onSubmit: async (values) => {
            try {
                const updatePassword = await api().patch('/users/update-password', null, { headers: { "oldpassword": formik.values.oldPassword, "newpassword": formik.values.newPassword, "confirmpassword": formik.values.confirmPassword } })
                toast.success('Password has been updated')
            } catch (error) {
                toast.error(error.response.data.message);
            }

        },
        validationSchema: yup.object().shape({
            oldPassword: yup.string().required().min(6, 'Must be 6 characters atleast'),
            newPassword: yup.string().required().min(6, 'Must be 6 characters atleast'),
            confirmPassword: yup.string().required().min(6, 'Must be 6 characters atleast').oneOf([yup.ref('newPassword')], `Password must match`)
        })
    });
    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    }
    const debouncedHandleSubmit = debounce(() => {
        // formik.handleSubmit();
        // setTimeout(() => {
        //     navigate('/profile')
        // }, 1500);
    }, 1000);

    return (
        <div>
            <Toaster />
            <div className="grid place-content-center h-screen bg-gradient-to-b from-green-700 to-yellow-300">
                <div className="">
                    <form onSubmit={(formik.handleSubmit)}>
                        <div className="px-5 md:px-8 lg:px-10 flex-col gap-3 p-3 py-5 mb-10 rounded-xl shadow-lg bg-green-700">

                            <div className="text-center text-yellow-300 text-3xl font-black pb-5">Update Password
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="text-white font-bold text-sm">Old Password</div>
                                <input type="password" onChange={formik.handleChange} name="oldPassword" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.oldPassword} />
                                <div className=" pl-3 text-red-600">{formik.errors.oldPassword}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-white font-bold text-sm">New Password</div>
                                <input type="password" onChange={formik.handleChange} name="newPassword" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.newPassword} />
                                <div className="pl-3 text-red-600">{formik.errors.newPassword}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-white font-bold text-sm">Confirm Password</div>
                                <input type="password" onChange={formik.handleChange} name="confirmPassword" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.confirmPassword} />
                                <div className="pl-3 text-red-600">{formik.errors.confirmPassword}</div>
                            </div>

                            <div className="grid place-content-center mt-5">
                                <Button type="submit" text={"Submit Changes"} />
                            </div>

                        </div>

                    </form>
                </div>
            </div>
        </div >
    )
}
export default UpdatePasswordPage
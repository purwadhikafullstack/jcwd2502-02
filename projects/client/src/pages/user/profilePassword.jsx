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
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";

const UpdatePass2 = () => {


    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        onSubmit: async (values) => {
            try {
            } catch (error) {
                console.log(error);
            }

        },
        validationSchema: yup.object().shape({
            oldPassword: yup.string().required(),
            newPassword: yup.string().required(),
            confirmPassword: yup.string().required().oneOf([yup.ref('newPassword')], `Password must match`)
        })
    });
    return (
        <div className="mt-[70px]">
            <div className="mx-5 mt-5 md:mx-36 lg:mx-64 flex text-4xl font-bold gap-2 py-5 pl-5 text-green-800">
                <div className="grid place-content-center"><AiFillEdit /></div>
                Update Password
            </div>
            <form onSubmit={(e) => { e.preventDefault() }}>
                <div className=" mx-5 md:p-10 md:mx-36 lg:mx-64 flex flex-col gap-3 border p-3 py-5 rounded-xl shadow-lg">
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Old Password</div>
                        <input type="password" onChange={formik.handleChange} name="oldPassword" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.oldPassword} />
                        <div className=" pl-3 text-red-600">{formik.errors.oldPassword}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">New Password</div>
                        <input type="password" onChange={formik.handleChange} name="newPassword" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.newPassword} />
                        <div className="pl-3 text-red-600">{formik.errors.newPassword}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Confirm Password</div>
                        <input type="password" onChange={formik.handleChange} name="confirmPassword" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.confirmPassword} />
                        <div className="pl-3 text-red-600">{formik.errors.confirmPassword}</div>
                    </div>
                </div>
                <div className="grid place-content-center m-10">
                    <Button type="submit" text={"Submit Changes"} />
                </div>
            </form>
        </div>
    )
}

export default UpdatePass2
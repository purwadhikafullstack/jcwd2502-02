import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import Button from '../components/button';
import toast, { Toaster } from "react-hot-toast";

import { login2 } from '../redux/Features/users';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/App/Store';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    const userSelector = useAppSelector((state) => state.users)
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            const data = await dispatch(login2({ ...values }))
            console.log(data.payload);
            const token = localStorage.getItem("accessToken");
            if (data.payload && token) {
                toast.success('Login successful')
                setTimeout(() => {
                    navigate('/')
                }, 5000)
            }
        },
        validationSchema: yup.object().shape({
            email: yup.string().required().email(),
            password: yup.string().required(),
        })
    });
    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    }

    return (
        <div className=" h-[900px] md:h-screen bg-gradient-to-b from-green-700 to-emerald-300">
            <h1>{userSelector?.email}</h1>
            <Toaster />
            <div className='grid place-content-center'>
                <img src="./buyfresh_logo.png" alt="app_logo" className="h-[200px]" />
            </div>
            <div className='grid place-content-center'>
                <form className='flex flex-col rounded-2xl gap-2 bg-green-700 p-5 w-[350px] md:w-[450px] lg:w-[400px]'>
                    <label className='text-white' htmlFor="" >Email</label>
                    <input type="email" id='email' name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='rounded-xl p-2' placeholder='' />
                    {
                        formik.touched.email && formik.errors.email ?
                            <div className='text-red-500 font-bold'> {formik.errors.email} </div>
                            :
                            null
                    }
                    <label className='text-white' htmlFor="" >Password</label>
                    <input type="password" id='password' name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='rounded-xl p-2' />
                    {
                        formik.touched.password && formik.errors.password ?
                            <div className='text-red-500 font-bold'> {formik.errors.password} </div>
                            :
                            null
                    }

                    <div className=' flex justify-end text-white hover:underline'>Forgot Password?</div>
                </form>
                <div className='flex justify-center mt-10'>
                    <Button text={'Login'} type="submit" onClick={formik.handleSubmit} style={"w-[300px]"} />
                </div>
                <Link to={'/register'}>
                    <div className='flex justify-center text-green-800 font-semibold text-xl underline mt-5'>Register Here!</div>
                </Link>
            </div>
        </div>
    )
}
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import Button from '../components/button';
import toast, { Toaster } from "react-hot-toast";

import { login2 } from '../redux/Features/users';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/App/Store';

export default function LoginPage() {
    const userSelector = useAppSelector((state) => state.users)
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            // if(formik.values.email && formik.values.password) {
            //     try {
            //         const response = await axios.post('http://localhost:8905/api/users/login', formik.values);
            //         console.log(response);
            //         toast.success(response.data.message)
            //     } catch (error) {
            //         toast.error(error.response.data.message);
            //     }
            // } else {
            //     toast.error("Please fill in all required forms")
            // }
            await dispatch(login2({...values}))


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
    const registerUser = () => {
        alert(formik.values.password)
    }
    // const handleSubmit = async () => {
    //     console.log(formik.values);
    //     if(formik.values.email && formik.values.password) {
    //         try {
    //             const response = await axios.post('http://localhost:8905/api/users/login', formik.values);
    //             console.log(response);
    //             toast.success(response.data.message)
    //         } catch (error) {
    //             toast.error(error.response.data.message);
    //         }
    //     } else {
    //         toast.error("Please fill in all required forms")
    //     }

    // }
    // console.log('form values', formik.values);
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
                    <input type="email" id='email' name='email' onChange={formik.handleChange} value={formik.values.email} className='rounded-xl p-2' placeholder='' />
                    <div className='text-red-500 font-bold'> {formik.errors.email} </div>
                    <label className='text-white' htmlFor="" >Password</label>
                    <input type="password" id='password' name='password' onChange={formik.handleChange} value={formik.values.password} className='rounded-xl p-2' />
                    <div className='text-red-500 font-bold'> {formik.errors.password} </div>
                    <div className=' flex justify-end text-white hover:underline'>Forgot Password?</div>
                </form>
                <div className='flex justify-center mt-10'>
                    <Button text={'Login'} onClick={formik.handleSubmit} style={"w-[300px]"} />
                </div>
                <div className='flex justify-center text-green-800 font-semibold text-xl underline mt-5'>Register Here!</div>
            </div>
        </div>
    )
}
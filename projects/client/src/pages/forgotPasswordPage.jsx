import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import Button from '../components/button';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { api } from "../api/api";

export default function ForgotPasswordPage() {
    const formik = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: async (values) => {
            console.log(values.email);
            const response = await api().post('/users/request-reset', {email: values.email})
            toast.success('Recovery email has been sent')
        },
        validationSchema: yup.object().shape({
            email: yup.string().required().email(),
        })
    })

    return (
        <div className=" h-[900px] md:h-screen bg-gradient-to-b from-green-700 to-emerald-300">
            <Toaster />
            <div className='grid place-content-center'>
                <img src="./buyfresh_logo.png" alt="app_logo" className="h-[200px]" />
            </div>
            <div className='grid place-content-center'>
                <form className='flex flex-col rounded-2xl gap-2 bg-green-700 p-9 w-[350px] md:w-[450px] lg:w-[400px]' onSubmit={formik.handleSubmit}>
                    <label className='text-white' htmlFor="" >Email</label>
                    <input type="email" id='email' name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='rounded-xl p-2' placeholder='' />
                    {
                        formik.touched.email && formik.errors.email ?
                            <div className='text-red-500 font-bold'> {formik.errors.email} </div>
                            :
                            null
                    }
                    <div className='flex justify-center mt-10'>
                        <Button text={'Send Recovery Email'} type="submit" style={"w-[300px]"}/>
                    </div>
                </form>
                <Link to={'/register'}>
                    <div className='flex justify-center text-green-800 font-semibold text-xl underline mt-5'>Don't have an account?</div>
                </Link>
            </div>
        </div>
    )
}
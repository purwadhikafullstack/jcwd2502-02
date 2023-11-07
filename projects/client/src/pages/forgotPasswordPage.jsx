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
            const response = await api().post('/users/request-reset', { email: values.email })
            toast.success('Recovery email has been sent')
        },
        validationSchema: yup.object().shape({
            email: yup.string().required().email(),
        })
    })

    return (
        <div className=" h-[900px] md:h-screen bg-gradient-to-b from-green-700 to-yellow-300">
            <Toaster />
            <div className='grid place-content-center'>
                <Link to={'/'}>
                    <img src="./buyfresh_logo.png" alt="app_logo" className="h-[200px]" />
                </Link>
            </div>
            <div className='grid place-content-center'>
                <form className='flex flex-col rounded-2xl gap-2 bg-green-700 p-5 w-[350px] md:w-[450px] lg:w-[400px]' onSubmit={formik.handleSubmit}>

                    <div className="text-center text-yellow-300 text-4xl font-black pb-5">No Worries!
                        <div className="text-white text-base font-normal pt-3">
                            Please enter your account email address and we will send you a link to update your password
                        </div>

                    </div>

                    <label className='text-white font-bold text-sm' htmlFor="" >Email</label>
                    <input type="email" id='email' name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='rounded-full p-2 pl-3' placeholder='' />
                    {
                        formik.touched.email && formik.errors.email ?
                            <div className='text-orange-400 font-medium'> {formik.errors.email} </div>
                            :
                            null
                    }
                    <div className='flex justify-center mt-5'>
                        <Button text={'Send Recovery Email'} type="submit" style={"w-[300px]"} />
                    </div>

                    <div className='flex justify-center text-white'>Don't have account?
                        <Link to={'/register'}>
                            <div className='pl-2 flex justify-center text-yellow-300  hover:underline'>Register Here!</div>
                        </Link>
                    </div>
                </form>
                {/* <Link to={'/register'}>
                    <div className='flex justify-center text-green-800 font-semibold text-xl underline mt-5'>Don't have an account?</div>
                </Link> */}
            </div>
        </div>
    )
}
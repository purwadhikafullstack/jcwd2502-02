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
            const token = localStorage.getItem("accessToken");
            if (data.payload && token) {
                toast.success('Login successful')
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            }
        },
        validationSchema: yup.object().shape({
            email: yup.string().required().email(),
            password: yup.string().required().min(6),
        })
    });
    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    }

    return (
        <div className=" h-[900px] md:h-screen bg-gradient-to-b from-green-700 to-yellow-300">
            <h1>{userSelector?.profile_picture}</h1>
            <Toaster />
            <div className='grid place-content-center'>
                <Link to={'/'}>
                    <img src="./buyfresh_logo.png" alt="app_logo" className="h-[200px]" />
                </Link>
            </div>
            <div className='grid place-content-center'>
                <form className='flex flex-col rounded-2xl gap-2 bg-green-700 p-5 w-[350px] md:w-[450px] lg:w-[400px]'>
                    <label className='text-white font-bold text-sm' htmlFor="" >Email</label>
                    <input type="email" id='email' name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='rounded-full p-2 pl-3' placeholder='' />
                    {
                        formik.touched.email && formik.errors.email ?
                            <div className='text-orange-400 font-medium'> {formik.errors.email} </div>
                            :
                            null
                    }
                    <label className='text-white font-bold text-sm pt-2' htmlFor="" >Password</label>
                    <input type="password" id='password' name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='rounded-full p-2 pl-3' />
                    {
                        formik.touched.password && formik.errors.password ?
                            <div className='text-orange-400 font-medium'> {formik.errors.password} </div>
                            :
                            null
                    }

                    <div className='flex justify-start text-yellow-300 hover:underline'>
                        <Link to={'/forgot-password'}>
                            <div className='hover:underline'>Forgot Password?</div>
                        </Link>
                    </div>


                    <div className='flex justify-center mt-5'>
                        <Button text={'Login'} type="submit" onClick={formik.handleSubmit} style={"w-[300px]"} />
                    </div>

                    <div className='flex justify-center text-white'>Don't have account?
                        <Link to={'/register'}>
                            <div className='pl-2 flex justify-center text-yellow-300  hover:underline'>Register Here!</div>
                        </Link>
                    </div>
                </form>


            </div>
        </div>
    )
}
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import * as yup from 'yup';
import Button from '../components/button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/api';

export default function ChangePasswordPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [valid, setValid] = useState(true);
    const [jwtToken, setjwtToken] = useState("");
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        onSubmit: async (values) => {
            try {
                const response = await api().patch('/users/reset-password', null, { headers: { authorization: `Bearer ${id}`, "password": values.password, "confirmpassword": values.confirmPassword } })
                toast.success('Password successfully updated')
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },
        validationSchema: yup.object().shape({
            password: yup.string().required(),
            confirmPassword: yup.string().required().oneOf([yup.ref('password')], `Password must match`)
        })
    });

    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    }

    const onCheckToken = async () => {
        try {
            const isTokenValid = await api().get('/users/check-token', { headers: { authorization: `Bearer ${id}` } })
        } catch (error) {
            if (error) {
                setValid(false)
            }
        }
    }

    useEffect(() => {
        onCheckToken(id)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-700 to-yellow-300">
            <Toaster />
            <div className='grid place-content-center'>
                <Link to={'/'}>
                    <img src={"./buyfresh_logo.png" && "https://cdn.discordapp.com/attachments/1159339445049368588/1174957031107608636/buyfresh_logo.png?ex=65697b01&is=65570601&hm=ff2240905e431008b2dccd668e94ce44a2e248efb11493b26c265c7dba380f28&"} alt="app_logo" className="h-[200px]" />
                </Link>
            </div>
            {
                valid ?
                    <div className='grid place-content-center'>
                        <form className='flex flex-col rounded-2xl gap-2 bg-green-700 p-5 w-[350px] md:w-[450px] lg:w-[400px]' onSubmit={formik.handleSubmit}>
                            <label className='text-white' htmlFor="" >New Password</label>
                            <input type="password" id='password' name='password' onChange={formik.handleChange} value={formik.values.password} className='rounded-md p-2' placeholder='' />
                            <div className='text-orange-400 font-medium'> {formik.errors.password} </div>
                            <label className='text-white' htmlFor="" >Confirm Password</label>
                            <input type="password" id='confirmPassword' name='confirmPassword' onChange={formik.handleChange} value={formik.values.confirmPassword} className='rounded-md p-2' />
                            <div className='text-orange-400 font-medium'> {formik.errors.confirmPassword} </div>
                            <div className='flex justify-center m-4'>
                                <Button text='Submit Password' type='submit' style={"w-[300px]"} />
                            </div>
                        </form>
                    </div>
                    :
                    <div className='grid place-content-center'>
                        <div className='flex flex-col rounded-2xl gap-2 bg-green-700 p-5 w-[350px] md:w-[450px] lg:w-[400px]'>
                            <div>
                                <h1 className='font-bold flex justify-center'>
                                    Unfortunately this link has expired
                                </h1>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
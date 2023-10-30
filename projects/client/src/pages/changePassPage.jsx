import { useFormik } from 'formik';
import { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import * as yup from 'yup';
import Button from '../components/button';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/api';

export default function ChangePasswordPage() {
    const navigate = useNavigate()
    const {id} = useParams()
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        onSubmit: async (values) => {
            try {
                console.log(id);
                const response = await api().patch('/users/reset-password', null,  {headers: { authorization: `Bearer ${id}`, "password": values.password, "confirmpassword": values.confirmPassword }})
                console.log(response);
                toast.success('Password successfully updated')
            } catch (error) {
                console.log(error);
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

    return (
        <div className=" h-[900px] md:h-[900px] bg-gradient-to-b from-green-700 to-emerald-300">
            <Toaster />
            <div className='grid place-content-center'>
                <img src="./buyfresh_logo.png" alt="app_logo" className="h-[200px]" />
            </div>
            <div className='grid place-content-center'>
                <form className='flex flex-col rounded-2xl gap-2 bg-green-700 p-5 w-[350px] md:w-[450px] lg:w-[400px]' onSubmit={formik.handleSubmit}>
                    <label className='text-white' htmlFor="" >password</label>
                    <input type="password" id='password' name='password' onChange={formik.handleChange} value={formik.values.password} className='rounded-md p-2' placeholder='' />
                    <div className='text-red-500 font-bold'> {formik.errors.password} </div>
                    <label className='text-white' htmlFor="" >Confirm Password</label>
                    <input type="password" id='confirmPassword' name='confirmPassword' onChange={formik.handleChange} value={formik.values.confirmPassword} className='rounded-md p-2' />
                    <div className='text-red-500 font-bold'> {formik.errors.confirmPassword} </div>
                    <div className='flex justify-center m-4'>
                        <Button text='Submit Password' type='submit' style={"w-[300px]"} />
                    </div>
                </form>
            </div>
        </div>
    )
}
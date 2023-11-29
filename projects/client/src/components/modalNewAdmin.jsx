import { useFormik } from "formik";
import * as yup from 'yup';
import { api } from "../api/api";
import Button from "./button";
import Input from "./input";
import { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const ModalNewAdmin = ({ getAdmins }) => {
    const [image, setImage] = useState([])
    const [branch, setBranch] = useState("")
    const [disabled, setDisabled] = useState(false)
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            phone_number: "",
            birthdate: "",
            store_branch_id: "",
            gender: ""
            // profile_picture: ""
        },
        onSubmit: async (values) => {
            try {
                setDisabled(true)
                const response = await api().post(`/users/branch-manager`, formik.values);
                document.getElementById('my_modal_3').close();
                toast.success(response.data.message);
                await getAdmins()
                // setTimeout(() => {
                // window.location.reload();
                // }, 3000);
            } catch (error) {
                document.getElementById('my_modal_3').close();
                toast.error(error.response.data.message);
                setDisabled(false)

            }
        },
        validationSchema: yup.object().shape({
            username: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            phone_number: yup.string().required(),
            store_branch_id: yup.string().required(),
            birthdate: yup.date().required().test(`date-not-in-the-future`, 'Date cannot be in the future', function (value) {
                const today = new Date();
                return value <= today
            }),
            gender: yup.string().required(),
            store_branch_id: yup.string().required()
        })
    })

    const onGetBranch = async () => {
        try {
            const { data } = await api().get('/branch/all');
            setBranch(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const onSelectImages = (category) => {
        try {
            const files = [...category.target.files]
            files.forEach(value => {
                if (value.size > 1000000 || value.type.split('/')[0] !== 'image') throw { message: `${value.name} Size Too Large / File Must be Image` }
            })
            setImage(files)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    }

    useEffect(() => {
        onGetBranch()
    }, []);


    return (
        <div>
            < Toaster className="z-50" />
            <Button text={"Add Admin"} style={"w-[350px] lg:w-[300px]"} onClick={() => document.getElementById('my_modal_3').showModal()}></Button>
            <dialog id="my_modal_3" className="modal backdrop-blur-md">
                <div className="modal-box b w-[400px] ">
                    <h3 className="font-bold text-4xl ">Create Admin</h3>
                    <div className="flex flex-col gap-5 mt-5">
                        <div className="grid gap-5">
                            <div>
                                <div className=" pb-2"> Username </div>
                                <input type="text" id='username' name='username' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} className='border border-green-800 rounded-xl w-full p-2' />
                                {
                                    formik.touched.username && formik.errors.username ?
                                        <div className='text-red-500 font-bold'> {formik.errors.username} </div>
                                        :
                                        null
                                }
                            </div>
                            <div>
                                <div className=" pb-2"> Email </div>
                                <input type="email" id='email' name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='border border-green-800 rounded-xl w-full p-2' placeholder='' />
                                {
                                    formik.touched.email && formik.errors.email ?
                                        <div className='text-red-500 font-bold'> {formik.errors.email} </div>
                                        :
                                        null
                                }
                            </div>
                            <div>
                                <div className=" pb-2"> Password </div>
                                <input type="password" id='password' name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='border border-green-800 rounded-xl w-full p-2' />
                                {
                                    formik.touched.password && formik.errors.password ?
                                        <div className='text-red-500 font-bold'> {formik.errors.password} </div>
                                        :
                                        null
                                }
                            </div>
                            <div>
                                <div className=" pb-2"> Phone Number </div>
                                <input type="text" id='phone_number' name='phone_number' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone_number} className='border border-green-800 rounded-xl w-full p-2' />
                                {
                                    formik.touched.phone_number && formik.errors.phone_number ?
                                        <div className='text-red-500 font-bold'> {formik.errors.phone_number} </div>
                                        :
                                        null
                                }
                            </div>
                            <div>
                                <div className=" pb-2"> Date of Birth </div>
                                <input type="date" id='birthdate' name='birthdate' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.birthdate} className='border border-green-800 rounded-xl w-full p-2' />
                                {
                                    formik.touched.birthdate && formik.errors.birthdate ?
                                        <div className='text-red-500 font-bold'> {formik.errors.birthdate} </div>
                                        :
                                        null
                                }
                            </div>
                            <div>
                                <div className=" pb-2"> Branch </div>
                                <select id="store_branch_id" name="store_branch_id" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.store_branch_id} className="border border-green-800 rounded-xl w-full p-2">
                                    <option value="" disabled> Select a branch </option>
                                    {
                                        branch && branch.map((value, index) => {
                                            return (
                                                <option key={index} value={value.id}>
                                                    {value.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                {
                                    formik.touched.store_branch_id && formik.errors.store_branch_id ?
                                        <div className='text-red-500 font-bold'> {formik.errors.store_branch_id} </div>
                                        :
                                        null
                                }
                            </div>
                            <div>
                                <div className=" pb-2"> Gender </div>
                                <select name="gender" id="gender" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.gender} className="border border-green-800 rounded-xl w-full p-2">
                                    <option value="" disabled>
                                        Select a gender
                                    </option>
                                    <option value="male">
                                        Male
                                    </option>
                                    <option value="female">
                                        Female
                                    </option>
                                </select>
                                {
                                    formik.touched.gender && formik.errors.gender ?
                                        <div className='text-red-500 font-bold'> {formik.errors.gender} </div>
                                        :
                                        null
                                }
                            </div>
                            {/* <div>
                                <div className="text-white pb-2"> Profile Picture </div>
                                <div>
                                    <input className="file-input file-input-warning w-full max-w-xs" type="file" onChange={(e) => onSelectImages(e)} />
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="modal-action grid place-content-center">
                        <div className="flex gap-2">
                            {/* <button onClick={() => document.getElementById('my_modal_3').close()} className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black">Cancel</button>
                            <form method="dialog" onClick={formik.handleSubmit}>
                                <button type="submit" className="btn bg-yellow-300 border-4 border-green-800 hover:bg-yellow-300 hover:border-green-800">Submit</button>
                            </form> */}

                            <form method="dialog">
                                <div className="flex gap-2">
                                    {disabled ? null : <button className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black rounded-2xl"
                                    >CANCEL</button>}
                                </div>
                            </form>
                            {disabled ? <button className={"btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900 cursor-not-allowed"}>CREATING</button>
                                :
                                <button disabled={disabled} onClick={() => formik.handleSubmit()} type="submit" className={`${disabled ? "btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900 " : "btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900"} `}>{disabled ? "APPLYING CHANGES" : "SUBMIT"}</button>
                            }
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ModalNewAdmin
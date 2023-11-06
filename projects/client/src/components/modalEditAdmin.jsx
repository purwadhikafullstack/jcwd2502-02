import { useFormik } from "formik";
import * as yup from 'yup';
import { api } from "../api/api";
import Button from "./button";
import Input from "./input";
import { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const ModalEditAdmin = ({adminData}) => {
    const [image, setImage] = useState([])
    const [branch, setBranch] = useState("")
    const formik = useFormik({
        initialValues: {
            username: adminData.username,
            email: adminData.email,
            password: "",
            phone_number: adminData.phone_number,
            birthdate: adminData.birthdate,
            store_branch_id: adminData.store_branch_id,
            gender: adminData.gender
            // profile_picture: ""
        },
        onSubmit: async(values) => {
            try {
                console.log(`dari model`);
                console.log(adminData);
                // const response = await api().post(``, formik.values)
                // toast.success(response.data.message);
                // setTimeout(() => {
                //     window.location.reload();
                // }, 3000);
            } catch (error) {
                toast.error(error.response.data.message);
            }
            },
        validationSchema: yup.object().shape({
            username: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            phone_number: yup.string().required(),
            store_branch_id: yup.string().required(),
            birthdate: yup.date().required().test(`date-not-in-the-future`, 'Date cannot be in the future', function(value){
                const today = new Date();
                return value <= today
            }),
            gender: yup.string().required(),
            store_branch_id: yup.string().required()
        })
    })

    const onGetBranch = async () => {
        try {
            const {data} = await api().get('/branch/all');
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

    // const debouncedHandleSubmit = debounce(() => {
    //     inputAddress.handleSubmit();
    // }, 1000);

    useEffect(() => {
        onGetBranch()
    }, []);

    return(
        <div>
            < Toaster/>
            <Button text={"Edit"} style={"lg:w-[130px] w-[100px] my-1 text-md font-semibold rounded-full"} onClick={() => document.getElementById('my_modal_4').showModal()}></Button>
            <dialog id="my_modal_4" className="modal backdrop-blur-md">
                <div className="modal-box bg-gradient-to-l from-yellow-300 to-green-600 w-[650px] ">
                    <h3 className="font-bold text-4xl text-white">Edit Admin {adminData.username}</h3>
                    <div className="flex flex-col gap-5 mt-5">
                        <div className="grid gap-5">
                            <div>
                                <div className="text-white pb-2"> Username </div>
                                <input type="text" id='username' name='username' onChange={formik.handleChange} value={formik.values.username} className='rounded-md w-3/4 p-2' placeholder={adminData.username} />
                                <div className='text-red-500 font-bold'> {formik.errors.username} </div>
                            </div>
                            <div>
                                <div className="text-white pb-2"> Email </div>
                                <input type="email" id='email' name='email' onChange={formik.handleChange} value={formik.values.email} className='rounded-md w-3/4 p-2' placeholder={adminData.email} />
                                <div className='text-red-500 font-bold'> {formik.errors.email} </div>
                            </div>
                            <div>
                                <div className="text-white pb-2"> Password </div>
                                <input type="password" id='password' name='password' onChange={formik.handleChange} value={formik.values.password} className='rounded-md w-3/4 p-2' placeholder='password'/>
                                <div className='text-red-500 font-bold'> {formik.errors.password} </div>
                            </div>
                            <div>
                                <div className="text-white pb-2"> Phone Number </div>
                                <input type="text" id='phone_number' name='phone_number' onChange={formik.handleChange} value={formik.values.phone_number} className='rounded-md w-3/4 p-2' placeholder={adminData.phone_number} />
                                <div className='text-red-500 font-bold'> {formik.errors.phone_number} </div>
                            </div>
                            {/* <div>
                                <div className="text-white pb-2"> Date of Birth </div>
                                <input type="date" id='birthdate' name='birthdate' onChange={formik.handleChange} value={formik.values.birthdate} className='rounded-md w-3/4 p-2'/>
                                <div className='text-red-500 font-bold'> {formik.errors.birthdate} </div>
                            </div> */}
                            <div>
                                <div className="text-white pb-2"> Branch </div>
                                <select id="store_branch_id" name="store_branch_id" onChange={formik.handleChange} value={formik.values.store_branch_id} className="rounded-md w-3/4 p-2">
                                    <option value="" disabled> Select a branch </option>
                                    {
                                        branch && branch.map((value, index) => {    
                                            return(
                                                <option key={index} value={value.id}> 
                                                    {value.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <div className='text-red-500 font-bold'> {formik.errors.store_branch_id} </div>
                            </div>
                            <div>
                                <div className="text-white pb-2"> Gender </div>
                                    <select name="gender" id="gender" onChange={formik.handleChange} value={formik.values.gender} className="rounded-md w-3/4 p-2">
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
                                <div className='text-red-500 font-bold'> {formik.errors.gender} </div>
                            </div>
                            {/* <div>
                                <div className="text-white pb-2"> Profile Picture </div>
                                <div>
                                    <input className="file-input file-input-warning w-full max-w-xs" type="file" onChange={(e) => onSelectImages(e)} />
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="modal-action">                        
                        <div className="flex gap-2">
                            <button onClick={() => document.getElementById('my_modal_4').close()} className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black">Cancel</button>
                            <form method="dialog" onClick={formik.handleSubmit}>
                                <button type="submit" className="btn bg-yellow-300 border-4 border-green-800 hover:bg-yellow-300 hover:border-green-800">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ModalEditAdmin
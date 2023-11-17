import { useFormik } from "formik";
import * as yup from 'yup';
import { api } from "../api/api";
import Button from "./button";
import Input from "./input";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const ModalEditAdmin = ({adminData, getAdmins}) => {
    const [image, setImage] = useState([])
    const [branch, setBranch] = useState("")
    const formik = useFormik({
        initialValues: {
            username: adminData.username,
            email: adminData.email,
            store_branch_id: adminData.store_branch_id,
        },
        onSubmit: async(values) => {
            try {
            const response = await api().patch(`/users/edit-admin`, {...values, username: adminData.username, email: adminData.email,})
                document.getElementById(`my_modal_${adminData.username}`).close();
                toast.success(response.data.message);
                getAdmins()
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },
        validationSchema: yup.object().shape({
            username: yup.string().required(),
            email: yup.string().email().required(),
            store_branch_id: yup.string().required().notOneOf([adminData.store_branch_id], "Admin must be reassigned to a different branch"),
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
        <div className="h-fit">
            < Toaster/>
            <Button text={"Edit"} style={"lg:w-[130px] w-[100px] my-1 text-md font-semibold rounded-full"} onClick={() => document.getElementById(`my_modal_${adminData.username}`).showModal()}></Button>
            <dialog id={`my_modal_${adminData.username}`} className="modal backdrop-blur-md">
                <div className="modal-box bg-gradient-to-l from-yellow-300 to-green-600 w-[650px] ">
                    <h3 className="font-bold text-4xl text-white">Reassign Branch Admin {adminData.username}</h3>
                    <div className="flex flex-col gap-5 mt-5">
                        <div className="grid gap-5">
                            <div>
                                <div className="text-white pb-2"> Branch </div>
                                <select id="store_branch_id" name="store_branch_id" onChange={formik.handleChange} value={formik.values.store_branch_id} className="rounded-md w-3/4 p-2">
                                    <option value="" disabled> Select a branch </option>
                                    {
                                        branch && branch.map((value, index) => {    
                                            return(
                                                <option key={index} value={value.id} disabled={value.id === adminData.store_branch_id}> 
                                                    {value.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <div className='text-red-500 font-bold'> {formik.errors.store_branch_id} </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-action">                        
                        <div className="flex gap-2">
                            <button onClick={() => document.getElementById(`my_modal_${adminData.username}`).close()} className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black">Cancel</button>
                            <form method="dialog" onClick={()=>formik.handleSubmit()}>
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
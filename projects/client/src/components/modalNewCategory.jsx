import Button from "./button"
import Input from "./input"
import axios from "axios"
import { useRef, useState, useEffect } from "react"
import toast from "react-hot-toast"
import { api1 } from "../api/api"
const ModalNewCategory = () => {
    const inputCategoryName = useRef();
    const api = api1()
    const onCreateCategory = async () => {
        try {
            const inputs = {
                name: inputCategoryName.current.value
            }
            if (inputs.name === "") {
                toast.error("Please Fill All Data")
            } else {
                console.log(inputs);
                const data = await api.post(`products/addcategory`, inputs)
                toast.success('Create Category Success')
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <button className="btn bg-yellow-400 ml-5 mt-3" onClick={() => document.getElementById('my_modal_3').showModal()}>Add Category</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-green-600 w-[300px] ">
                    <h3 className="font-bold text-4xl text-white">New Category</h3>
                    <div className="flex flex-col gap-5 mt-5">
                        <div>
                            <div className="text-white pb-2"> Category Name</div>
                            <Input
                                ref={inputCategoryName}
                                type={"text"}
                                style={"input w-full"} />
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <div className="flex gap-2">
                                <button className="btn bg">Cancel</button>
                                <button onClick={onCreateCategory} className="btn bg">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
export default ModalNewCategory
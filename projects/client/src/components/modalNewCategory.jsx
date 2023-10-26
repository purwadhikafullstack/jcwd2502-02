import Button from "./button"
import Input from "./input"
import axios from "axios"
import { useRef, useState, useEffect } from "react"
import toast from "react-hot-toast"

const ModalNewCategory = () => {
    const inputCategoryName = useRef();
    const onCreateCategory = async () => {
        try {
            const inputs = {
                name: inputCategoryName.current.value
            }
            if (inputs.name === "") {
                toast.error("Please Fill All Data")
            } else {
                console.log(inputs);
                const data = await axios.post(`${process.env.REACT_APP_URL}products/addcategory`, inputs)
                toast.success('Create Category Success')
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Button style={" hover:border-green-300 grid place-content-center h-[100px] rounded-full hover:shadow-lg hover:shadow-green-200 hover:scale-105 ease-in duration-200"} text={"Add new +"} onClick={() => document.getElementById('my_modal_3').showModal()} />
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-green-600 w-[400px] ">
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
                            <div className="flex gap-5">
                                <Button text={"cancel"} style={"btn bg-black text-white border-black hover:bg-black hover:border-black"} />
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
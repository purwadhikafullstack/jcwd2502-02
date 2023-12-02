import Button from "./button"
import Input from "./input"
import axios from "axios"
import { useRef, useState, useEffect } from "react"
import toast from "react-hot-toast"
import { api1 } from "../api/api"
const ModalNewCategory = ({ onCreate }) => {
    const [category, setCategory] = useState([]);
    const inputCategoryName = useRef();
    const [image, setImage] = useState([])
    const api = api1()
    const onGetCategory = async () => {
        try {
            const category = await api.get(`/category/all`);
            setCategory(category.data.data);
        } catch (error) {
            console.log(error);
        }
    };
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
    const onCreateCategory = async () => {
        try {
            const inputs = {
                name: inputCategoryName.current.value
            }
            const fd = new FormData()
            fd.append('data', JSON.stringify(inputs))
            image.forEach(value => {
                fd.append('image', value)
            })
            if (inputs.name === "" || image.length == 0) {
                toast.error("Please Fill All Data")
            } else {
                const data = await api.post(`category/addcategory`, fd)
                toast.success('Create Category Success')
                onCreate()
                const fileInput = document.querySelector('.file-input');
                if (fileInput) {
                    fileInput.value = null;
                }
                inputCategoryName.current.value = ""
                setImage([])
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        onGetCategory();
    }, []);
    return (
        <div>
            <Button text={"Add Category"} style={"w-[300px]"} onClick={() => document.getElementById('my_modal_3').showModal()}></Button>

            <dialog id="my_modal_3" className="modal backdrop-blur-md">
                <div className="modal-box bg-gradient-to-l from-yellow-300 to-green-600 w-[350px] ">
                    <h3 className="font-bold text-4xl text-white">New Category</h3>
                    <div className="flex flex-col gap-5 mt-5">
                        <div className="grid gap-5">
                            <div>
                                <div className="text-white pb-2"> Category Name
                                </div>
                                <Input
                                    ref={inputCategoryName}
                                    type={"text"}
                                    style={"input w-full"} />
                            </div>
                            <div>
                                <div className="text-white pb-2"> Category Image</div>
                                <div>
                                    <input className="file-input file-input-warning w-full max-w-xs" type="file" onChange={(e) => onSelectImages(e)} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <div className="flex gap-2">
                                <button className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black">Cancel</button>
                                <button onClick={onCreateCategory} className="btn bg-yellow-300 border-4 border-green-800 hover:bg-yellow-300 hover:border-green-800">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
export default ModalNewCategory
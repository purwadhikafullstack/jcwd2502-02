import Button from "./button"
import Input from "./input"
import axios from "axios"
import { useRef, useState, useEffect } from "react"
import toast from "react-hot-toast"
import { api1 } from "../api/api"
const ModalNewCategory = () => {
    const [category, setCategory] = useState([]);
    const inputCategoryName = useRef();
    const [image, setImage] = useState([])
    const api = api1()
    const onGetCategory = async () => {
        try {
            const category = await api.get(`/products/category`);
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
            if (inputs.name === "" || inputs.image === "") {
                toast.error("Please Fill All Data")
            } else {
                console.log(inputs);
                const data = await api.post(`products/addcategory`, fd)
                toast.success('Create Category Success')
                console.log(data);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
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
                            <div className="text-white pb-2"> Category Image</div>
                            <Input
                                onChange={(e) => onSelectImages(e)}
                                type={"file"}
                                style={"input w-full grid place-content-center"} />
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
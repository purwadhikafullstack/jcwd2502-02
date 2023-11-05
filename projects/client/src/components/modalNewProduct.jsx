import Button from "./button"
import Input from "./input"
import { useRef, useState, useEffect } from "react"
import toast from "react-hot-toast"
import { api1 } from "../api/api"
import debounce from 'lodash/debounce';
const ModalNewProduct = () => {
    const [category, setCategory] = useState([]);
    const inputProductName = useRef();
    const inputProductPrice = useRef();
    const inputProductDescription = useRef();
    const inputProductCategory = useRef();
    const [image, setImage] = useState([])
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const api = api1()
    const onGetCategory = async () => {
        try {
            const category = await api.get(`/category/all`);
            category.data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setCategory(category.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const onSelectImages = (product) => {
        try {
            const files = [...product.target.files]
            files.forEach(value => {
                if (value.size > 1000000 || value.type.split('/')[0] !== 'image') throw { message: `${value.name} Size Too Large / File Must be Image` }
            })
            setImage(files)
        } catch (error) {
            alert(error.message)
        }
    }
    const onCreateProduct = async () => {
        try {
            const inputs = {
                name: inputProductName.current.value,
                price: Number(inputProductPrice.current.value),
                description: inputProductDescription.current.value,
                product_categories_id: Number(inputProductCategory.current.value),
            }
            const fd = new FormData()
            fd.append('data', JSON.stringify(inputs))
            image.forEach(value => {
                fd.append('image', value)
            })
            if (inputs.name === "" || inputs.image === "" || inputs.description === "" || inputs.product_categories_id === "") {
                toast.error("Please Fill All Data")
            } else {
                console.log(inputs);
                const data = await api.post(`products/addproduct`, fd)
                toast.success('Create Product Success')
                console.log(data);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const debouncedSetFilteredCategory = debounce((filtered) => {
        setFilteredCategory(filtered);
    }, 1000);
    useEffect(() => {
        onGetCategory();
    }, []);
    useEffect(() => {
        const filtered = category.filter((cat) =>
            cat.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        debouncedSetFilteredCategory(filtered);
    }, [searchQuery, category]);
    return (
        <div>
            <Button text={"Add Product"} style={"w-[300px]"} onClick={() => document.getElementById('my_modal_3').showModal()}></Button>
            <dialog id="my_modal_3" className="modal backdrop-blur-md">
                <div className="modal-box bg-gradient-to-l from-yellow-300 to-green-600 w-[350px] ">
                    <h3 className="font-bold text-4xl text-white">New Product</h3>
                    <div className="flex flex-col gap-5 mt-5">
                        <div className="grid gap-5">
                            <div>
                                <div className="text-white pb-2"> Product Name
                                </div>
                                <Input
                                    ref={inputProductName}
                                    type={"text"}
                                    style={"input w-full"} />
                            </div>
                            <div>
                                <div className="text-white pb-2"> Product Image</div>
                                <div>
                                    <input className="file-input file-input-warning w-full max-w-xs" type="file" onChange={(e) => onSelectImages(e)} />
                                </div>
                            </div>
                            <div>
                                <div className="text-white pb-2">Product Price</div>
                                <Input
                                    ref={inputProductPrice}
                                    type={"number"}
                                    style={"input w-full"} />
                            </div>
                            <div>
                                <div className="text-white pb-2">Product Category</div>
                                <select
                                    ref={inputProductCategory}
                                    className="select select-bordered w-full">
                                    <option disabled selected></option>
                                    {/* <option><input
                                        type="text"
                                        placeholder="Search categories"
                                        className="input w-1/4 bg-gradient-to-r from-yellow-300 to-green-600"
                                        value={searchQuery}
                                        onChange={handleSearchInputChange}
                                    /></option> */}
                                    {
                                        filteredCategory.map((value) => {
                                            return (
                                                <option value={value.id}>{value.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <div className="text-white pb-2">Description</div>
                                <div><textarea ref={inputProductDescription} className="w-full pl-4 pt-2" cols="30" rows="5"></textarea></div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <div className="flex gap-2">
                                <button className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black">Cancel</button>
                                <button onClick={onCreateProduct} className="btn bg-yellow-300 border-4 border-green-800 hover:bg-yellow-300 hover:border-green-800">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
export default ModalNewProduct
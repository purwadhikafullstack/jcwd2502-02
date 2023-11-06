import ProductCard from "../../components/productCard";
import Navbar from "../../components/navbarUser";
import Footer from "../../components/footer";
import React, { useEffect, useRef, useState } from "react";
import { api1 } from "../../api/api";
import debounce from 'lodash/debounce';
import ModalNewProduct from "../../components/modalNewProduct";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import DeleteConfirmation from "../../components/deleteModal"

const UpdateProductsPage = () => {
    const inputImage = useRef()
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputPrice, setInputPrice] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputCategory, setInputCategory] = useState("");
    const [modal, setModal] = useState(false);
    const api = api1();
    const pageTopRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const fetchData = async () => {
        try {
            const category = await api.get(`category/all`);
            category.data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setCategory(category.data.data);
            const products = await api.get(`products/allproducts`);
            products.data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setProducts(products.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleEditProduct = async (productId) => {
        try {
            setProductId(productId)
            const res = await api.get(`products/oneproduct/${productId}`);
            setInputName(res.data.data.name);
            setInputPrice(res.data.data.price);
            setInputDescription(res.data.data.description);
            setInputCategory(res.data.data.product_categories_id);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSaveProduct = async () => {
        try {
            const res = await api.patch(`products/saveproduct`, {
                inputName, inputPrice, inputDescription, inputCategory,
                id: productId,
            });
            setModal(!modal);
            if (pageTopRef.current) {
                pageTopRef.current.scrollIntoView({ behavior: "smooth" });
            }
            setSearchQuery("");
            toast.success("Update Product Success")
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };
    const onSelectId = async (productId) => {
        try {
            setProductId(productId)
        } catch (error) {
            console.log(error);
        }
    };
    const onSelectImages = async (event) => {
        try {
            console.log(productId);
            const file = event.target.files[0]
            if (file) {
                if (file.size > 1000000 || !/image\/(png|jpg|jpeg)/.test(file.type)) throw {
                    message: 'File must be less than 1MB and in png, jpg, or jpeg format!'
                }
                console.log(file);
                const formData = new FormData();
                formData.append('image', file);
                const response = await api.patch(`products/editimage/${productId}`, formData)
                console.log(response.data.data);
                toast.success("Product Image Updated")
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const onDeleteProducts = async (productId) => {
        try {
            const deleteProduct = await api.patch(`products/deleteproduct/${productId}`)
            console.log(deleteProduct);
            toast.success("Delete Product Success")
            fetchData()
        } catch (error) {
            console.log(error);
        }
    };
    const debouncedSaveProducts = debounce(() => { handleSaveProduct() }, 1000);
    const debouncedSetFilteredProducts = debounce((filtered) => { setFilteredProducts(filtered); }, 1000);
    useEffect(() => {
        fetchData()
    }, []);
    useEffect(() => {
        const filtered = products.filter((prod) =>
            prod.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        debouncedSetFilteredProducts(filtered);
    }, [searchQuery, products]);
    return (
        <div ref={pageTopRef} className="">
            <Toaster />
            <Navbar />
            <div className="">
                <div className="flex flex-row mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32 ">
                    <div className="text-4xl font-bold gap-2 py-5 text-green-800">
                        Edit Products
                    </div>
                </div>
                <div className="grid place-content-center md:place-content-start md:ml-20 lg:ml-32">
                    <ModalNewProduct />
                </div>
                <div className="ml-32 mt-5 ">
                    <input
                        type="text"
                        placeholder="Search categories"
                        className="input w-1/4 bg-gradient-to-r from-yellow-300 to-green-600"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                </div>
                <div className="overflow-x-auto px-5 my-8 md:px-20 lg:px-32">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-xl">Image</th>
                                <th className="text-xl">Name</th>
                                <th className="text-xl">Price</th>
                                <th className="text-xl">Description</th>
                                <th className="text-xl">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((value, index) => {
                                return (
                                    <tr key={index} className="hover border hover:border-b-green-700 hover:border-b-4 pl-0">
                                        <td>
                                            <div className="relative pt-5">
                                                <img className="object-fit rounded-full h-[100px] w-[100px]" src={process.env.REACT_APP_URL + `${value.image}`} />
                                                <div className="absolute left-0 right-0 top-0">
                                                    <input type="file" accept=".jpg, .jpeg, .png" ref={inputImage} hidden onChange={(event) => onSelectImages(event)} />
                                                    <div onClick={() => { inputImage.current.click(); onSelectId(value.id) }}>
                                                        <AiFillEdit className="text-3xl rounded-full p-2 w-[40px] h-[40px] absolute top-0 left-0 z-1 bg-green-800 text-white hover:scale-105 ease-in duration-200" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <th className="text-lg">{value.name}</th>
                                        <th className="text-lg">{value.price}</th>
                                        <th className="text-lg">{value.description}</th>
                                        <th className="text-lg">{value.product_category.name}</th>
                                        <td>
                                            <button className="btn bg-yellow-300 border-4 border-green-800 hover:bg-yellow-300 hover:border-green-800"
                                                onClick={() => {
                                                    setModal(true);
                                                    handleEditProduct(value.id);
                                                }}>EDIT
                                            </button>
                                        </td>
                                        <td>
                                            {/* <button className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black"
                                                onClick={() => {
                                                    onDeleteProducts(value.id);
                                                }}>DELETE</button> */}
                                            <DeleteConfirmation
                                                button={<button className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black">DELETE</button>}
                                                itemId={value.id}
                                                apiEndpoint={`/products/deleteproduct`}
                                                onDelete={() => fetchData()}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {modal ? (<div className="fixed backdrop-blur-md bg-black/30 h-screen w-full z-50 top-0 right-0 duration-600 ease-in"></div>) : ("")}
            <div className={modal ? `fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[50%] lg:w-[30%] p-10 rounded-xl bg-gradient-to-l from-yellow-300 to-green-600` : `hidden`}>
                <h3 className="font-bold text-4xl text-white">Edit Product</h3>
                <div className="flex flex-col gap-5 mt-5">
                    <div>
                        <div className="text-white pb-2"> Product Name</div>
                        <input className="input w-full" type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} />
                    </div>
                    <div>
                        <div className="text-white pb-2"> Product Price</div>
                        <input className="input w-full" type="number" value={inputPrice} onChange={(e) => setInputPrice(e.target.value)} />
                    </div>
                    <div>
                        <div className="text-white pb-2"> Product Description</div>
                        <input className="input w-full" type="text" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} />
                    </div>
                    <div>
                        <div className="text-white pb-2"> Product Category</div>
                        <select
                            value={inputCategory}
                            onChange={(e) => setInputCategory(e.target.value)}
                            className="select select-bordered w-full">
                            <option disabled selected></option>
                            {
                                category.map((value) => {
                                    return (
                                        <option value={value.id}>{value.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="modal-action">
                    <button className="btn bg-red-600 text-white border-4 border-black hover:bg-red-600 hover:border-black" onClick={() => setModal(!modal)}>Cancel</button>
                    <form method="dialog" onSubmit={() => debouncedSaveProducts()}>
                        <button className="btn bg-yellow-300 text-black border-4 border-green-600 hover:bg-yellow-300 hover:border-green-600">Submit</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default UpdateProductsPage
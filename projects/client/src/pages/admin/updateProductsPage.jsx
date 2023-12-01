import { useSelector } from "react-redux";
import NavbarAdmin from "../../components/navbarAdmin";
import Footer from "../../components/footer";
import React, { useEffect, useRef, useState } from "react";
import { api1 } from "../../api/api";
import { useDebounce } from 'use-debounce';
import ModalNewProduct from "../../components/modalNewProduct";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import DeleteConfirmation from "../../components/deleteModal"
import PaginationFixed from "../../components/paginationComponent";
import { Link } from "react-router-dom";
import ModalEditProduct from "../../components/modalEditProduct";
const UpdateProductsPage = () => {
    const inputImage = useRef()
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputPrice, setInputPrice] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputWeight, setInputWeight] = useState("");
    const [inputCategory, setInputCategory] = useState("");
    const [modal, setModal] = useState(false);
    const api = api1();
    const pageTopRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [sort, setSort] = useState('ASC');
    const [sortBy, setSortBy] = useState("id");
    const role = useSelector((state) => state.users.role);
    const [debouncedSearch] = useDebounce(searchQuery, 1000);

    const fetchData = async () => {
        try {
            const data = await api.get(`category/all`);
            setCategories(data.data.data);
            const products = await api.get(`products/get-for-edit-product?page=${page}&sort=${sort}&sortby=${sortBy}&searchquery=${searchQuery}&catId=${category}`);
            setMaxPage(products.data.maxPages);
            setProducts(products.data.products);
        } catch (error) {
            console.log(error);
        }
    };
    const handleEditProduct = async (productId) => {
        try {
            setProductId(productId)
            const res = await api.get(`products/oneproduct/${productId}`);
            setInputName(res.data.data.name);
            setInputPrice(res.data.data.price);
            setInputDescription(res.data.data.description);
            setInputWeight(res.data.data.weight);
            setInputCategory(res.data.data.product_categories_id);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSort = (event) => {
        try {
            setPage(1);
            setSort(event.target.value);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSortBy = (event) => {
        try {
            setPage(1);
            setSortBy(event.target.value);
        } catch (error) {
            console.log(error);
        }
    };
    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= maxPage) {
            setPage(newPage);
        } else {
            toast.error("Invalid page number!");
        }
    };
    const handleNextPage = () => {
        handlePageChange(page + 1);
    };
    const handlePrevPage = () => {
        handlePageChange(page - 1);
    };
    const handleSearchInputChange = (event) => {
        try {
            setPage(1);
            setSearchQuery(event);
        } catch (error) {
            console.log(error);
        }
    }
    const handleCat = (event) => {
        try {
            setPage(1)
            setCategory(event.target.value)
        } catch (error) {
            console.log(error);
        }
    }
    const handleReset = () => {
        try {
            setPage(1); setMaxPage(1); handleSearchInputChange(""); setSort("ASC"); setSortBy("id"); setCategory("")
        } catch (error) {
            console.log(error);
        }
    }
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
            const file = event.target.files[0]
            if (file) {
                if (file.size > 1000000 || !/image\/(png|jpg|jpeg)/.test(file.type)) throw {
                    message: 'File must be less than 1MB and in png, jpg, or jpeg format!'
                }
                const formData = new FormData();
                formData.append('image', file);
                const response = await api.patch(`products/editimage/${productId}`, formData)
                toast.success("Product Image Updated")
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData()
    }, [sort, page, sortBy, category, debouncedSearch]);

    return (
        <div ref={pageTopRef} className="">
            <Toaster />
            <NavbarAdmin />
            <div className="mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32 ">
                <div className="md:flex md:justify-between mt-5 md:mt-10">
                    <div className="">
                        <div className="text-4xl font-bold text-green-800 mb-3">
                            Manage Products
                        </div>
                    </div>
                    <div></div>
                    <div className="">
                        <ModalNewProduct />
                    </div>
                </div>
                <div className="overflow-x-auto mt-5 border-b-4 border-green-700">
                    <div role="tablist" className="tabs tabs-lifted tabs-lg">
                        <div role="tab" className="tab lg:text-xl tab-active bg-green-700 text-white rounded-t-xl">Products</div>
                        <Link to={`/updatecategory`}>
                            <div role="tab" className="tab lg:text-xl">Category</div>
                        </Link>
                        {role === "admin" ? <>
                            <Link to={`/update-product-stocks`}>
                                <div role="tab" className="tab lg:text-xl">Stocks</div>
                            </Link>
                        </> : null}
                        <Link to={`/manage-product-discount`}>
                            <div role="tab" className="tab lg:text-xl">Discount</div>
                        </Link>
                    </div>
                </div>
                <div className="">
                    <div className="border shadow-lg rounded-2xl flex overflow-x-auto lg:justify-center gap-3 mt-5 p-3 border-l-4 border-r-4 border-l-yellow-300 border-r-green-600 mb-5">
                        <div className=" ">
                            <input
                                type="text"
                                placeholder="Search Products"
                                className="w-[200px] h-[48px] px-2 border-2 rounded-xl lg:w-[300px]"
                                value={searchQuery}
                                onChange={(e) => handleSearchInputChange(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <select defaultValue="" value={sortBy} onChange={(e) => handleSortBy(e)} className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[200px]">
                                <option value={"id"} disabled selected>Sort By</option>
                                <option value="updatedAt"> Last Edited </option>
                                <option value="name"> Name </option>
                            </select>
                        </div>
                        <div className="">
                            <select defaultValue="" value={sort} onChange={(e) => handleSort(e)} className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[200px]">
                                <option value={""} disabled selected>Sort</option>
                                <option value="ASC"> Asc </option>
                                <option value="DESC"> Desc </option>
                            </select>
                        </div>
                        <div className="">
                            <select defaultValue="" value={category} onChange={(e) => handleCat(e)} className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[200px]">
                                <option value={""} disabled selected>Select Category</option>
                                {categories ? categories.map((value, index) => {
                                    return (
                                        <option value={value.id}> {value.name} </option>
                                    )
                                }) : null}
                            </select>
                        </div>
                        <div className="">
                            <div onClick={handleReset} className=" w-[70px] h-[48px] grid place-content-center text-lg lg:text-xl hover:underline  text-green-700 font-black">Reset</div>
                        </div>
                    </div>
                    <div className="overflow-x-auto ">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-xl text-black">Image</th>
                                    <th className="text-xl text-black">Name</th>
                                    <th className="text-xl text-black">Price</th>
                                    <th className="text-xl text-black">Description</th>
                                    <th className="text-xl text-black">Weight (gr)</th>
                                    <th className="text-xl text-black">Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products ? products.map((value) => {
                                    return (
                                        <tr key={value.id} className="hover border hover:border-b-green-700 hover:border-b-4 pl-0">
                                            <td>
                                                <div className="relative pt-5">
                                                    <img className="object-fit rounded-full h-[70px] w-[70px]" src={process.env.REACT_APP_URL + `${value.image}`} />
                                                    <div className="absolute left-0 right-0 top-0">
                                                        <input type="file" accept=".jpg, .jpeg, .png" ref={inputImage} hidden onChange={(event) => onSelectImages(event)} />
                                                        <div onClick={() => { inputImage.current.click(); onSelectId(value.id) }}>
                                                            <AiFillEdit className=" rounded-full p-2 w-[30px] h-[30px] absolute top-3 left-0 z-1 bg-green-800 text-white hover:scale-105 ease-in duration-200" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-lg">{value.name}</td>
                                            <td className="text-lg">{value.price}</td>
                                            <td className="text-lg">{value.description}</td>
                                            <td className="text-lg">{value.weight}</td>
                                            <td className="text-lg">{value.product_category.name}</td>
                                            <td>
                                                <button className="btn bg-yellow-300 border-4 border-green-800 hover:bg-yellow-300 hover:border-green-800"
                                                    onClick={() => {
                                                        setModal(true);
                                                        handleEditProduct(value.id);
                                                    }}>EDIT
                                                </button>
                                            </td>
                                            <td>
                                                <DeleteConfirmation
                                                    itemId={value.id}
                                                    onDelete={fetchData}
                                                    apiEndpoint="products/deleteproduct"
                                                    text={""}
                                                    message={"Product Deleted"}
                                                    textOnButton={"Yes"}
                                                    button={<div className=" btn hover:bg-red-600 hover:border-black bg-red-600 border-black border-4 text-white w-full">
                                                        Delete
                                                    </div>} />
                                            </td>
                                        </tr>
                                    );
                                }) : null}

                            </tbody>
                        </table>
                        {products.length == 0 ? <div className="alert alert-error flex justify-center w-full">
                            <span className="flex justify-center">Sorry Product is Unavailable</span>
                        </div> : null}
                    </div>
                </div>
            </div>
            <ModalEditProduct
                showModal={modal}
                onCloseModal={() => setModal(!modal)}
                onSaveProduct={handleSaveProduct}
                inputName={inputName}
                setInputName={setInputName}
                inputPrice={inputPrice}
                setInputPrice={setInputPrice}
                inputDescription={inputDescription}
                setInputDescription={setInputDescription}
                inputWeight={inputWeight}
                setInputWeight={setInputWeight}
                inputCategory={inputCategory}
                setInputCategory={setInputCategory}
                categories={categories}
            />
            <div className="flex justify-center mt-4 mb-10">
                <PaginationFixed
                    page={page}
                    maxPage={maxPage}
                    handlePageChange={handlePageChange}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
            </div>
            <Footer />
        </div>
    )
}
export default UpdateProductsPage
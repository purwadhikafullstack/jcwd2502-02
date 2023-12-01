import NavbarAdmin from "../../components/navbarAdmin";
import Footer from "../../components/footer";
import React, { useEffect, useRef, useState } from "react";
import { api } from "../../api/api";
import { useDebounce } from 'use-debounce';
import ModalNewCategory from "../../components/modalNewCategory";
import ModalEditCategory from "../../components/modalEditCategory";
import { AiFillEdit } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import PaginationFixed from "../../components/paginationComponent";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteConfirmation from "../../components/deleteModal";
const UpdateProductsCategoryPage = () => {
    const inputImage = useRef();
    const [category, setCategory] = useState([]);
    const [catId, setCatId] = useState("");
    const [inputCat, setInputCat] = useState("");
    const [modal, setModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const pageTopRef = useRef(null);
    const navigate = useNavigate();
    const role = useSelector((state) => state.users.role);
    const [debouncedSearch] = useDebounce(searchQuery, 1000);

    const onGetCategory = async () => {
        try {
            const response = await api().get(`category/list?search=${searchQuery}&sort=${sortOrder}&page=${page}`);
            setCategory(response.data.data.categories);
            setMaxPages(response.data.data.maxPages);
        } catch (error) {
            console.log(error);
        }
    };
    const handleEditCategory = async (categoryId) => {
        try {
            setCatId(categoryId);
            const res = await api().get(`category/onecategory/${categoryId}`);
            setInputCat(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSaveCat = async () => {
        try {
            const res = await api().patch(`category/savecategory`, {
                inputCat,
                id: catId,
            });
            setModal(!modal);
            if (pageTopRef.current) {
                pageTopRef.current.scrollIntoView({ behavior: "smooth" });
            }
            setSearchQuery("");
            onGetCategory();
        } catch (error) {
            console.log(error);
        }
    };
    const onSelectId = async (categoryId) => {
        try {
            setCatId(categoryId);
        } catch (error) {
            console.log(error);
        }
    };
    const onSelectImages = async (event) => {
        try {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 1000000 || !/image\/(png|jpg|jpeg)/.test(file.type)) throw {
                    message: 'File must be less than 1MB and in png, jpg, or jpeg format!'
                }
                const formData = new FormData();
                formData.append('image', file);
                const response = await api().patch(`category/editimage/${catId}`, formData);
                toast.success("Category Image Updated");
                onGetCategory();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const onDeleteCategory = async (catId) => {
        try {
            const deleteCategory = await api().patch(`category/deletecategory/${catId}`);
            toast.success("Delete Category Success");
            onGetCategory();
        } catch (error) {
            console.log(error);
        }
    };
    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= maxPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            toast.error("Invalid page number!");
        }
    };
    const handleNextPage = () => {
        handlePageChange(page + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handlePrevPage = () => {
        handlePageChange(page - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleSearch = (event) => {
        try {
            setPage(1);
            setSearchQuery(event)
        } catch (error) {
            console.log(error);
        }
    }
    const handleReset = () => {
        setPage(1)
        setSearchQuery("")
        setSortOrder("DESC")
        navigate(`/updatecategory`, { replace: true });
    }
    const handleChangeSort = (event) => {
        try {
            setPage(1);
            setSortOrder(event.target.value);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        onGetCategory();
    }, [sortOrder, page, debouncedSearch]);

    return (
        <div ref={pageTopRef} className="">
            <Toaster />
            <NavbarAdmin />
            <div className="mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32">
                <div className="md:flex md:justify-between mt-5 md:mt-10">
                    <div className="flex flex-row ">
                        <div className="text-4xl font-bold text-green-800 mb-3">
                            Manage Category
                        </div>
                    </div>
                    <div className="">
                        <ModalNewCategory />
                    </div>
                </div>
                <div className="overflow-x-auto mt-5 border-b-4 border-green-700">
                    <div role="tablist" className="tabs tabs-lifted tabs-lg">
                        <Link to={`/updateproducts`}>
                            <div role="tab" className="tab lg:text-xl ">Products</div>
                        </Link>
                        <div role="tab" className="tab lg:text-xl tab-active bg-green-700 text-white rounded-t-xl">Category</div>
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
                <div className="border shadow-lg rounded-2xl flex overflow-x-auto lg:justify-center gap-3 mt-5 p-3 border-l-4 border-r-4 border-l-yellow-300 border-r-green-600 mb-5">
                    <div className=" ">
                        <input
                            type="text"
                            placeholder="Search Category"
                            className="w-[200px] h-[48px] px-2 border-2 rounded-xl lg:w-[300px]"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <select value={sortOrder} onChange={(e) => handleChangeSort(e)} className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[200px]">
                            <option value={""} disabled selected>Sort</option>
                            <option value="AZ"> A-Z </option>
                            <option value="ZA"> Z-A </option>
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
                                <th className="text-xl">Image</th>
                                <th className="text-xl">Name</th>
                                <th className="text-xl"></th>
                                <th className="text-xl"></th>
                                <th className="text-xl"></th>
                                <th className="text-xl"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {category && category.map((value, index) => {
                                return (
                                    <tr key={index} className="hover border hover:border-b-green-700 hover:border-b-4 pl-0">
                                        <td>
                                            <div className="relative pt-5 pb-3">
                                                <img className="object-fit rounded-full h-[70px] w-[70px]" src={process.env.REACT_APP_URL + `${value.image}`} />
                                                <div className="absolute left-0 right-0 top-0">
                                                    <input type="file" accept=".jpg, .jpeg, .png" ref={inputImage} hidden onChange={(event) => onSelectImages(event)} />
                                                    <div onClick={() => { inputImage.current.click(); onSelectId(value.id) }}>
                                                        <AiFillEdit className="rounded-full p-2 w-[30px] h-[30px] absolute top-3 left-0 z-1 bg-green-800 text-white hover:scale-105 ease-in duration-200" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <th className="text-lg">{value.name}</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button className="btn bg-yellow-300 border-4 border-green-800 hover:bg-yellow-300 hover:border-green-800"
                                                    onClick={() => {
                                                        setModal(true);
                                                        handleEditCategory(value.id);
                                                    }}>EDIT
                                                </button>
                                                <DeleteConfirmation
                                                    itemId={value.id}
                                                    onDelete={onGetCategory}
                                                    apiEndpoint="category/deletecategory"
                                                    text={""}
                                                    message={"Category Deleted"}
                                                    textOnButton={"Yes"}
                                                    button={<div className=" btn hover:bg-red-600 hover:border-black bg-red-600 border-black border-4 text-white w-full">
                                                        Delete
                                                    </div>} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {category.length == 0 ? <div className="alert alert-error flex justify-center w-full">
                        <span className="flex justify-center">Sorry Category is Unavailable</span>
                    </div> : null}
                </div>
                <div className="flex justify-center mt-4 mb-10">
                    <PaginationFixed
                        page={page}
                        maxPage={maxPages}
                        handlePageChange={handlePageChange}
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </div>
            <ModalEditCategory modal={modal} setModal={setModal} inputCat={inputCat} setInputCat={setInputCat} handleSaveCat={handleSaveCat} />
            <Footer />
        </div>
    )
}
export default UpdateProductsCategoryPage
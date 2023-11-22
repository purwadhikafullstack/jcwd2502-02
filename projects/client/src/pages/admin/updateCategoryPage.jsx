import CategoryCard from "../../components/categoryCard";
import NavbarAdmin from "../../components/navbarAdmin";
import Footer from "../../components/footer";
import React, { useEffect, useRef, useState } from "react";
import { api1 } from "../../api/api";
import debounce from 'lodash/debounce';
import ModalNewCategory from "../../components/modalNewCategory";
import ModalEditCategory from "../../components/modalEditCategory";
import { AiFillEdit } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import PaginationFixed from "../../components/paginationComponent";
import Searchbar from "../../components/searchBar";
import SortButton from "../../components/sortButton";
import { Link, useNavigate } from "react-router-dom";

const UpdateProductsCategoryPage = () => {
    const inputImage = useRef();
    const [category, setCategory] = useState([]);
    const [catId, setCatId] = useState("");
    const [inputCat, setInputCat] = useState("");
    const [modal, setModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("DESC");
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const api = api1();
    const pageTopRef = useRef(null);
    const navigate = useNavigate();

    const onGetCategory = async () => {
        try {
            const response = await api.get(`category/list?search=${searchQuery}&sort=${sortOrder}&page=${page}`);
            console.log(response);
            setCategory(response.data.data.categories);
            setMaxPages(response.data.data.maxPages);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditCategory = async (categoryId) => {
        try {
            setCatId(categoryId);
            const res = await api.get(`category/onecategory/${categoryId}`);
            setInputCat(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveCat = async () => {
        try {
            const res = await api.patch(`category/savecategory`, {
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
                const response = await api.patch(`category/editimage/${catId}`, formData);
                toast.success("Category Image Updated");
                onGetCategory();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const onDeleteCategory = async (catId) => {
        try {
            const deleteCategory = await api.patch(`category/deletecategory/${catId}`);
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
    }, [sortOrder, page]);


    useEffect(() => {
        const debouncedSearch = debounce(() => {
            onGetCategory();
        }, 1000);
        debouncedSearch();
    }, [searchQuery])
    return (
        <div ref={pageTopRef} className="">
            <Toaster />
            <NavbarAdmin />
            <div className="">
                <div className="flex flex-row mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32 ">
                    <div className="text-4xl font-bold gap-2 py-5 text-green-800">
                        Edit Category
                    </div>
                </div>
                <div className="grid place-content-center md:place-content-start md:ml-20 lg:ml-32">
                    <ModalNewCategory />
                </div>
                <div className="flex  justify-center gap-2 my-5 py-3 ">
                    <div className=" grid place-content-center">
                        <Searchbar placeholder={"Search Category"} value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
                    </div>
                    <div>
                        <SortButton
                            onChange={handleChangeSort}
                            value1={"DESC"}
                            value2={"ASC"}
                            value3={"AZ"}
                            value4={"ZA"}
                            className="border"
                        />
                    </div>
                    <div>
                        <button onClick={handleReset} className="grid place-content-center btn bg-yellow-300 hover:bg-yellow-300 rounded-full border-4 border-green-800 hover:border-green-800 text-green-900">Show All</button>
                    </div>
                </div>
                <div className="overflow-x-auto px-5 my-8 md:px-20 lg:px-32">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-xl">Image</th>
                                <th className="text-xl">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category && category.map((value, index) => {
                                return (
                                    <tr key={index} className="hover border hover:border-b-green-700 hover:border-b-4 pl-0">
                                        <td>
                                            <div className="relative pt-5">
                                                <CategoryCard image={value.image} style="w-[100px] h-[80px] hover:shadow-none hover:scale-100" />
                                                <div className="absolute left-0 right-0 top-0">
                                                    <input type="file" accept=".jpg, .jpeg, .png" ref={inputImage} hidden onChange={(event) => onSelectImages(event)} />
                                                    <div onClick={() => { inputImage.current.click(); onSelectId(value.id) }}>
                                                        <AiFillEdit className="text-3xl rounded-full p-2 w-[40px] h-[40px] absolute top-0 left-0 z-1 bg-green-800 text-white hover:scale-105 ease-in duration-200" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <th className="text-lg">{value.name}</th>
                                        <td>
                                            <button className="btn bg-yellow-300 border-4 border-green-800 hover:bg-yellow-300 hover:border-green-800"
                                                onClick={() => {
                                                    setModal(true);
                                                    handleEditCategory(value.id);
                                                }}>EDIT
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black"
                                                onClick={() => {
                                                    onDeleteCategory(value.id);
                                                }}>DELETE</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
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
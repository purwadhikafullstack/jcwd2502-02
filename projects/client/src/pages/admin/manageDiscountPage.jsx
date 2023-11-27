import PaginationFixed from "../../components/paginationComponent";
import Footer from "../../components/footer";
import NavbarAdmin from "../../components/navbarAdmin"
import React, { useEffect, useState, useRef } from "react";
import { api1 } from "../../api/api";
import { Link } from "react-router-dom";
import debounce from 'lodash/debounce';
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import ModalManageDiscount from "../../components/modalManageDiscount";
const ManageProductDiscountPage = () => {
    const [category, setCategory] = useState([]);
    const [catId, setCatId] = useState("");
    const [productId, setProductId] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productName, setProductName] = useState("");
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sort, setSort] = useState("ASC");
    const pageTopRef = useRef(null);
    const api = api1();
    const branchId = useSelector((state) => state.users.store_branch_id);
    const [isModalOpen, setModalOpen] = useState(false);
    const [discountId, setDiscountId] = useState(0);
    const [discountType, setDiscountType] = useState(null)
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [sortBy, setSortBy] = useState("id");
    const fetchData = async () => {
        try {
            const category = await api.get(`category/all`);
            setCategory(category.data.data);
            const discount = await api.get(`/products/discount`)
            console.log(discount.data.data);
            setDiscountType(discount.data.data)
            const response = await api.get(
                `/products/filtered?catId=${catId}&searchQuery=${searchQuery}&sort=${sort}&branchId=${branchId}&sortby=${sortBy}&page=${page}`
            );
            console.log(response.data);
            setMaxPage(response.data.maxPages);
            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        }
    }
    const handleOpenModal = (productId, discountId, productPrice, productName) => {
        setProductId(productId);
        setDiscountId(discountId);
        setProductPrice(productPrice)
        setProductName(productName)
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
        fetchData()
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
            console.log(event.target.value);
            if (event.target.value === "discount_id") {
                setSort("DESC")
                setSortBy(event.target.value);
            } else {
                setSortBy(event.target.value);
            }
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
            setCatId(event.target.value)
        } catch (error) {
            console.log(error);
        }
    }
    const handleReset = () => {
        try {
            setPage(1); handleSearchInputChange(""); setSort("ASC"); setSortBy("id"); setCatId("")
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [catId, sort, branchId, page, sortBy]);
    useEffect(() => {
        const debouncedSearch = debounce(() => {
            fetchData()
        }, 1000);
        debouncedSearch();
    }, [searchQuery])
    return (
        <div ref={pageTopRef} className="">
            <Toaster />
            <NavbarAdmin />
            <div className="mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32 ">
                <div className="md:flex md:justify-between mt-5 md:mt-10">
                    <div className="">
                        <div className="text-4xl font-bold text-green-800 mb-3 flex">
                            Manage Products Discount
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto mt-5 border-b-4 border-green-700 flex justify-between">
                    <div role="tablist" className="tabs tabs-lifted tabs-lg">
                        <Link to={`/updateproducts`}>
                            <div role="tab" className="tab lg:text-xl ">Products</div>
                        </Link>
                        <Link to={`/updatecategory`}>
                            <div role="tab" className="tab lg:text-xl">Category</div>
                        </Link>
                        <Link to={`/update-product-stocks`}>
                            <div role="tab" className="tab lg:text-xl">Stocks</div>
                        </Link>
                        <div role="tab" className="tab lg:text-xl tab-active bg-green-700 text-white rounded-t-xl">Discount</div>
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
                            <select defaultValue=""
                                value={sortBy} onChange={(e) => handleSortBy(e)}
                                className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[200px]">
                                <option value={"id"} disabled selected>Sort By</option>
                                <option value="updatedAt"> Last Edited </option>
                                <option value="name"> Name </option>
                                <option value="price"> Price </option>
                                <option value="discount_id"> Discounted </option>
                            </select>
                        </div>
                        <div className="">
                            <select defaultValue="" value={sort}
                                onChange={(e) => handleSort(e)}
                                className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[200px]">
                                <option value={""} disabled selected>Sort</option>
                                <option value="ASC"> Ascending </option>
                                <option value="DESC"> Descending </option>
                            </select>
                        </div>
                        <div className="">
                            <select defaultValue="" value={catId}
                                onChange={(e) => handleCat(e)}
                                className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[200px]">
                                <option value={""} disabled selected>Select Category</option>
                                {category ? category.map((value, index) => {
                                    return (
                                        <option value={value.id}> {value.name} </option>
                                    )
                                }) : null}
                            </select>
                        </div>
                        <div className="">
                            <div
                                onClick={handleReset}
                                className=" w-[70px] h-[48px] grid place-content-center text-lg lg:text-xl hover:underline  text-green-700 font-black">Reset</div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {products.length > 0 ? (
                            <table className="table border-b-2">
                                <thead>
                                    <tr>
                                        <th className="text-xl">Image</th>
                                        <th className="text-xl">Name</th>
                                        <th className="text-xl">Price</th>
                                        <th className="text-xl">Discount Type</th>
                                        <th className="text-xl">Discount Value</th>
                                        <th className="text-xl"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products ? products.map((value) => {
                                        return (
                                            <tr key={value.id} className="hover border hover:border-b-green-700 hover:border-b-4 pl-0">
                                                <td>
                                                    <div className="relative pt-5">
                                                        <img className="object-fit rounded-full h-[100px] w-[100px]" src={process.env.REACT_APP_URL + `${value.image}`} />
                                                    </div>
                                                </td>
                                                <th className="text-lg">{value.name}</th>
                                                <th className="text-lg">{value.price}</th>
                                                <th className="text-lg">{value.discount_id ? (
                                                    discountType.find((discount) => discount.id === value.discount_id)?.type || "Unknown Type"
                                                ) : (
                                                    "Normal Price"
                                                )}</th>
                                                <th className="text-lg">
                                                    {value.discount_id === 1 && (<>{value.discount_value} %</>)}
                                                    {value.discount_id === 2 && (<>Rp. {value.discount_value}</>)}
                                                    {value.discount_id === 3 && (<>Buy 1 Get 1</>)}
                                                    {value.discount_id !== 1 && value.discount_id !== 2 && value.discount_id !== 3 && (" - ")}
                                                </th>
                                                <th className="text-lg">
                                                    <button className="btn bg-yellow-300 border-4 border-green-800 hover:bg-yellow-300 hover:border-green-800" onClick={() => handleOpenModal(value.id, value.discount_id, value.price, value.name)}>Update Discount</button>
                                                </th>
                                            </tr>
                                        );
                                    }) : null}
                                </tbody>
                            </table>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className="pt-4 mb-10">
                <div className="text-xl flex justify-center items-center ">
                    <PaginationFixed
                        page={page}
                        maxPage={maxPage}
                        handlePageChange={handlePageChange}
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </div>
            <ModalManageDiscount
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                productId={productId}
                discountType={discountType}
                discountId={discountId}
                productPrice={productPrice}
                productName={productName}
            />
            <Footer />
        </div>
    )
}
export default ManageProductDiscountPage
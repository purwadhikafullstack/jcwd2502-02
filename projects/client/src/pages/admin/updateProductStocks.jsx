import NavbarAdmin from "../../components/navbarAdmin";
import Footer from "../../components/footer";
import React, { useEffect, useState, useRef } from "react";
import { api1 } from "../../api/api";
import { Link } from "react-router-dom";
import { useDebounce } from 'use-debounce';
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import ModalUpdateProductStock from "../../components/modalUpdateProductStock";
import ModalReduceProductStock from "../../components/modalReduceProductStock";
import PaginationFixed from "../../components/paginationComponent";
const UpdateProductStocksPage = () => {
    const [category, setCategory] = useState([]);
    const [catId, setCatId] = useState("");
    const [productId, setProductId] = useState("");
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sort, setSort] = useState("ASC");
    const pageTopRef = useRef(null);
    const api = api1();
    const branchId = useSelector((state) => state.users.store_branch_id);
    const [branchName, setBranchName] = useState("")
    const [isModalAddOpen, setModalAddOpen] = useState(false);
    const [isModalReduceOpen, setModalReduceOpen] = useState(false);
    const [currentStock, setCurrentStock] = useState(0);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [sortBy, setSortBy] = useState("id");
    const [debouncedSearch] = useDebounce(searchQuery, 1000);

    const fetchData = async () => {
        try {
            const branchAdmin = await api.get(`branch/one/${branchId}`);
            setBranchName(branchAdmin.data.data.name)
            const category = await api.get(`category/all`);
            setCategory(category.data.data);
            const response = await api.get(
                `/products/filtered?catId=${catId}&searchQuery=${searchQuery}&sort=${sort}&branchId=${branchId}&sortby=${sortBy}&page=${page}`
            );
            setMaxPage(response.data.maxPages);
            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        }
    }
    const handleOpenModalAdd = (productId, productStock) => {
        setProductId(productId);
        setCurrentStock(productStock);
        setModalAddOpen(true);
    };
    const handleOpenModalReduce = (productId, productStock) => {
        setProductId(productId);
        setCurrentStock(productStock);
        setModalReduceOpen(true);
    };
    const handleCloseAddModal = () => {
        setModalAddOpen(false);
    };
    const handleCloseReduceModal = () => {
        setModalReduceOpen(false);
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
    }, [catId, sort, branchId, page, sortBy, debouncedSearch]);

    return (
        <div ref={pageTopRef} className="">
            <Toaster />
            <NavbarAdmin />
            <div className="mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32 ">
                <div className="md:flex md:justify-between mt-5 md:mt-10">
                    <div className="">
                        <div className="text-4xl font-bold text-green-800 mb-3 flex">
                            Manage Products Stocks <div className="text-sm pl-3 grid place-content-end">({branchName})</div>
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
                        <div role="tab" className="tab lg:text-xl tab-active bg-green-700 text-white rounded-t-xl">Stocks</div>
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
                            <select defaultValue=""
                                value={sortBy} onChange={(e) => handleSortBy(e)}
                                className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[200px]">
                                <option value={"id"} disabled selected>Sort By</option>
                                <option value="updatedAt"> Last Edited </option>
                                <option value="name"> Name </option>
                                <option value="stock"> Stock </option>
                            </select>
                        </div>
                        <div className="">
                            <select defaultValue="" value={sort}
                                onChange={(e) => handleSort(e)}
                                className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[200px]">
                                <option value={""} disabled selected>Sort</option>
                                <option value="ASC"> Asc </option>
                                <option value="DESC"> Desc </option>
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
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-xl text-black">Image</th>
                                    <th className="text-xl text-black">Name</th>
                                    <th className="text-xl text-black">Stock</th>
                                    <th className="text-xl text-black"></th>
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
                                            <th className="text-lg">
                                                {value.product_stocks && value.product_stocks.length > 0
                                                    ? (value.product_stocks[0]?.stock === 0 ? "Out of Stock" : value.product_stocks[0]?.stock)
                                                    : "Stock not available"
                                                }
                                            </th>
                                            <th className="text-lg">
                                                <button className="btn bg-yellow-300 border-4 border-green-800 hover:bg-yellow-300 hover:border-green-800" onClick={() => handleOpenModalAdd(value.id, value.product_stocks[0]?.stock)}>Add Stock</button>
                                            </th>
                                            <th className="text-lg">
                                                <button className="btn text-white bg-red-600 border-4 border-black hover:bg-red-300 hover:border-black" onClick={() => handleOpenModalReduce(value.id, value.product_stocks[0]?.stock)}>Reduce Stock</button>
                                            </th>
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
            <div className="pt-4 mb-10">
                <div className="flex justify-center mt-4 mb-10">
                    <PaginationFixed
                        page={page}
                        maxPage={maxPage}
                        handlePageChange={handlePageChange}
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </div>
            <ModalReduceProductStock
                isOpen={isModalReduceOpen}
                onClose={handleCloseReduceModal}
                productId={productId}
                branchId={branchId}
                onStockUpdated={fetchData}
                currentStock={currentStock}
            />
            <ModalUpdateProductStock
                isOpen={isModalAddOpen}
                onClose={handleCloseAddModal}
                productId={productId}
                branchId={branchId}
                onStockUpdated={fetchData}
                currentStock={currentStock}
            />
            <Footer />
        </div>
    )
}
export default UpdateProductStocksPage
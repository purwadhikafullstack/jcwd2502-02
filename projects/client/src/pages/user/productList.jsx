import CategoryCard from "../../components/categoryCard"
import ProductCard from "../../components/productCard";
import Navbar from "../../components/navbarUser";
import Footer from "../../components/footer";
import React, { useEffect, useState } from "react";
import { api1 } from "../../api/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import debounce from 'lodash/debounce';
import { useSelector } from "react-redux";
import PaginationFixed from "../../components/paginationComponent";
import toast, { Toaster } from "react-hot-toast";
import { BiSearchAlt } from "react-icons/bi";
import { useDebounce } from 'use-debounce';

const ProductListPage = () => {
    const [category, setCategory] = useState([]);
    const [discount, setDiscount] = useState("");
    const [catId, setCatId] = useState("");
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sort, setSort] = useState("ASC");
    const api = api1();
    const closestBranch = useSelector((state) => state.branch.closestBranch);
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("category")
    const searchProduct = new URLSearchParams(search).get("search")
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [maxPage, setMaxPage] = useState(1);
    const [debouncedSearch] = useDebounce(searchQuery, 1000);


    const handleReset = () => {
        try {
            setPage(1)
            setSearchQuery("")
            setSort("ASC")
            setDiscount("")
            onGetFilteredProducts()
            navigate(`/products?category=`, { replace: true });
        } catch (error) {
            console.log(error);
        }
    }
    const onGetCategory = async () => {
        try {
            const category = await api.get(`category/all`);
            setCategory(category.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSearch = (event) => {
        try {
            setPage(1);
            setSearchQuery(event);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDiscount = (event) => {
        try {
            setPage(1);
            setDiscount(event)
        } catch (error) {
            console.log(error);
        }
    }
    const onGetFilteredProducts = async () => {
        try {
            if (closestBranch.id === undefined) {
                const response = await api.get(
                    `/products/allproductsfix?catId=${id}&searchQuery=${searchQuery}&sort=${sort}&branchId=&page=${page}&discount=${discount}`
                )
                setMaxPage(response.data.maxPages)
                setProducts(response.data.products);
            } else {
                const response = await api.get(
                    `/products/allproductsfix?catId=${id}&searchQuery=${searchQuery}&sort=${sort}&branchId=${closestBranch.id}&page=${page}&discount=${discount}`
                )
                setMaxPage(response.data.maxPages)
                setProducts(response.data.products);
            }
        } catch (error) {
            console.error("Error fetching filtered products:", error);
        }
    };
    const onFilterCat = async (id) => {
        try {
            setPage(1);
            setCatId(id);
        } catch (error) {
            console.log(error);
        }
    };
    const handleChange = (event) => {
        try {
            setPage(1);
            setSort(event.target.value);
        } catch (error) {
            console.log(error);
        }
    };
    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= maxPage) {
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
    useEffect(() => {
        window.scrollTo(0, 0);
        if (searchProduct && searchProduct !== searchQuery) {
            setSearchQuery(searchProduct);
        }
        onGetCategory();
        onGetFilteredProducts();
    }, [catId, sort, closestBranch, page, id, searchProduct, discount, debouncedSearch]);

    return (
        <div className="">
            <Toaster />
            <Navbar />
            <div className="mt-[70px] pt-3">
                <div className="h-[160px] mt-10 lg:pt-5 pt-3 px-5 lg:h-[190px] lg:py-5 overflow-x-auto  m-5 md:mx-24 lg:mx-44 lg:gap-5 flex shadow-xl rounded-3xl border-l-8 border-r-8 border-r-green-600  border-yellow-300 hide-scrollbar">
                    {category.map((value, index) => {
                        return (
                            <div key={index}>
                                <Link to={`/products?category=${value.id}`}>
                                    <CategoryCard onClick={() => onFilterCat(value.id)} name={value.name} image={value.image} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="mx-5 md:mx-24 lg:mx-40 my-10">
                <div className="gap-2 my-5 py-3 px-5 lg:gap-3  lg:flex">

                    <div className=" w-full mb-3 lg:mb-0">
                        <div className="border-2 flex rounded-xl bg-white h-[48px] ">
                            <div className="flex items-center pl-2 text-green-800"><BiSearchAlt /></div>
                            <input value={searchQuery} type="text" onChange={(e) => handleSearch(e.target.value)} className="lg:grid lg:place-content-center outline-none rounded-full w-full text-lg pl-2" placeholder=" Search Product" />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="grid place-content-center">
                            <select defaultValue="" value={sort} onChange={(e) => handleChange(e)} className="w-[100px] h-[48px] px-2 border-2 rounded-xl lg:w-[80px]">
                                <option value={""} disabled selected>Sort</option>
                                <option value="ASC"> A-Z </option>
                                <option value="DESC"> Z-A </option>
                            </select>
                        </div>
                        <div className="grid place-content-center">
                            <select defaultValue="" value={discount} onChange={(e) => handleDiscount(e.target.value)} className="w-[100px] h-[48px] px-2 border-2 rounded-xl lg:w-[80px]">
                                <option value={""} disabled selected>Sort</option>
                                <option value="diskon"> Discounted Products </option>
                                <option value="bogo"> Buy 1 Get 1 Free </option>
                            </select>
                        </div>
                        <div>
                            <button onClick={handleReset} className="grid place-content-center btn bg-yellow-300 hover:bg-yellow-300 rounded-full border-4 border-green-800 hover:border-green-800 text-green-900">Show All Products</button>
                        </div>

                    </div>

                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-auto place-items-center">
                    {products && products.length ? products.map((value, index) => {
                        return (
                            <a key={index}>
                                <div className="">
                                    <ProductCard
                                        name={value.name}
                                        image={value.image}
                                        description={value.description}
                                        price={value.price}
                                        final_price={value.final_price}
                                        discount_id={value.discount_id}
                                        stock={value.product_stocks ? value.product_stocks : "empty"}
                                        data={value.id}
                                    />
                                </div>
                            </a>
                        )
                    }) : null}
                </div>
                {products && !products.length ? <div role="alert" className="alert alert-error w-full ">
                    <span className="">Sorry, the product that you are looking for is not available.</span>
                </div> : null}
            </div>
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
export default ProductListPage
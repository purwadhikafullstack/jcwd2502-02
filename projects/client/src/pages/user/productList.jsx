import CategoryCard from "../../components/categoryCard"
import Searchbar from "../../components/searchBar";
import SortButton from "../../components/sortButton";
import ProductCard from "../../components/productCard";
import Pagination from "../../components/pagination";
import Navbar from "../../components/navbarUser";
import Footer from "../../components/footer";
import React, { useEffect, useState } from "react";
import { api1 } from "../../api/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import debounce from 'lodash/debounce';
import { useSelector } from "react-redux";
import PaginationFixed from "../../components/paginationComponent";
import toast, { Toaster } from "react-hot-toast";


const ProductListPage = () => {
    const [category, setCategory] = useState([]);
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
    const debouncedSearch = debounce((value) => {
        setPage(1)
        setSearchQuery(value);
    }, 1000);
    const handleReset = () => {
        try {
            setPage(1)
            setSearchQuery("")
            setSort("ASC")
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
    const onGetFilteredProducts = async () => {
        try {
            if (closestBranch.id === undefined) {
                const response = await api.get(
                    `/products/allproductsfix?catId=${id}&searchQuery=${searchQuery}&sort=${sort}&branchId=&page=${page}`

                )
                console.log(response);
                setMaxPage(response.data.maxPages)
                setProducts(response.data.products);
            } else {
                const response = await api.get(
                    `/products/allproductsfix?catId=${id}&searchQuery=${searchQuery}&sort=${sort}&branchId=${closestBranch.id}&page=${page}`
                )
                console.log(response);
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
        if (searchProduct && searchProduct !== searchQuery) {
            setSearchQuery(searchProduct);
        }
        onGetCategory();
        onGetFilteredProducts();
    }, [catId, searchQuery, sort, closestBranch, page, id, searchProduct]);

    return (
        <div className="">
            <Toaster />
            <Navbar />
            <div className="mt-[70px] pt-3">
                <div className="h-[190px] mt-10 px-5 lg:h-[190px] lg:py-5 overflow-x-auto m-5 md:mx-24 lg:mx-40 gap-5 flex shadow-xl rounded-3xl border-l-8 border-r-8 border-r-green-600 border-yellow-300">
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
                <div className="flex  justify-center gap-2 my-5 py-3 ">
                    <div className=" grid place-content-center">
                        <Searchbar value={searchQuery} onChange={(e) => debouncedSearch(e.target.value)} />
                    </div>
                    <div>
                        <SortButton
                            onChange={handleChange}
                            value1={"ASC"}
                            value2={"DESC"}
                            className="border"
                        />
                    </div>
                    <div>
                        <button onClick={handleReset} className="grid place-content-center btn bg-yellow-300 hover:bg-yellow-300 rounded-full border-4 border-green-800 hover:border-green-800 text-green-900">Show All Products</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-auto place-items-center">
                    {products ? products.map((value, index) => (
                        <a key={index}>
                            <div>
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
                    )) : null}
                </div>
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
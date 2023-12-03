import CategoryCard from "../../components/categoryCard"
import Searchbar from "../../components/searchBar";
import SortButton from "../../components/sortButton";
import ProductCard from "../../components/productCard";
import Pagination from "../../components/pagination";
import Navbar from "../../components/navbarUser";
import Footer from "../../components/footer";
import React, { useEffect, useState } from "react";
import { api1 } from "../../api/api";
import { Link, useLocation } from "react-router-dom";
import debounce from 'lodash/debounce';
import { useSelector } from "react-redux";

const ProductListAdminPage = () => {
    const [category, setCategory] = useState([]);
    const [catId, setCatId] = useState("");
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sort, setSort] = useState("ASC");
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostsPerPage] = useState(8);
    const [stock, setStock] = useState()
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = products?.slice(firstPostIndex, lastPostIndex);
    const api = api1();
    const closestBranch = useSelector((state) => state.branch.closestBranch);
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("category")
    const debouncedSearch = debounce((value) => {
        setSearchQuery(value);
    }, 1000);
    const nearestBranch = async () => {
        try {
            const branch = await api.get(`/branch/nearest/${closestBranch.id}`)
            setStock(branch.data.data)
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
            nearestBranch()
            const response = await api.get(
                `/products/filtered?catId=${id}&searchQuery=${searchQuery}&sort=${sort}&branchId=${closestBranch.id}`

            );
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching filtered products:", error);
        }
    };
    const onFilterCat = async (id) => {
        try {
            setCurrentPage(1);
            setCatId(id);
        } catch (error) {
            console.log(error);
        }
    };
    const handleChange = (event) => {
        try {
            setSort(event.target.value);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        onGetCategory();
        onGetFilteredProducts();
        nearestBranch()
    }, [catId, searchQuery, sort, closestBranch]);
    return (
        <div className="">
            <Navbar />
            <div className="mt-[50px] pt-3">
                <div className="h-[190px] mt-10 px-5 lg:h-[190px] lg:py-5 overflow-x-auto m-5 gap-5 flex shadow-xl rounded-3xl border-l-8 border-r-8 border-r-green-600 border-yellow-300">
                    {category.map((value, index) => {
                        return (
                            <div key={index}>
                                <Link to={`/all-product-list?category=${value.id}`}>
                                    <CategoryCard onClick={() => onFilterCat(value.id)} name={value.name} image={value.image} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="mx-5 ">
                <div className="flex justify-center gap-2 my-5 py-3 ">
                    <div className="grid place-content-center">
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
                        <Link to={`/all-product-list?category=`}>
                            <button className="grid place-content-center btn bg-yellow-300 hover:bg-yellow-300 rounded-full border-4 border-green-800 hover:border-green-800 text-green-900" onClick={() => setCatId("")}>Show All Products</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={`/update-product-stocks?category=`}>
                            <button className="grid place-content-center btn bg-yellow-300 hover:bg-yellow-300 rounded-full border-4 border-green-800 hover:border-green-800 text-green-900" >Update Products Stock</button>
                        </Link>
                    </div>
                </div>
                <div className="overflow-x-auto px-5 my-8  ">
                    <table className="table border-b-2">
                        <thead>
                            <tr>
                                <th className="text-xl">Image</th>
                                <th className="text-xl">Name</th>
                                <th className="text-xl">Price</th>
                                <th className="text-xl">Description</th>
                                <th className="text-xl">Weight (gr)</th>
                                <th className="text-xl">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((value) => {
                                return (
                                    <tr key={value.id} className="hover border hover:border-b-green-700 hover:border-b-4 pl-0">
                                        <td>
                                            <div className="relative pt-5">
                                                <img className="object-fit rounded-full h-[100px] w-[100px]" src={process.env.REACT_APP_URL + `${value.image}`} />
                                            </div>
                                        </td>
                                        <th className="text-lg">{value.name}</th>
                                        <th className="text-lg">{value.price}</th>
                                        <th className="text-lg">{value.description}</th>
                                        <th className="text-lg">{value.weight}</th>
                                        <th className="text-lg">{(value.product_stocks[0].stock === 0) ? "Out of Stock" : value.product_stocks[0].stock}</th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="pt-4 mb-10">
                <div className="text-xl flex justify-center items-center ">
                </div>
                <Pagination
                    totalPost={products.length}
                    postsPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
            <Footer />
        </div>
    )
}
export default ProductListAdminPage
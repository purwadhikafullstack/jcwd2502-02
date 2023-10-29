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

const ProductListPage = () => {
    const [category, setCategory] = useState([]);
    const [catId, setCatId] = useState("");
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sort, setSort] = useState("ASC");
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostsPerPage] = useState(8);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = products?.slice(firstPostIndex, lastPostIndex);
    const api = api1();
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("category")
    const debouncedSearch = debounce((value) => {
        // console.log(value);
        setSearchQuery(value);
    }, 1000);
    const onGetCategory = async () => {
        try {
            const category = await api.get(`/products/category`);
            setCategory(category.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const onGetFilteredProducts = async () => {
        try {
            const response = await api.get(
                `/products/filtered?catId=${id}&searchQuery=${searchQuery}&sort=${sort}`
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
    }, [catId, searchQuery, sort]);
    return (
        <div className="">
            <Navbar />
            <div className="mt-[70px] pt-3">
                <div className="h-[190px] pt-5 px-5 lg:h-[190px] lg:py-5 overflow-x-auto m-5 md:mx-24 lg:mx-40 gap-5 flex bg-gradient-to-b from-yellow-200 to-green-200 rounded-3xl">
                    {/* <Link to={`/products?category=`}>
                        <CategoryCard name={"Show All"} image={`public/showall.jpg`} onClick={() => onFilterCat("")} />
                    </Link> */}
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
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-auto place-items-center">
                    {currentPosts.map((value, index) => {
                        return (
                            <div key={index}>
                                <ProductCard
                                    name={value.name}
                                    image={value.image}
                                    description={value.description}
                                    price={value.price}
                                />
                            </div>
                        );
                    })}
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
export default ProductListPage
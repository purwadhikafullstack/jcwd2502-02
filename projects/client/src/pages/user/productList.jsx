import CategoryCard from "../../components/categoryCard"
import Searchbar from "../../components/searchBar";
import Button from "../../components/button";
import SortButton from "../../components/sortButton";
import ProductCard from "../../components/productCard";
import Pagination from "../../components/pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
    const currentPosts = products.slice(firstPostIndex, lastPostIndex);

    const onGetCategory = async () => {
        try {
            const category = await axios.get(`http://localhost:8905/api/products/category`);
            console.log(category.data.data);
            setCategory(category.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onGetFilteredProducts = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8905/api/products/filtered?catId=${catId}&searchQuery=${searchQuery}&sort=${sort}`
            );
            console.log(response.data.data);
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
            <div className="mt-[70px]">
                <div className="h-[130px] lg:h-[180px] lg:py-5 overflow-x-auto m-5 md:mx-24 lg:mx-40 gap-5 flex w-auto lg:justify-center">
                    <CategoryCard name={"Show All"} image={"ALL"} onClick={() => onFilterCat("")} />
                    {category.map((value, index) => {
                        return (
                            <CategoryCard onClick={() => onFilterCat(value.id)} name={value.name} image={value.image} />
                        )
                    })}
                </div>
            </div>

            <div>
                <Searchbar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <Button
                    style={`btn bg-green-400 hover:bg-green-600 text-white `}
                    text={"Reset"}
                    onClick={() => setSearchQuery("")}
                />
            </div>
            <div>
                <SortButton
                    onChange={handleChange}
                    value1={"ASC"}
                    value2={"DESC"}
                    className="border"
                />
            </div>
            <div className="grid grid-cols-4 gap-5 p-5 h-[500px] overflow-auto w-full">
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
            <div className="pt-4 border border-t-green-600">
                <div className="text-xl flex justify-center items-center ">
                    {currentPosts.length} Product(s)
                </div>
                <Pagination
                    totalPost={products.length}
                    postsPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
}

export default ProductListPage
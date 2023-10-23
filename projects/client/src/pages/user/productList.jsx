import CategoryCard from "../../components/categoryCard"
import Searchbar from "../../components/searchBar";
import Button from "../../components/button";
import SortButton from "../../components/sortButton";
import ProductCard from "../../components/productCard";
import Pagination from "../../components/pagination";
import Navbar from "../../components/navbarUser";
import Footer from "../../components/footer";
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

            <Navbar />

            <div className="mt-[70px] pt-3">
                <div className=" lg:h-[180px] lg:py-5 pt-5 px-2 overflow-x-auto m-5 md:mx-24 lg:mx-40 gap-5 flex w-auto lg:mt-10 ">
                    <CategoryCard name={"Show All"} image={`public/showall.jpg`} onClick={() => onFilterCat("")} />
                    {category.map((value, index) => {
                        return (
                            <CategoryCard onClick={() => onFilterCat(value.id)} name={value.name} image={value.image} />
                        )
                    })}
                </div>
            </div>


            <div className="mx-5 md:mx-24 lg:mx-40 my-10">

                <div className="flex  justify-center gap-2 my-5 py-3 ">
                    <div className=" grid place-content-center">
                        <Searchbar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    {/* <div>
                        <Button
                            style={` `}
                            text={"Reset"}
                            onClick={() => setSearchQuery("")} />
                    </div> */}
                    <div>
                        <SortButton
                            onChange={handleChange}
                            value1={"ASC"}
                            value2={"DESC"}
                            className="border"
                        />
                    </div>
                </div>


                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 overflow-auto place-items-center">
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
                    {/* {currentPosts.length} Product(s) */}
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
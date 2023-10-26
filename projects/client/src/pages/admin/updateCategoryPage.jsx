import CategoryCard from "../../components/categoryCard";
import Navbar from "../../components/navbarUser";
import Footer from "../../components/footer";
import React, { useEffect, useState } from "react";
import { api1 } from "../../api/api";
import { Link, useLocation } from "react-router-dom";
import debounce from 'lodash/debounce';
import ModalNewCategory from "../../components/modalNewCategory";

const UpdateProductsCategoryPage = () => {
    const [category, setCategory] = useState([]);
    const api = api1();
    const debouncedSubmit = debounce((value) => {

    }, 1000);
    const onGetCategory = async () => {
        try {
            const category = await api.get(`/products/category`);
            setCategory(category.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        onGetCategory();
    }, []);
    return (
        <div className="">
            <Navbar />
            <div className="">
                <div className="mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32 ">
                    <div className="flex text-4xl font-bold gap-2 py-5">
                        Edit Category
                    </div>
                </div>
                <div className="mt-5 pt-3 px-2 overflow-x-auto m-5 md:mx-24 lg:mx-40 gap-5 flex flex-wrap lg:flex-nowrap w-auto">
                    <ModalNewCategory />
                    {category.map((value, index) => {
                        return (
                            <div key={index} className="w-full md:w-1/2 lg:w-1/4">
                                <Link to={`/products?category=${value.id}`}>
                                    <CategoryCard name={value.name} image={value.image} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>


        </div>
    )

}
export default UpdateProductsCategoryPage
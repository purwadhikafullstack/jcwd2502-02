import Navbar from "../../components/navbarUser";
import Footer from "../../components/footer";
import React, { useEffect, useState } from "react";
import { api1 } from "../../api/api";
import { Link, useLocation } from "react-router-dom";
import debounce from 'lodash/debounce';
import { useParams } from "react-router-dom";
import Button from "../../components/button";

const BranchProductDetailPage = () => {
    const [product, setProduct] = useState([]);
    const api = api1();
    const { id } = useParams()
    const onGetProduct = async () => {
        try {
            const oneProduct = await api.get(`/products/detail/${id}`);
            console.log(oneProduct);
            setProduct(oneProduct.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        onGetProduct();
    }, [id]);
    return (
        <div className="">
            <Navbar />
            <div className="mt-[70px] pt-3">
                <div className='w-auto px-3 py-3'>
                    <img className="px-3 py-3 rounded-xl shadow-xl md:h-[500px] lg:h-[300px]" src={process.env.REACT_APP_URL + `${product?.image?.substring(7)}`} alt={"image of" + `${product.name}`} />
                </div>
                <div className="font-semibold truncate text-2xl px-5 pt-2 h-[50px] overflow-auto">
                    {product.name}
                </div>
                <div className="font-semibold truncate text-xl px-5 pt-2 text-green-500">
                    RP. {product?.price?.toLocaleString()}
                </div>
                <div className="font-semibold truncate text-lg px-5 pt-2 pb-5">
                    {product.description}
                </div>
                <div className="flex justify-center mt-5 mb-5">
                    <Link to={`/products?category=`}>
                        <Button style={"lg:w-[200px] rounded-full"} text={"Back to Product List"} />
                    </Link>
                </div>
                {/* <div className="flex justify-center pt-2 w-full">
                    <div className="flex items-center gap-5 lg:gap-5">
                        <Button style={"lg:w-[50px] w-[20px] text-xl rounded-full"} text="-" />
                        <div className="text-xl border-b-2 border-green-800 p-2"></div>
                        <Button style={"lg:w-[50px] w-[20px] text-xl rounded-full"} text="+" />
                    </div>
                </div>
                <div className="flex justify-center mt-5 mb-5">
                    <Button style={"lg:w-[200px] rounded-full"} text={"Add to Cart"} />
                </div> */}
            </div>
            <Footer />
        </div>
    )
}
export default BranchProductDetailPage
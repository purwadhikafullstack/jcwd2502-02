import Navbar from "../../components/navbarUser";
import Footer from "../../components/footer";
import React, { useEffect, useState } from "react";
import { api1 } from "../../api/api";
import { Link, useLocation } from "react-router-dom";
import debounce from 'lodash/debounce';
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../../redux/Features/cart";
import { deleteItemInCartAsync } from "../../redux/Features/cart";
import { Navigate, useNavigate } from "react-router-dom";
import { nearestBranch } from "../../redux/Features/branch";
import toast, { Toaster } from "react-hot-toast";

const ProductDetailPage = () => {
    const dispatch = useDispatch()
    const [product, setProduct] = useState([]);
    const api = api1();
    const { id } = useParams()
    const closestBranch = useSelector((state) => state.branch.closestBranch);
    console.log(closestBranch.id);
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.users);
    const isInCart = cart.cart.some(item => item.products_id == id);
    const navigate = useNavigate()

    const getProductQuantity = () => {
        const productInCart = cart.cart.find(item => item.products_id == id);
        return productInCart ? productInCart.quantity : 0;
    };
    const handleAddToCart = () => {
        if (!user.username) {
            toast.error("Please log in to add items to your cart");
            setTimeout(() => {
                navigate("/login"); // Step 4
            }, 2000);
            return
        }

        if (user.username) {
            dispatch(addToCartAsync(id, closestBranch.id));

        }
    };
    const onGetProduct = async () => {
        try {
            const oneProduct = await api.get(`products/product-stock?productId=${id}&branchId=${closestBranch.id}`);
            console.log(oneProduct);
            setProduct(oneProduct.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        dispatch(nearestBranch())
    }, [dispatch]);
    useEffect(() => {
        if (closestBranch) {
            onGetProduct();
        }
    }, [id, closestBranch]);
    return (
        <div className="">
            <Toaster />
            <Navbar />
            <div className="mt-[70px] pt-3">
                <div className='w-auto px-3 py-3'>
                    <img className="px-3 py-3 rounded-xl shadow-xl md:h-[500px] lg:h-[300px]" src={product && product.product ? process.env.REACT_APP_URL + product.product.image : null} alt={"image of" + (product && product.product ? product.product.name : "")} />

                </div>
                <div className="font-semibold truncate text-2xl px-5 pt-2 h-[50px] overflow-auto">
                    {product && product.product ? product.product.name : null}                </div>
                <div className="font-semibold truncate text-xl px-5 pt-2 text-green-500">
                    Rp {product && product.product ? product?.product.price?.toLocaleString() : null}
                </div>
                <div className="font-semibold truncate text-lg px-5 pt-2 pb-5">
                    {product && product.product ? product.product.description : null}
                </div>
                <div className="flex justify-center mt-5 mb-5">
                    <Link to={`/products?category=`}>
                        <Button style={"lg:w-[200px] rounded-full"} text={"Back to Product List"} />
                    </Link>
                </div>
                <div className="flex justify-center pt-2 w-full">
                    {isInCart ? (
                        <div className="flex items-center gap-2 lg:gap-5">
                            <Button style={"lg:w-[50px] w-[20px] text-xl rounded-full"} text="-" onClick={() => dispatch(deleteItemInCartAsync(id))} />
                            <div className="text-xl border-b-2 border-green-800 p-2">{getProductQuantity()}</div>
                            <Button style={"lg:w-[50px] w-[20px] text-xl rounded-full"} text="+" onClick={() => handleAddToCart()} />
                        </div>
                    ) : (
                        <Button style={"lg:w-[200px] rounded-full"} text={"Add to Cart"} onClick={() => handleAddToCart()} />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default ProductDetailPage
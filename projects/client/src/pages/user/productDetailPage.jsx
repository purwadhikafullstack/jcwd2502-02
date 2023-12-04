import Navbar from "../../components/navbarUser";
import Footer from "../../components/footer";
import React, { useEffect, useState } from "react";
import { api1 } from "../../api/api";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../../redux/Features/cart";
import { deleteItemInCartAsync } from "../../redux/Features/cart";
import { Navigate, useNavigate } from "react-router-dom";
import { nearestBranch } from "../../redux/Features/branch";
import toast, { Toaster } from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";

const ProductDetailPage = () => {
    const dispatch = useDispatch()
    const [product, setProduct] = useState([]);
    const api = api1();
    const { id } = useParams()
    const closestBranch = useSelector((state) => state.branch.closestBranch);
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.users);
    const isInCart = cart.cart.some(item => item.products_id == id);
    const navigate = useNavigate()
    const productStock = Array.isArray(product?.stock) ? product.stock[0]?.stock : product?.stock;
    const isProductInStock = productStock !== null && productStock !== undefined && productStock !== '' && productStock !== 0;
    const userStatus = user.isVerified
    const mainAddress = useSelector((state) => state.branch.mainAddress)
    const getProductQuantity = () => {
        const productInCart = cart.cart.find(item => item.products_id == id);
        return productInCart ? productInCart.quantity : 0;
    };
    const handleAddToCart = () => {
        if (user.username) {
            dispatch(addToCartAsync(id, closestBranch.id, userStatus));
        }
        else if (!user.username) {
            toast.error("Please log in to add items to your cart");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
            return
        }
    };
    const onGetProduct = async () => {
        try {
            if (closestBranch.id === undefined) {
                const oneProduct = await api.get(`products/oneproduct/${id}`);
                setProduct(oneProduct.data.data);
            } else {
                const oneProduct = await api.get(`products/product-stock?productId=${id}&branchId=${closestBranch.id}`);
                setProduct(oneProduct.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const altAddToCart = () => {
        try {
            if (userStatus === "unverified") {
                toast.error("Please verify your account before adding products to the cart.");
                setTimeout(() => {
                    navigate(`/profile`)
                }, 1500)
            }
            else if (userStatus === "verified") {
                toast.error("Please add a main address before adding products to the cart.");
                setTimeout(() => {
                    navigate(`/manage-address`)
                }, 1500)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
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
            <div className="mt-[70px] pt-3 md:mx-20 lg:mx-32 mx-5 mb-10">
                <div className="flex text-xl lg:text-2xl font-bold pb-5">
                    <div className="grid place-content-center "><IoIosArrowBack />
                    </div>
                    <Link to={'/products?category='}>
                        <div className="hover:underline"> Product List</div>
                    </Link>
                </div>
                <div className="flex flex-col lg:flex-row mb-10 gap-5 lg:gap-10">
                    <div className='lg:w-[450px] lg:h-[400px]'>
                        <img className="w-full h-full object-cover"
                            src={product && product.product ? process.env.REACT_APP_URL + product.product.image : process.env.REACT_APP_URL + product.image} alt={"image of" + (product && product.product ? product.product.name : "")} />
                    </div>
                    <div className="flex flex-col justify-between gap-3 lg:h-[400px]">
                        <div className="">
                            <div className="font-semibold text-4xl lg:text-5xl w-full mb-2">
                                {product && product.product ? product.product.name : product.name
                                }
                            </div>
                            <div className="font-normal text-gray-400 w-full pb-2">
                                {product && product.product ? product.product.weight : product.weight} gr
                            </div>
                        </div>
                        {product && product?.product?.discount_id === 3 || product?.discount_id === 3 ?
                            <div className="bg-gradient-to-r from-yellow-300 to-green-600 p-2 text-white font-bold rounded-xl w-[150px] grid place-content-center">Buy 1 Get 1 Free</div>
                            : null
                        }
                        <div className="font-semibold text-3xl pt-2 text-green-500 flex">
                            Rp {product && product.product ? (product.product.final_price ? product.product.final_price.toLocaleString() : null) : product.final_price?.toLocaleString()}
                            {product && product?.product?.discount_id === 1 || product && product?.product?.discount_id === 2 || product?.discount_id === 1 || product && product?.discount_id === 2 ? <div className="text-red-600 line-through font-semibold text-3xl pl-3">Rp {product?.product?.price ? product?.product?.price.toLocaleString() : null} {product?.price ? product?.price.toLocaleString() : null} </div> :
                                null}
                        </div>
                        <div>
                            <div className="text-lg text-gray-600 pt-2 pb-3 lg:w-[550px]">
                                {product && product.product ? product.product.description : product.description}
                            </div>
                            {closestBranch.id === undefined ? null : <div className="font-bold">Stock(s): {product ? product?.stock : null}</div>}
                        </div>
                        <div className="flex justify-center lg:justify-start pt-2 w-full">
                            {user.role === "customer" ?
                                <>
                                    {isProductInStock ? (
                                        isInCart ? (
                                            <div className="flex items-center gap-2 lg:gap-5">
                                                <Button style={"lg:w-[50px] w-[20px] text-xl rounded-full"} text="-" onClick={() => dispatch(deleteItemInCartAsync(id))} />
                                                <div className="text-xl border-b-2 border-green-800 p-2">{getProductQuantity()}</div>
                                                <Button style={"lg:w-[50px] w-[20px] text-xl rounded-full"} text="+" onClick={() => handleAddToCart()} />
                                            </div>
                                        ) : (
                                            <div>
                                                {mainAddress ? <Button style={"lg:w-[200px] rounded-full"} text={"Add to Cart"} onClick={() => handleAddToCart()} /> :
                                                    <Button onClick={() => altAddToCart()} style={"lg:w-[200px] rounded-full"} text={"Add to Cart"} />}
                                            </div>
                                        )
                                    ) : (
                                        <div className="text-black">Out of Stock</div>
                                    )}
                                </>
                                : <Button onClick={() => handleAddToCart()} style={"lg:w-[200px] rounded-full"} text={"Add to Cart"} />}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default ProductDetailPage
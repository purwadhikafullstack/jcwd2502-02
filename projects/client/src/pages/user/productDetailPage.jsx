import Navbar from "../../components/navbarUser";
import Footer from "../../components/footer";
import React, { useEffect, useState } from "react";
import { api1 } from "../../api/api";
import { Link, useLocation } from "react-router-dom";
import debounce from 'lodash/debounce';
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
// import { addToCartAsync } from "../redux/Features/cart";
// import { deleteItemInCartAsync } from "../redux/Features/cart";
// import { Navigate, useNavigate } from "react-router-dom";


const ProductDetailPage = () => {
    const [product, setProduct] = useState([]);
    const api = api1();
    const { id } = useParams()
    // const dispatch = useDispatch();
    // const cart = useSelector((state) => state.cart);
    // const user = useSelector((state) => state.users);
    // const isInCart = cart.cart.some(item => item.products_id === props.data);
    // const navigate = useNavigate()

    // const getAvailableStock = () => {
    //     return props.stock;
    // };
    // const getProductQuantity = () => {
    //     const productInCart = cart.cart.find(item => item.products_id === props.data);
    //     return productInCart ? productInCart.quantity : 0;
    // };
    // const handleAddToCart = () => {
    //     const availableStock = getAvailableStock();
    //     const productQuantityInCart = getProductQuantity();

    //     if (!user.username) {
    //         toast.error("Please log in to add items to your cart");
    //         setTimeout(() => {
    //             navigate("/login"); // Step 4
    //         }, 2000);
    //         return
    //     }

    //     if (productQuantityInCart < availableStock) {
    //         dispatch(addToCartAsync(props.data));
    //     } else {
    //         toast.error("Oops, stock limit reached. No more items can be added");
    //     }
    // };
    const onGetProduct = async () => {
        try {
            const oneProduct = await api.get(`products/oneproduct/${id}`);
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
                    <img className="px-3 py-3 rounded-xl shadow-xl md:h-[500px] lg:h-[300px]" src={process.env.REACT_APP_URL + `${product?.image}`} alt={"image of" + `${product.name}`} />
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
                    {isInCart ? (
                        <div className="flex items-center gap-2 lg:gap-5">
                            <Button style={"lg:w-[50px] w-[20px] text-xl rounded-full"} text="-" onClick={() => dispatch(deleteItemInCartAsync(props.data))} />
                            <div className="text-xl border-b-2 border-green-800 p-2">{getProductQuantity()}</div>
                            <Button style={"lg:w-[50px] w-[20px] text-xl rounded-full"} text="+" onClick={() => handleAddToCart()} />
                        </div>
                    ) : (
                        <Button style={"lg:w-[200px] rounded-full"} text={"Add to Cart"} onClick={() => handleAddToCart()} />
                    )}
                </div> */}
            </div>
            <Footer />
        </div>
    )
}
export default ProductDetailPage
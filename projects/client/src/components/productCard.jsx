import Button from "./button"
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../redux/Features/cart";
import { deleteItemInCartAsync } from "../redux/Features/cart";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getMainAddress } from "../redux/Features/branch";
import { useEffect } from "react";


const ProductCard = (props) => {
    const dispatch = useDispatch();
    const mainAddress = useSelector((state) => state.branch.mainAddress)
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.users);
    const isInCart = cart.cart.some(item => item.products_id === props.data);
    const navigate = useNavigate()
    const closestBranch = useSelector((state) => state.branch.closestBranch);
    const productStock = Array.isArray(props.stock) ? props.stock[0]?.stock : props.stock;
    const isProductInStock = productStock !== null && productStock !== undefined && productStock !== '' && productStock !== 0;
    const getProductQuantity = () => {
        const productInCart = cart.cart.find(item => item.products_id === props.data);
        return productInCart ? productInCart.quantity : 0;
    };
    const userStatus = user.isVerified
    const handleAddToCart = () => {
        if (user.username) {
            dispatch(addToCartAsync(props.data, closestBranch.id, userStatus));
        }
        else if (!user.username) {
            toast.error("Please log in to add items to your cart");
            setTimeout(() => {
                navigate("/login"); // Step 4
            }, 2000);
            return
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
        dispatch(getMainAddress());
    }, []);

    console.log(mainAddress);

    return (
        <div>
            <div className={isProductInStock ? `hover:border-green-700  hover:border-4 ease-in duration-200 border w-[165px] md:w-[180px] lg:w-[240px] h-[350px] lg:h-[410px] rounded-xl ${props.style}` : `hover:border-green-700 bg-gray-300   hover:border-4 ease-in duration-200 border w-[165px] md:w-[180px] lg:w-[240px] h-[350px] lg:h-[410px] rounded-xl opacity-50 ${props.style}`}>
                <Link to={`/products/detail/${props.data}`}>
                    <div className="relative">
                        {
                            (props.discount_id === 3)
                                ?
                                <div className="absolute right-3 top-0">
                                    <div className="bg-gradient-to-r from-yellow-300 to-green-600 p-2 text-white  font-bold rounded-b-xl">Buy 1 Get 1 Free</div>
                                </div>
                                :
                                null
                        }
                        <img className="object-fill rounded-t-xl h-[160px] lg:h-[220px] w-full z-0" src={process.env.REACT_APP_URL + `${props.image}`} alt="" />
                    </div>
                    <div className="h-[110px] lg:h-[110px] flex flex-col justify-between p-2 pl-4">
                        <div className="font-semibold truncate">{props.name}</div>
                        {/* <div className="text-gray-400"> Stock(s): {productStock ? productStock : "0"}</div> */}
                        {props.stock === "empty" ? null : <div className="text-gray-400">Stock(s): {productStock ? productStock : null}</div>}
                        {
                            (props.discount_id === 1 || props.discount_id === 2 || props.discount_id === null)
                                ? (
                                    <div className="lg:flex gap-2">
                                        <div className="text-green-700 font-bold">Rp {props.final_price.toLocaleString()}</div>
                                        {(props.discount_id === 1 || props.discount_id === 2) && (
                                            <div className="text-red-600 line-through font-bold">Rp {props.price.toLocaleString()}</div>
                                        )}
                                    </div>
                                )
                                : (props.discount_id === 3) && (
                                    <div className="lg:flex gap-2">
                                        <div className="text-green-700 font-bold">Rp {props.final_price.toLocaleString()}</div>
                                    </div>
                                )
                        }

                    </div>
                </Link>
                <div className="flex justify-center pt-2 w-full">
                    {isProductInStock ? (
                        isInCart ? (
                            <div className="flex items-center gap-2 lg:gap-5">
                                <Button style={"lg:w-[50px] w-[20px] text-xl rounded-full"} text="-" onClick={() => dispatch(deleteItemInCartAsync(props.data))} />
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
                </div>
            </div>
        </div >
    )
}
export default ProductCard

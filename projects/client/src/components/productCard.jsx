import Button from "./button"
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../redux/Features/cart";
import { deleteItemInCartAsync } from "../redux/Features/cart";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.users);
    const isInCart = cart.cart.some(item => item.products_id === props.data);
    const navigate = useNavigate()
    const closestBranch = useSelector((state) => state.branch.closestBranch);


    const getProductQuantity = () => {
        const productInCart = cart.cart.find(item => item.products_id === props.data);
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
            dispatch(addToCartAsync(props.data, closestBranch.id));

        }
    };

    return (
        <div>
            <div className={`hover:border-green-700  hover:border-4 ease-in duration-200 border w-[165px] md:w-[180px] lg:w-[240px] h-[350px] lg:h-[410px] rounded-xl ${props.style}`}>
                <Link to={`/products/detail/${props.data}`}>
                    <div>
                        <img className="object-fill rounded-t-xl h-[160px] lg:h-[220px] w-full z-0" src={process.env.REACT_APP_URL + `${props.image}`} alt="" />
                    </div>
                    <div className="h-[110px] lg:h-[110px] flex flex-col justify-between p-2 pl-4">
                        <div className="font-semibold truncate">{props.name}</div>
                        <div className="text-gray-400"> Stock(s): {props.stock}</div>
                        <div className="text-green-700 font-bold">Rp {props.price.toLocaleString()}</div>
                    </div>
                </Link>
                <div className="flex justify-center pt-2 w-full">
                    {isInCart ? (
                        <div className="flex items-center gap-2 lg:gap-5">
                            <Button style={"lg:w-[50px] w-[20px] text-xl rounded-full"} text="-" onClick={() => dispatch(deleteItemInCartAsync(props.data))} />
                            <div className="text-xl border-b-2 border-green-800 p-2">{getProductQuantity()}</div>
                            <Button style={"lg:w-[50px] w-[20px] text-xl rounded-full"} text="+" onClick={() => handleAddToCart()} />
                        </div>
                    ) : (
                        <Button style={"lg:w-[200px] rounded-full"} text={"Add to Cart"} onClick={() => handleAddToCart()} />
                    )}
                </div>
            </div>
        </div >
    )
}
export default ProductCard

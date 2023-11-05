import Button from "./button"
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../redux/Features/cart";
import { deleteItemInCartAsync } from "../redux/Features/cart";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CartComponent = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.users);
    const isInCart = cart.cart.some(item => item.products_id === props.data);
    const navigate = useNavigate()

    const getAvailableStock = () => {
        return props.stock;
    };
    const getProductQuantity = () => {
        const productInCart = cart.cart.find(item => item.products_id === props.data);
        return productInCart ? productInCart.quantity : 0;
    };
    const handleAddToCart = () => {
        const availableStock = getAvailableStock();
        const productQuantityInCart = getProductQuantity();

        if (!user.username) {
            toast.error("Please log in to add items to your cart");
            setTimeout(() => {
                navigate("/login"); // Step 4
            }, 2000);
            return
        }

        if (productQuantityInCart < availableStock) {
            dispatch(addToCartAsync(props.data));
        } else {
            toast.error("Oops, stock limit reached. No more items can be added");
        }
    };

    return (
        <div>
            <div className={`w-full ${props.style}`}>
                <div className="flex w-full rounded-xl border">
                    <div className="">
                        <img className="object-fill h-[170px] w-[150px] md:w-[200px] rounded-l-xl" src={process.env.REACT_APP_URL + `${props.image}`} alt="product_image" />
                    </div>

                    <div className="md:flex md:justify-between p-2 pl-4 w-[200px] md:w-full">
                        <div className="md:grid md:place-content-center md:gap-3">
                            <div className=" text-xl font-semibold truncate">{props.name}</div>
                            <div className="text-gray-400"> Stock(s): {props.stock}</div>
                            <div className="text-green-700 font-bold">Rp {props.price.toLocaleString()}</div>
                        </div>
                        <div className="flex items-center gap-2 lg:gap-5 py-3 md:pr-5">
                            <Button style={"lg:w-[50px] text-xl rounded-full"} text="-" onClick={() => dispatch(deleteItemInCartAsync(props.data))} />
                            <div className="text-xl border-b-2 border-green-800 p-2">{getProductQuantity()}</div>
                            <Button style={"lg:w-[50px]  text-lg rounded-full"} text="+" onClick={() => handleAddToCart()} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default CartComponent

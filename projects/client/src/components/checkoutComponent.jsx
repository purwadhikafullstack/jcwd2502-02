import Button from "./button"
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../redux/Features/cart";
import { deleteItemInCartAsync } from "../redux/Features/cart";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const CheckoutComponent = (props) => {
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

                    <div className="md:flex md:justify-between p-2 flex flex-col justify-between pl-4 w-[200px] md:w-full">
                        <div className="">
                            <div className=" text-xl font-semibold truncate">{props.name}</div>

                        </div>
                        <div className="text-xl">x {props.quantity}</div>

                        <div className="text-green-700 font-bold pt-3 md:pt-0">Rp {props.price.toLocaleString()}</div>

                        <div className="h-[3px] bg-green-800"></div>
                        <div className="font-semibold text-sm border-green-800">Subtotal: Rp {props.subtotal.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default CheckoutComponent

import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../redux/Features/cart";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CheckoutComponent = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.users);
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
                <div className="flex w-full rounded-xl border relative">
                    <div className="">
                        <div className="absolute left-0 top-0">
                            {
                                (props.discount_id === 3)
                                    ?
                                    <div className="">
                                        <div className="bg-gradient-to-r from-yellow-300 to-green-600 p-2 text-white font-bold rounded-l-xl rounded-b-xl">Buy 1 Get 1 Free</div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <img className="object-fill h-[170px] w-[150px] md:w-[200px] rounded-l-xl" src={process.env.REACT_APP_URL + `${props.image}`} alt="product_image" />
                    </div>

                    <div className="md:flex md:justify-between p-2 flex flex-col justify-between pl-4 w-[200px] md:w-full">
                        <div className="flex flex-col justify-center">
                            <div className=" text-xl font-semibold truncate">{props.name}</div>
                            <div className="pt-2 text-sm text-gray-400">{props.weight} gr</div>
                        </div>

                        <div className="flex">
                            {
                                (props.discount_id === 1 || props.discount_id === 2 || props.discount_id === null)
                                    ? (
                                        <div className="lg:flex gap-2">
                                            <div className="grid place-content-center text-green-700 font-bold">Rp {props.final_price.toLocaleString()}</div>
                                            {(props.discount_id === 1 || props.discount_id === 2) && (
                                                <div className="grid place-content-center text-red-600 line-through font-bold">Rp {props.price?.toLocaleString()}</div>
                                            )}
                                        </div>
                                    )
                                    : (props.discount_id === 3) && (
                                        <div className="lg:flex gap-2">
                                            <div className="grid place-content-center text-green-700 font-bold">Rp {props.final_price.toLocaleString()}</div>
                                        </div>
                                    )
                            }
                            <div className=" pl-3 text-xl grid place-content-center">x {props.quantity}</div>
                        </div>


                        <div className="h-[3px] bg-green-800"></div>
                        <div className="font-semibold text-sm py-2 border-green-800">Subtotal: Rp {props.subtotal.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default CheckoutComponent

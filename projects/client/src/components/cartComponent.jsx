import Button from "./button"
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../redux/Features/cart";
import { deleteItemInCartAsync } from "../redux/Features/cart";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BsFillTrash3Fill } from "react-icons/bs";
import DeleteConfirmation from "./deleteModal";
import { getCartAsync } from "../redux/Features/cart"; // Replace with the actual path


const CartComponent = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.users);
    const isInCart = cart.cart.some(item => item.products_id === props.data);
    const navigate = useNavigate()
    const closestBranch = useSelector((state) => state.branch.closestBranch);


    const handleGetCart = () => {
        dispatch(getCartAsync());
    };
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
            <div className={`w-full ${props.style}`}>
                <div className="flex w-full rounded-xl border h-auto">
                    <div className="">
                        <img className="object-fill h-[170px] w-[140px] md:w-[200px] rounded-l-xl" src={process.env.REACT_APP_URL + `${props.image}`} alt="product_image" />
                    </div>

                    <div className="md:flex md:justify-between p-2 pl-4 w-[200px] md:w-full">
                        <div className="md:grid md:place-content-center md:gap-3 w-auto">
                            <div className=" text-xl font-semibold truncate">{props.name}</div>
                            <div className="text-gray-400">{props.weight} gr</div>
                            <div className="text-green-700 font-bold">Rp {props.price.toLocaleString()}</div>
                        </div>

                        <div className="flex items-center gap-2 lg:gap-5 py-3 md:pr-5 justify-center ">
                            <DeleteConfirmation
                                button={<div className="text-xl"><BsFillTrash3Fill /></div>}
                                apiEndpoint={"/cart/delete-all"}
                                itemId={props.id}
                                onDelete={() => handleGetCart()}
                            />
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

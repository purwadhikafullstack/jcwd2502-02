import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import { useDispatch, useSelector } from "react-redux";
import CartComponent from "../../components/cartComponent";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import { nearestBranch } from "../../redux/Features/branch";
const Cart = () => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart);
    const apiInstance = api()
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(true);
    const closestBranch = useSelector((state) => state.branch.closestBranch);
    console.log(closestBranch);

    console.log(cart.cart);

    useEffect(() => {
        dispatch(nearestBranch())
    }, [dispatch])

    const totalSubtotal = cart.cart.reduce((sum, item) => sum + item.subtotal, 0);

    return (
        <div>
            <Toaster />
            <Navbar />

            <div className="mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32 ">

                <div className="flex text-5xl font-bold gap-2 text-green-800">My Cart
                </div>

                {cart.cart.length ? <div className="flex my-5 text-lg">
                    <div className="pt-1 pr-3"><FaLocationDot /> </div>
                    <div> {closestBranch.name}</div>
                </div> : null}

                <div className="lg:flex lg:gap-12 md:mb-10">

                    <div className="flex flex-col gap-3 lg:flex-1 h-[500px] overflow-y-auto ">

                        {cart.cart.length ?
                            <div>{
                                cart.cart.map((value, index) => {
                                    return (
                                        <div>
                                            <CartComponent
                                                name={value.product.name}
                                                price={value.product.price}
                                                final_price={value.product.final_price}
                                                discount_id={value.product.discount_id}
                                                image={value.product.image}
                                                weight={value.product.weight}
                                                data={value.products_id}
                                                id={value.products_id}
                                            />
                                        </div>
                                    )
                                })

                            }</div>
                            : <div className="grid gap-3 place-content-center mt-32">
                                <div className="text-center text-3xl font-black grid place-content-center">Oops, Your cart is empty!</div>
                                <div className=" grid place-content-center">But it doesn't have to be</div>
                                <Link to={'/products?category='}>
                                    <Button style={"w-full"} text={"Continue Shopping"} />
                                </Link>
                            </div>
                        }

                    </div>

                    {cart.cart.length ? <div className="bg-green-800 my-10 lg:my-0 p-3 rounded-xl md:h-[120px] lg:w-[400px]">
                        <div className="text-2xl lg:text-xl font-bold text-white flex justify-between">
                            <div>Total Order :</div>
                            <div>Rp {totalSubtotal.toLocaleString()}</div>
                        </div>
                        <div className="my-3">
                            <Link to={'/checkout'}>
                                <Button style={"w-full"} text={"Proceed to Checkout"} />
                            </Link>
                        </div>
                    </div> : null}

                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Cart
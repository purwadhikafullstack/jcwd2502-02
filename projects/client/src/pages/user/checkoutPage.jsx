import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import { useDispatch, useSelector } from "react-redux";
import CartComponent from "../../components/cartComponent";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import CheckoutComponent from "../../components/checkoutComponent";

const CheckoutPage = () => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart);

    // ambil cart dari redux 
    // ambil neaerest stock (untuk sementara nembak dulu wkwk)
    // pakai productCard untuk mapping
    // cb amblil sub total dr front end, kalau gabisa call endpoint dr backend

    console.log(cart.cart);

    const totalSubtotal = cart.cart.reduce((sum, item) => sum + item.subtotal, 0);


    return (
        <div>
            <Toaster />
            {/* <Navbar /> */}

            <div className="mx-5 pt-5 md:mx-20 lg:mx-32 ">

                <div className="flex text-5xl font-bold gap-2 text-green-800">Checkout
                </div>
                <div className="flex my-5 text-lg">
                    <div className="pt-1 pr-3"><FaLocationDot /> </div>
                    <div> Branch Name</div>
                </div>
                <div className="lg:flex lg:gap-12 md:mb-10">
                    <div className="grid gap-3 lg:flex-1 h-[500px] overflow-y-auto">
                        {cart.cart.map((value, index) => {
                            return (
                                <div key={index}>
                                    <CheckoutComponent
                                        name={value.product.name}
                                        image={value.product.image}
                                        price={value.product.price}
                                        quantity={value.quantity}
                                        subtotal={value.subtotal}
                                    />
                                </div>)
                        })}
                    </div>
                    <div className="bg-green-800 my-10 lg:my-0 p-5 rounded-xl lg:w-[400px]">
                        <div className="text-2xl font-bold text-white">Order Detail:</div>
                        <div className="text-white">
                            <div className="my-3">
                                <div className="font-bold">Shipping Address</div>
                                <div>Rumah XXXX</div>
                            </div>

                            <div className="grid gap-2">
                                <div className="grid gap-2">
                                    <div className="font-bold">Shipping Service</div>
                                    <div>
                                        <select className="select select-bordered w-full  text-black">
                                            <option disabled selected>Select shipping service</option>
                                            <option>JNE</option>
                                            <option>POS INDONESIA</option>
                                            <option>Tiki</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="font-bold">Shipping Option</div>
                                    <div>
                                        <select className="select select-bordered w-full  text-black">
                                            <option disabled selected>Select shipping option</option>
                                            <option>tba</option>
                                            <option>tba</option>
                                            <option>tba</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="font-bold">Voucher</div>
                                    <div>
                                        <select className="select select-bordered w-full  text-black">
                                            <option disabled selected>Select Voucher</option>
                                            <option>Voucher 1</option>
                                            <option>Voucher 2</option>
                                            <option>Voucher 3</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-2 mt-3">
                                <div className="flex justify-between">
                                    <div>Total Weight</div>
                                    <div className="font-bold">500 gr</div>
                                </div>

                                <div className="flex justify-between">
                                    <div>Subtotal</div>
                                    <div className="font-bold">Rp {totalSubtotal.toLocaleString()}</div>
                                </div>

                                <div className="flex justify-between">
                                    <div>Shipping Cost</div>
                                    <div className="font-bold">Rp XXX</div>
                                </div>

                                <div className="flex justify-between">
                                    <div>Voucher Discount</div>
                                    <div className="font-bold">Rp XXX</div>
                                </div>
                            </div>

                            <div className="h-[3px] bg-white my-2"></div>

                            <div className="flex justify-between text-xl ">
                                <div>Grand Total</div>
                                <div className="font-bold">Rp XXX</div>
                            </div>
                        </div>

                        <div className="my-3">
                            <Link >
                                <Button style={"w-full"} text={"Confirm Order"} />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div >
    )
}

export default CheckoutPage
import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import { useDispatch, useSelector } from "react-redux";
import CartComponent from "../../components/cartComponent";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import CheckoutComponent from "../../components/checkoutComponent";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import { nearestBranch } from "../../redux/Features/branch";
import { getMainAddress } from "../../redux/Features/branch";
import { getCartAsync } from "../../redux/Features/cart";

const CheckoutPage = () => {
    const dispatch = useDispatch()
    const [shippingService, setShippingService] = useState();
    const [shippingOption, setShippingOption] = useState()
    const [courier, setCourier] = useState()
    const [cost, setCost] = useState()
    const cart = useSelector((state) => state.cart);
    const mainAddress = useSelector((state) => state.branch.mainAddress)
    const closestBranch = useSelector((state) => state.branch.closestBranch);
    const [totalFinal, setTotalFinal] = useState()
    const totalSubtotal = cart.cart.reduce((sum, item) => sum + item.subtotal, 0);
    const totalWeight = cart.cart.reduce((sum, item) => sum + item.total_weight, 0);

    const address = `${mainAddress?.address}, ${mainAddress?.city?.name}, ${mainAddress?.city?.province.name}`

    const handleShippingService = async (event) => {
        try {
            const selectedService = event.target.value;
            setShippingService(selectedService)
            setShippingOption(null);
            setCost(0);
            const getOption = await api().post('/transaction/option', { origin: closestBranch.city_id, destination: mainAddress.city_id, weight: totalWeight, courier: selectedService })
            setShippingOption(getOption.data.data[0].costs)
            setCost(null)
        } catch (error) {
            console.log(error);
        }
    }

    const handleShippingOption = async (event) => {
        try {
            const selectedOption = event.target.value;
            const selectedOptionDescription = event.target.options[event.target.selectedIndex].text;
            setCourier(selectedOptionDescription)
            setCost(Number(selectedOption))
        } catch (error) {
            console.log(error);
        }
    }

    const submitOrder = async () => {
        try {
            if (cost == null) {
                toast.error("Please complete the shipping data")
            } else {
                const createOrder = await api().post('/transaction/add', { subtotal: totalSubtotal, shipping_cost: cost, final_total: totalFinal, shipping_method: `${shippingService} - ${courier}`, address, branchId: closestBranch.id })
                console.log(createOrder.data);
                toast.success("Order created!")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        dispatch(getCartAsync());
        dispatch(nearestBranch());
        dispatch(getMainAddress());
    }, []);

    // console.log(address);
    // console.log(closestBranch.id);

    useEffect(() => {
        if (cost) {
            setTotalFinal(((totalSubtotal) + (cost)))
        } else { setTotalFinal(totalSubtotal) }
    }, [cost, totalSubtotal]);

    return (
        <div>
            <Toaster />
            <div className="mx-5 pt-5 md:mx-20 lg:mx-32 ">

                <div className="flex text-5xl font-bold gap-2 text-green-800">Checkout
                </div>
                <div className="flex my-5 text-lg">
                    <div className="pt-1 pr-3"><FaLocationDot /> </div>
                    <div>{closestBranch?.name}</div>
                </div>
                <div className="lg:flex lg:gap-12 md:mb-10">
                    <div className="flex flex-col gap-3 lg:flex-1 h-[500px] overflow-y-auto">
                        {cart.cart.map((value, index) => {
                            return (
                                <div key={index}>
                                    <CheckoutComponent
                                        name={value.product.name}
                                        weight={value.product.weight}
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
                            <div className="my-3 flex flex-col gap-2">
                                <div className="font-bold">Shipping Address</div>
                                <div>{mainAddress?.name}</div>
                                <div>{mainAddress?.address}</div>
                                <div>{mainAddress?.city?.name} - {mainAddress?.city?.province?.name}</div>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid gap-2">
                                    <div className="font-bold">Shipping Service</div>
                                    <div>
                                        <select onChange={handleShippingService} className="select select-bordered w-full  text-black">
                                            <option value="" disabled selected>Select shipping service</option>
                                            <option value={"jne"}>JNE</option>
                                            <option value={"pos"}>POS INDONESIA</option>
                                            <option value={"tiki"}>Tiki</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="font-bold">Shipping Option</div>
                                    <div>
                                        <select onChange={handleShippingOption} className="select select-bordered w-full  text-black">
                                            <option value="" >Select shipping option</option>
                                            {shippingOption ? shippingOption.map((value, index) => {
                                                return (
                                                    <option value={value.cost[0].value} key={index}>{value.description} - estimation {value.cost[0].etd} day(s) arrival</option>
                                                )
                                            }) : <option >Finding shipping option...</option>}
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
                                    <div className="font-bold">{totalWeight} gr</div>
                                </div>

                                <div className="flex justify-between">
                                    <div>Subtotal</div>
                                    <div className="font-bold">Rp {totalSubtotal.toLocaleString()}</div>
                                </div>

                                <div className="flex justify-between">
                                    <div>Shipping Cost</div>
                                    <div className="font-bold">Rp {cost ? cost.toLocaleString() : 0}</div>
                                </div>

                                <div className="flex justify-between">
                                    <div>Voucher Discount</div>
                                    <div className="font-bold">- Rp 0</div>
                                </div>
                            </div>

                            <div className="h-[3px] bg-white my-2"></div>

                            <div className="flex justify-between text-xl font-black">
                                <div>Grand Total</div>
                                <div className="">Rp {totalFinal ? totalFinal.toLocaleString() : null}</div>
                            </div>
                        </div>
                        <div className="my-3">
                            <Link >
                                <Button onClick={() => submitOrder()} style={"w-full"} text={"Confirm Order"} />
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
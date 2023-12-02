import Footer from "../../components/footer"
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/button";
import { Link, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import CheckoutComponent from "../../components/checkoutComponent";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import { nearestBranch } from "../../redux/Features/branch";
import { getMainAddress } from "../../redux/Features/branch";
import { getCartAsync } from "../../redux/Features/cart";

const CheckoutPage = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const [disabled, setDisabled] = useState(false)
    const [shippingService, setShippingService] = useState();
    const [shippingOption, setShippingOption] = useState()
    const [courier, setCourier] = useState()
    const [cost, setCost] = useState()
    const [ownedCoupon, setOwnedCoupon] = useState()
    const [discount, setDiscount] = useState()
    const [discountId, setDiscountId] = useState()
    const [ownedCouponId, setOwnedCouponId] = useState()
    const [couponName, setCouponName] = useState()
    const [shippingOptionSelected, setShippingOptionSelecteded] = useState(false);
    const [shippingServiceSelected, setShippingServiceSelected] = useState(false)
    const cart = useSelector((state) => state.cart);
    const mainAddress = useSelector((state) => state.branch.mainAddress)
    const [cartLoaded, setCartLoaded] = useState(false);
    const closestBranch = useSelector((state) => state.branch.closestBranch);
    const [totalFinal, setTotalFinal] = useState()
    const totalSubtotal = cart.cart.reduce((sum, item) => sum + item.subtotal, 0);
    const totalWeight = cart.cart.reduce((sum, item) => sum + item.total_weight, 0);
    const address = `${mainAddress?.address}, ${mainAddress?.city?.name}, ${mainAddress?.city?.province.name}`
    useEffect(() => {
        if (cart.cart.length === 0) {
            nav('/');
        } else {
            setCartLoaded(true);
        }
    }, [cart]);
    const handleShippingService = async (event) => {
        try {
            const selectedService = event.target.value;
            setShippingService(selectedService)
            setShippingOption(null);
            setCost(0);
            setShippingOptionSelecteded(false)
            const getOption = await api().post('/transaction/option', { origin: closestBranch.city_id, destination: mainAddress.city_id, weight: totalWeight, courier: selectedService })
            setShippingOption(getOption.data.data[0].costs)
            // setCost(null)
        } catch (error) {
            console.log(error);
        }
    }
    const handleShippingOption = async (event) => {
        try {
            const selectedOption = event.target.value;
            const selectedOptionDescription = event.target.options[event.target.selectedIndex].text;
            setCourier(selectedOptionDescription)
            if (discountId === 3) {
                setCost(0)
            } else {
                setCost(Number(selectedOption))
            }
            setShippingOptionSelecteded(true)
        } catch (error) {
            console.log(error);
        }
    }

    const submitOrder = async () => {
        try {
            if (!shippingOptionSelected) {
                toast.error("Please complete the shipping data");
            } else {
                setDisabled(true);
                const createOrder = await api().post('/transaction/add', { subtotal: totalSubtotal, shipping_cost: cost, final_total: totalFinal, shipping_method: `${shippingService} - ${courier}`, address, branchId: closestBranch.id, total_weight: totalWeight, discount_coupon: discount, coupon_id: discountId, ownedCouponId: ownedCouponId, coupon_name: couponName });
                toast.success("Order created!");
                setTimeout(() => {
                    nav(`/order/${createOrder.data.data.id}`);
                }, 1500);
            }
        } catch (error) {
            console.log(error);
            toast.error("An Error Has Occurred, Please Try Again Later");
            setDisabled(false);
        }
    };

    const onGetCoupon = async () => {
        try {
            const coupon = await api().get(`/transaction/coupon/user`)
            setOwnedCoupon(coupon.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleCoupon = async (event) => {
        try {
            setDiscount(totalSubtotal * (ownedCoupon[event.target.value].coupon_value / 100))
            if (ownedCoupon[event.target.value].coupon_id === 3) {
                setCost(0)
            }
            setDiscountId(ownedCoupon[event.target.value].coupon_id)
            setOwnedCouponId(ownedCoupon[event.target.value].id)
            setCouponName(ownedCoupon[event.target.value].coupon_name)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getCartAsync());
        dispatch(nearestBranch());
        dispatch(getMainAddress());
        onGetCoupon()
    }, []);

    useEffect(() => {
        if (!discount && !cost) {
            setTotalFinal(totalSubtotal)
        }
        else if (cost && !discount) {
            setTotalFinal(((totalSubtotal) + (cost)))
        }
        else if (discount && !cost) {
            setTotalFinal(((totalSubtotal) - (discount)))
        }
        else { setTotalFinal(((totalSubtotal) + (cost) - (discount))) }
    }, [cost, totalSubtotal, discount]);
    return cartLoaded ? (
        <div>
            <Toaster />
            <div className="mx-5 pt-5 md:mx-20 lg:mx-32 ">

                <div className="flex text-5xl font-bold gap-2 text-green-800">Checkout
                </div>
                <div className="flex my-5 text-lg">
                    <div className="pt-1 pr-3"><FaLocationDot /> </div>
                    <div>Shipped From: </div>
                    <div className="pl-3">{closestBranch?.name}</div>
                </div>
                <div className="lg:flex lg:gap-12 md:mb-10 lg:justify-between">
                    <div className="flex flex-col gap-3 lg:flex-1 h-[500px] overflow-y-auto">
                        {cart.cart.map((value, index) => {
                            return (
                                <div key={index}>
                                    <CheckoutComponent
                                        name={value.product.name}
                                        weight={value.product.weight}
                                        image={value.product.image}
                                        price={value.product.price}
                                        final_price={value.product.final_price}
                                        discount_id={value.product.discount_id}
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
                                        <select onChange={handleShippingService} className="select select-bordered w-full text-black">
                                            <option value="" disabled selected>Select shipping service</option>
                                            <option value="jne">JNE</option>
                                            <option value="pos">POS INDONESIA</option>
                                            <option value="tiki">Tiki</option>
                                        </select>
                                    </div>
                                </div>
                                {shippingService && (
                                    <div className="grid gap-2">
                                        <div className="font-bold">Shipping Option</div>
                                        <div>
                                            <select onChange={handleShippingOption} className="select select-bordered w-full text-black">
                                                <option value="">Select shipping option</option>
                                                {shippingOption ? (
                                                    shippingOption.map((value, index) => (
                                                        <option value={value.cost[0].value} key={index}>{value.description} - estimation {value.cost[0].etd} day(s) arrival</option>
                                                    ))
                                                ) : (
                                                    <option>Finding shipping option...</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                )}
                                <div className="grid gap-2">
                                    <div className="font-bold">Voucher</div>
                                    <div>
                                        {ownedCoupon && ownedCoupon.length > 0 ? (
                                            <select onChange={(e) => handleCoupon(e)} className="select select-bordered w-full text-black">
                                                <option value="">Select Voucher</option>
                                                {ownedCoupon.map((value, index) => (
                                                    <option value={index} key={index}>{value.coupon_name}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <div>You don't have any vouchers available.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-2 mt-8">
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
                                    <div className="font-bold">- Rp {discount ? discount.toLocaleString() : 0}</div>
                                </div>
                            </div>
                            <div className="h-[3px] bg-white my-2"></div>
                            <div className="flex justify-between text-xl font-black">
                                <div>Grand Total</div>
                                <div className="">Rp {totalFinal ? totalFinal.toLocaleString() : null}</div>
                            </div>
                        </div>
                        <div className="my-3">
                            {disabled ?
                                <Button style={"w-full cursor-not-allowed"} text={"Processing Order"} />
                                : <Button disabled={disabled} onClick={() => submitOrder()} style={"w-full"} text={disabled ? "Creating Order" : "Confirm Order"} />}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    ) : null
}
export default CheckoutPage
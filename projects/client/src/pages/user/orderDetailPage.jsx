import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import Button from "../../components/button";
import CheckoutComponent from "../../components/checkoutComponent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import moment from 'moment';



const UserOrderDetail = () => {
    const [timeRemaining, setTimeRemaining] = useState(0); // Set the initial time in seconds
    const [transaction, setTransaction] = useState("")
    const [detail, setDetail] = useState("")
    const { id } = useParams()
    const getDetailOrder = async () => {
        try {
            const order = await api().get(`http://localhost:8905/api/transaction/${id}`)
            console.log(order.data.data);
            console.log(order.data.data.createdAt);
            setTransaction(order.data.data)
            setDetail(order.data.data.transaction_details)
            const createdAt = order.data.data.createdAt;
            const countdownDuration = 24 * 60 * 60;
            const startTime = new Date(createdAt).getTime() / 1000; // convert milliseconds to seconds
            const currentTime = Math.floor(new Date().getTime() / 1000); // convert milliseconds to seconds
            const remainingTime = countdownDuration - (currentTime - startTime);
            setTimeRemaining(remainingTime > 0 ? remainingTime : 0);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getDetailOrder()
        const intervalId = setInterval(() => {
            setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [])


    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };


    console.log(transaction);
    console.log(detail);

    return (
        <div>

            <Navbar />

            <div className={"mt-[70px] md:mx-20 lg:mx-32 mx-5 h-full"}
                style={{ minHeight: "100vh" }}>

                <div className="flex text-md lg:text-2xl font-bold pt-10 pb-5">
                    <div className="hover:underline"> Order List</div>
                    <div className="grid place-content-center px-3"><IoIosArrowForward />
                    </div>INV {transaction ? transaction.invoice : null}

                </div>

                <div className="lg:flex lg:gap-12 md:mb-10 lg:justify-between ">
                    <div className="flex flex-col gap-3 lg:flex-1 ">
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between gap-3">
                                <div className="w-[230px] lg:w-[170px] text-xl font-bold flex flex-col justify-center">Order Status:</div>
                                <div className="w-full">
                                    {transaction.status == "pending" ? <div className={` text-lg grid place-content-center rounded-xl font-bold bg-yellow-300 p-1`}>{transaction.status.toUpperCase()}</div> : null}
                                    {transaction.status == "canceled" ? <div className={` lg:flex-1 text-xl grid place-content-center rounded-xl font-bold bg-red-400 p-2`}>{transaction.status.toUpperCase()}</div> : null}
                                </div>
                            </div>
                            {transaction.status == "pending" ? <div>
                                <div className="border-4 border-green-700 h-[200px] grid place-content-center">
                                    <div className="grid place-content-center">TIME REMAINING:</div>
                                    <div className="text-6xl grid place-content-center">{formatTime(timeRemaining)}</div>
                                    <div className="grid place-content-center pt-5 text-sm">Please via Bank Transfer to:</div>
                                    <div className="flex place-content-center text-xs lg:text-base"><img src="./bca_logo.png" alt="app_logo" className="h-[20px] lg:pr-3" /> 6041688880 - a/n PT BuyFresh Indonesia</div>
                                    <div className="grid place-content-center"></div>
                                </div>

                                <div className=" btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900 w-full mt-5">UPLOAD PAYMENT PROOF</div></div> : null}

                            <div className="my-5 h-[5px] bg-gradient-to-r from-yellow-300 to-green-600 rounded-full"></div>

                            <div className="">
                                <div className="text-xl font-bold mb-3">Item List</div>
                                <div className="flex flex-col gap-3 h-[360px] overflow-y-auto">
                                    {detail ? detail.map((value, index) => {
                                        return (
                                            <div key={index}>
                                                <CheckoutComponent
                                                    name={value.name}
                                                    weight={value.weight}
                                                    price={value.price}
                                                    final_price={value.price}
                                                    discount_id={value.discount_id}
                                                    quantity={value.quantity}
                                                    subtotal={value.subtotal}
                                                    image={value.product.image}
                                                />
                                            </div>
                                        )
                                    }) : null}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-green-800 my-10 lg:my-0 p-5 rounded-xl lg:w-[400px] h-[650px] flex flex-col justify-between">
                        <div></div>
                        <div className="text-3xl font-bold text-white">Order Detail: </div>
                        <div className="text-white">
                            <div className="my-3 flex flex-col gap-2">
                                <div className="font-bold text-xl underline">Shipping Address</div>
                                <div className="">{transaction ? transaction.address : null}</div>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid gap-2">
                                    <div className="font-bold text-xl underline">Transaction Date</div>
                                    <div>
                                        {transaction ? moment(transaction.createdAt).format('dddd, Do MMMM YYYY')
                                            : null}
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="font-bold text-xl underline">Shipping Option</div>
                                    <div>
                                        {transaction ? (transaction.shipping_method.toUpperCase())
                                            : null}
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="font-bold text-xl underline">Voucher</div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-2 mt-3">
                                <div className="flex justify-between">
                                    <div>Total Weight</div>
                                    {transaction ? transaction.total_weight : null} gr
                                </div>

                                <div className="flex justify-between">
                                    <div>Subtotal</div>
                                    Rp {transaction ? transaction.subtotal.toLocaleString() : null}
                                </div>

                                <div className="flex justify-between">
                                    <div>Shipping Cost</div>
                                    Rp {transaction ? transaction.shipping_cost.toLocaleString() : null}
                                </div>

                                <div className="flex justify-between">
                                    <div>Voucher Discount</div>
                                    <div className="font-bold">- Rp 0</div>
                                </div>
                            </div>

                            <div className="h-[3px] bg-white my-2"></div>

                            <div className="flex justify-between text-xl font-black">
                                <div>Grand Total</div>
                                Rp {transaction ? transaction.final_total.toLocaleString() : null}
                            </div>
                        </div>
                        <div className="my-3">
                            {transaction.status == "pending" ? <div className=" btn hover:bg-red-600 bg-red-600 text-white w-full border-none ">CANCEL ORDER</div> : null}
                        </div>
                    </div>

                </div>
            </div>

            <Footer />

        </div>
    )
}


export default UserOrderDetail
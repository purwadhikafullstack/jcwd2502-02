import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import Button from "../../components/button";
import CheckoutComponent from "../../components/checkoutComponent";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import moment from 'moment';
import toast, { Toaster } from "react-hot-toast";
import OrderDetailsSection from "../../components/orderDetails";
import DeleteConfirmation from "../../components/deleteModal";


const UserOrderDetail = () => {
    const [timeRemaining, setTimeRemaining] = useState(0); // Set the initial time in seconds
    const [transaction, setTransaction] = useState("")
    const [detail, setDetail] = useState("")
    const { id } = useParams()
    const payment = useRef(null);
    const [orderLoaded, setOrderLoaded] = useState(false); // New state


    const getDetailOrder = async () => {
        try {
            const order = await api().get(`/transaction/user/order/${id}`)
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

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success("Copied to clipboard!");
            })
            .catch((err) => {
                toast.error("Unable to copy to clipboard.");
                console.error("Copy to clipboard failed: ", err);
            });
    };

    const uploadPayment = async (event) => {
        try {
            const file = event.target.files[0]
            if (file) {
                if (file.size > 1000000 || !/image\/(png|jpg|jpeg)/.test(file.type)) throw {
                    message: 'File must be less than 1MB and in png, jpg, or jpeg format!'
                }
                const formData = new FormData();
                formData.append('image', file);
                const upload = await api().post(`/transaction/upload/${id}`, formData)
                toast.success("Payment Proof Uploaded!")
                getDetailOrder()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const endDate = new Date(/* Set your end date here */);


    useEffect(() => {
        getDetailOrder()
        const intervalId = setInterval(() => {
            setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(intervalId);
    }, [])

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div>
            <Toaster />
            <Navbar />
            <div className={"mt-[70px] md:mx-20 lg:mx-32 mx-5 h-full mb-10"}
                style={{ minHeight: "100vh" }}>
                {transaction ?
                    <>
                        <div className="flex text-md lg:text-2xl font-bold pt-10 pb-5">
                            <Link to={'/order-list'}>
                                <div className="hover:underline"> Order List</div>
                            </Link>
                            <div className="grid place-content-center px-3"><IoIosArrowForward />
                            </div>INV {transaction ? transaction.invoice : null}
                        </div>

                        <div className="lg:flex lg:gap-12 md:mb-10 lg:justify-between ">
                            <div className="flex flex-col gap-3 lg:flex-1 ">
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between gap-3">
                                        <div className="w-[230px] lg:w-[170px] text-xl font-bold flex flex-col justify-center">Order Status:</div>
                                        <div className="w-full">
                                            {transaction.status == "pending" ? <div className={` text-lg grid place-content-center rounded-xl font-bold bg-yellow-300 p-1`}>WAITING FOR PAYMENT</div> : null}
                                            {transaction.status == "waiting for payment approval" ? <div className={` lg:flex-1 lg:text-md text-sm ml-2 grid place-content-center rounded-xl font-bold bg-yellow-300 p-2`}>WAITING FOR APPROVAL</div> : null}
                                            {transaction.status == "Payment Approved" ? <div className={` lg:flex-1 lg:text-md text-sm ml-2 grid place-content-center rounded-xl font-bold bg-blue-600 p-2 text-white`}>PAYMENT APPROVED</div> : null}
                                            {transaction.status == "Delivered" ? <div className={` lg:flex-1 lg:text-md text-sm ml-2 grid place-content-center rounded-xl font-bold bg-orange-400 p-2 text-white`}>ORDER SENT</div> : null}
                                            {transaction.status == "canceled" ? <div className={` lg:flex-1 text-xl grid place-content-center rounded-xl font-bold bg-red-400 p-2`}>{transaction.status.toUpperCase()}</div> :
                                                null
                                            }
                                            {transaction.status == "Complete" ? <div className={` lg:flex-1 text-xl grid place-content-center rounded-xl font-bold bg-green-600 p-2 text-white`}>{transaction.status.toUpperCase()}</div> :
                                                null
                                            }
                                        </div>
                                    </div>
                                    {transaction.status === "pending" ? <div>
                                        <div className="border-4 border-green-700 h-[200px] grid place-content-center">
                                            <div className="grid place-content-center">TIME REMAINING:</div>
                                            <div className="text-6xl grid place-content-center countdown ">{formatTime(timeRemaining)}</div>
                                            <div className="grid place-content-center pt-5 text-sm">Please via Bank Transfer to:</div>

                                            <div className="flex">
                                                <div className="grid place-content-center">
                                                    <img src={"./download.png" && "https://cdn.discordapp.com/attachments/1120979304961032195/1179266321049989253/image.png?ex=65792858&is=6566b358&hm=1c24c04ab821f91ec5971a3ea52b4ecb6962718f1349f384f37b8ad33908c5f6&"} alt="app_logo" className="h-[30px] lg:pr-3" />
                                                </div>
                                                <div onClick={() => copyToClipboard("6041688880")} className="hover:underline hover:text-green-700 text-xs lg:text-base grid place-content-center"> 6041688880 - a/n PT BuyFresh Indonesia</div>
                                            </div>

                                        </div>
                                        <input
                                            type="file" accept=".jpg, .jpeg, .png" name="file" hidden ref={payment} onChange={uploadPayment}
                                        />
                                        <div onClick={() => payment.current.click()} className=" btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900 w-full mt-5">UPLOAD PAYMENT PROOF</div>

                                        <DeleteConfirmation
                                            itemId={id}
                                            onDelete={getDetailOrder}
                                            apiEndpoint="/transaction/cancel"
                                            text={""}
                                            message={"Order Canceled"}
                                            textOnButton={"Yes"}
                                            button={<div className=" btn hover:bg-red-600 bg-red-600 text-white rounded-xl mt-3 w-full border-none ">
                                                CANCEL ORDER
                                            </div>}
                                        />

                                    </div>
                                        : null
                                    }

                                    {transaction.status === "Delivered" ?

                                        <div className="w-full">
                                            <DeleteConfirmation
                                                itemId={id}
                                                onDelete={getDetailOrder}
                                                apiEndpoint="transaction/user/complete"
                                                text={""}
                                                message={"Order Completed"}
                                                textOnButton={"Yes"}
                                                button={<div className=" btn hover:bg-green-600 bg-green-600 text-white w-full border-none ">
                                                    COMPLETE ORDER
                                                </div>} />
                                        </div>

                                        : null}

                                    <div className="my-5 h-[5px] bg-gradient-to-r from-yellow-300 to-green-600 rounded-full"></div>
                                    <div className="">
                                        <div className="text-xl font-bold mb-3">Item List:</div>
                                        <div className="flex flex-col gap-3 h-[360px] overflow-y-auto">
                                            {detail ? detail.map((value, index) => {
                                                return (
                                                    <div key={index}>
                                                        <CheckoutComponent
                                                            name={value.name}
                                                            weight={value.weight}
                                                            price={value.real_price}
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
                            <OrderDetailsSection transaction={transaction}
                                fetchData={getDetailOrder}
                                id={id} />
                        </div>

                    </>
                    : null

                }

            </div>

            <Footer />

        </div>
    )
}
export default UserOrderDetail
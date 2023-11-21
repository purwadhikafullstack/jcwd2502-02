import NavbarAdmin from "../../components/navbarAdmin";
import Footer from "../../components/footer"
import Button from "../../components/button";
import CheckoutComponent from "../../components/checkoutComponent";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import OrderDetailsSection from "../../components/orderDetails";

const AdminOrderDetail = () => {
    const [timeRemaining, setTimeRemaining] = useState(0); // Set the initial time in seconds
    const [transaction, setTransaction] = useState("")
    const [detail, setDetail] = useState("")
    const { id } = useParams()
    const payment = useRef(null);

    const getDetailOrder = async () => {
        try {
            const order = await api().get(`/transaction/admin/order/${id}`)
            console.log(order.data.data);
            console.log(order.data.data.createdAt);
            setTransaction(order.data.data)
            setDetail(order.data.data.transaction_details)

        } catch (error) {
            console.log(error);
        }
    }

    const downloadImage = async () => {
        try {
            const imageURL = process.env.REACT_APP_URL + transaction.payment_proof;
            const response = await fetch(imageURL);
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "payment_proof";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading image:", error);
        }
    };


    useEffect(() => {
        getDetailOrder()

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
            <NavbarAdmin />
            <div className={"mt-[70px] md:mx-20 lg:mx-32 mx-5 h-full"}
                style={{ minHeight: "100vh" }}>

                <div className="flex text-md lg:text-2xl font-bold pt-10 pb-5">
                    <Link to={'/admin/order-list'}>
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
                                    {transaction.status == "pending" ? <div className={` text-lg grid place-content-center rounded-xl font-bold bg-yellow-300 p-1`}>{transaction.status.toUpperCase()}</div> : null}
                                    {transaction.status == "waiting for payment approval" ? <div className={` lg:flex-1 lg:text-md text-sm ml-2 grid place-content-center rounded-xl font-bold bg-yellow-300 p-2`}>WAITING FOR APPROVAL</div> : null}
                                    {transaction.status == "canceled" ? <div className={` lg:flex-1 text-xl grid place-content-center rounded-xl font-bold bg-red-400 p-2`}>{transaction.status.toUpperCase()}</div> :
                                        null
                                    }
                                </div>
                            </div>

                            <div className="w-[300px] h-[400px]">
                                Payment Proof:
                                <div>
                                    <img src={process.env.REACT_APP_URL + `${transaction.payment_proof}`} alt="" />
                                </div>
                            </div>

                            <button
                                className="ml-2 text-green-500 hover:underline focus:outline-none"
                                onClick={downloadImage}
                            >
                                Download Image
                            </button>

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
                    <OrderDetailsSection transaction={transaction}
                        fetchData={getDetailOrder}
                        id={id} />
                </div>
            </div>

            <Footer />

        </div>
    )
}
export default AdminOrderDetail
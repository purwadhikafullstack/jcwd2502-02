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
import DeleteConfirmation from "../../components/deleteModal";

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
    console.log(detail);

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


                            {transaction.payment_proof ?
                                <div>
                                    <div className="">
                                        <div onClick={() => document.getElementById('my_modal_1').showModal()} className="flex justify-evenly  btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900">

                                            <div className="  grid place-content-center p=5 text-xl font-bold">View Payment Proof</div>
                                        </div>

                                        <dialog id="my_modal_1" className="modal">
                                            <div className="modal-box">
                                                <div className="">
                                                    <img className="" src={process.env.REACT_APP_URL + `${transaction.payment_proof}`} alt="" />
                                                </div>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn">Close</button>
                                                    </form>
                                                    <button
                                                        className="btn"
                                                        onClick={downloadImage}
                                                    >
                                                        Download Image
                                                    </button>
                                                </div>
                                            </div>
                                        </dialog>
                                    </div>
                                    {transaction.status == "waiting for payment approval" ?
                                        <div className="flex mt-3 justify- gap-3">
                                            <div className="w-full">
                                                <DeleteConfirmation
                                                    itemId={id}
                                                    onDelete={getDetailOrder}
                                                    apiEndpoint="transaction/admin/cancel"
                                                    text={""}
                                                    message={"Order Canceled"}
                                                    textOnButton={"Yes"}
                                                    button={<div className=" btn hover:bg-red-400 bg-red-600 text-white w-full border-none ">
                                                        CANCEL ORDER
                                                    </div>} />
                                            </div>
                                            <div className="w-full">
                                                <DeleteConfirmation
                                                    itemId={id}
                                                    onDelete={getDetailOrder}
                                                    apiEndpoint="transaction/admin/cancel-payment"
                                                    text={""}
                                                    message={"Payment Declined"}
                                                    textOnButton={"Yes"}
                                                    button={<div className=" btn hover:bg-orange-400 bg-orange-700 text-white w-full border-none ">
                                                        Decline Payment Proof
                                                    </div>} />
                                            </div>
                                            <div className="w-full">
                                                <DeleteConfirmation
                                                    itemId={id}
                                                    onDelete={getDetailOrder}
                                                    apiEndpoint="transaction/admin/approve"
                                                    text={""}
                                                    message={"Order Approved"}
                                                    textOnButton={"Yes"}
                                                    button={<div className=" btn hover:bg-green-400 bg-green-600 text-white w-full border-none ">
                                                        APPROVE ORDER
                                                    </div>} />
                                            </div>
                                        </div>
                                        : null}


                                </div>
                                : null}

                            {transaction.status == "Payment Approved" ?
                                <div className="w-full">
                                    <div className="flex mt-3 justify- gap-3">
                                        <div className="w-full">
                                            <DeleteConfirmation
                                                itemId={id}
                                                onDelete={getDetailOrder}
                                                apiEndpoint="transaction/admin/cancel-send"
                                                text={""}
                                                message={"Order Canceled"}
                                                textOnButton={"Yes"}
                                                button={<div className=" btn hover:bg-red-600 bg-red-600 text-white w-full border-none ">
                                                    CANCEL ORDER
                                                </div>} />
                                        </div>
                                        <div className="w-full">
                                            <DeleteConfirmation
                                                itemId={id}
                                                onDelete={getDetailOrder}
                                                apiEndpoint="transaction/admin/send"
                                                text={""}
                                                message={"Order Sent"}
                                                textOnButton={"Yes"}
                                                button={<div className=" btn hover:bg-green-600 bg-green-600 text-white w-full border-none ">
                                                    SEND ORDER
                                                </div>} />
                                        </div>
                                    </div>
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
            </div>

            <Footer />

        </div>
    )
}
export default AdminOrderDetail
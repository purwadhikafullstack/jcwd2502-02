import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import OrderComponent from "../../components/orderComponent"
import { BiSearchAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import moment from 'moment';


const SuperOrderList = () => {
    const [invoice, setInvoice] = useState("");
    const [status, setStatus] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [orderData, setOrderData] = useState([]);


    const handleDate = (event) => {
        try {
            setCreatedAt(event.target.value);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await api().get(`/transaction/all?invoice=${invoice}&page=${page}&status=${status}&createdAt=${createdAt}`)

            console.log(response.data.orders);

            setMaxPage(response.data.maxPages);

            setOrderData(response.data.orders);

            // Simulate a toast notification for demonstration purposes
            toast.success("Data fetched successfully!");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        handleSearch()
    }, [])

    console.log(maxPage);

    return (
        <div>
            <Toaster />
            <Navbar />

            <div className="mt-[70px] md:mx-20 lg:mx-32 mx-5 h-full">

                <div className="flex text-5xl font-bold gap-2 py-5 pl-5 text-green-800">Order List
                </div>

                <div className="mb-10 lg:flex border-l-4 border-r-4 border-l-yellow-300 border-r-green-600 lg:gap-3 p-3 shadow-xl rounded-2xl lg:justify-center">
                    <div className="border-2 flex rounded-xl bg-white md:h-[48px] my-3">
                        <div className="flex items-center pl-2 text-green-800"><BiSearchAlt /></div>
                        <input type="text" className="lg:grid lg:place-content-center outline-none rounded-full w-full lg:w-[500px] text-lg pl-2" placeholder=" Search your order invoice" />
                    </div>
                    <div className="flex justify-between my-3">
                        <div className="grid place-content-center">
                            <select className="h-[48px] px-2 border-2 rounded-xl w-[90px] lg:w-[200px]">
                                <option disabled selected>Status</option>
                                <option>PENDING</option>
                                <option>APPROVED</option>
                                <option>DELIVERY</option>
                                <option>ARRIVED</option>
                                <option>COMPLETE</option>
                            </select>
                        </div>
                        <div className="grid place-content-center"><input onChange={(e) => handleDate(e)} type="date" className=" p-2 rounded-xl border-2 h-[48px] ml-3 lg:w-[200px]" /></div>
                        <div className="w-[70px] h-[48px] grid place-content-center text-lg lg:text-xl hover:underline ml-3 text-green-700 font-black">Reset</div>
                    </div>
                </div>

                <div className="mt-12 h-[5px] bg-gradient-to-r from-yellow-300 to-green-600 my-10 rounded-full"></div>


                <div className="grid gap-3 mb-10">
                    {orderData ? orderData.map((value, index) => {
                        return (
                            <div key={index}>
                                <OrderComponent
                                    status={value.status}
                                    invoice={value.invoice}
                                    total={value.final_total.toLocaleString()}
                                    date={moment(value.createdAt).format('dddd, Do MMMM YYYY')} />

                            </div>
                        )
                    }) : null}

                </div>

            </div>

            <Footer />

        </div>
    )
}

export default SuperOrderList
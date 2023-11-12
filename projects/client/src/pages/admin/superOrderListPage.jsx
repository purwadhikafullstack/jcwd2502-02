import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import OrderComponent from "../../components/orderComponent"
import { BiSearchAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import moment from 'moment';
import debounce from 'lodash/debounce';
import PaginationFixed from "../../components/paginationComponent";

const SuperOrderList = () => {
    const [invoice, setInvoice] = useState("");
    const [status, setStatus] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [orderData, setOrderData] = useState([]);

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const handleReset = () => {
        try {
            setInvoice(""); setStatus(""); setCreatedAt(""); setPage(1); setMaxPage(1); handleSearch();
        } catch (error) {
            console.log(error);
        }
    }

    const handleStatus = (event) => {
        try {
            setPage(1);
            setStatus(event.target.value)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDate = (event) => {
        try {
            setPage(1);
            setCreatedAt(event.target.value);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInvoice = debounce((event) => {
        console.log(event);
        setInvoice(event);
    }, 1000);

    const handleSearch = async () => {
        try {
            const response = await api().get(`/transaction/all?invoice=${invoice}&page=${page}&status=${status}&createdAt=${createdAt}`)
            console.log(response.data.orders);
            setMaxPage(response.data.maxPages);
            setOrderData(response.data.orders);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= maxPage) {
            setPage(newPage);
            await handleSearch();
        } else {
            toast.error("Invalid page number!");
        }
    };

    const handleNextPage = () => {
        handlePageChange(page + 1);
    };

    const handlePrevPage = () => {
        handlePageChange(page - 1);
    };

    useEffect(() => {
        handleSearch()
    }, [createdAt, status, invoice, page])

    const testing = (value) => {
        try {
            console.log(value);
        } catch (error) {
            console.log(error);
        }
    }
    console.log("ini page", page);

    return (
        <div>
            <Toaster />
            <Navbar />

            <div className={"mt-[70px] md:mx-20 lg:mx-32 mx-5 h-full"}>

                <div className="flex text-5xl font-bold gap-2 py-5 text-green-800">Order List
                </div>

                <div className="mb-10 lg:flex border-l-4 border-r-4 border-l-yellow-300 border-r-green-600 lg:gap-3 p-3 shadow-xl rounded-2xl lg:justify-center">
                    <div className="border-2 flex rounded-xl bg-white md:h-[48px] my-3 lg:w-[350px]">
                        <div className="flex items-center pl-2 text-green-800"><BiSearchAlt /></div>
                        <input onChange={(e) => handleInvoice(e.target.value)} type="text" className="lg:grid lg:place-content-center outline-none rounded-full w-full lg:w-[500px] text-lg pl-2" placeholder=" Search your order invoice" />
                    </div>

                    <div className="flex gap-2 justify-between lg:overflow-none overflow-x-auto my-3">
                        <div className="grid place-content-center">
                            <select defaultValue="" className="h-[48px] px-2 border-2 rounded-xl w-[170px] lg:w-[200px]">
                                <option value={""} disabled selected>Store Branch</option>
                                <option >Branch xxx</option>
                                <option >Branch xxx</option>
                            </select>
                        </div>

                        <div className="grid place-content-center">
                            <select defaultValue="" value={status} onChange={(e) => handleStatus(e)} className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[200px]">
                                <option value={""} disabled selected>Status</option>
                                <option value={"canceled"} >CANCEL</option>
                                <option value={"pending"} >PENDING</option>
                                <option value={"appproved"}>APPROVED</option>
                                <option value={"delivery"}>DELIVERY</option>
                                <option value={"arrived"}>ARRIVED</option>
                                <option value={"complete"}>COMPLETE</option>
                            </select>
                        </div>

                        <div className="grid place-content-center"><input value={createdAt} onChange={(e) => handleDate(e)} type="date" className="w-[200px] p-2 rounded-xl border-2 h-[48px] lg:w-[200px]" /></div>
                        <div className="grid place-content-center">
                            <div onClick={handleReset} className=" w-[70px] h-[48px] grid place-content-center text-lg lg:text-xl hover:underline  text-green-700 font-black">Reset</div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 h-[5px] bg-gradient-to-r from-yellow-300 to-green-600 my-10 rounded-full"></div>


                <div className="grid gap-3 mb-10">
                    {orderData ? orderData.map((value, index) => {
                        return (
                            <div key={index} onClick={() => testing(value.id)}>
                                <OrderComponent
                                    status={value.status}
                                    invoice={value.invoice}
                                    total={value.final_total.toLocaleString()}
                                    date={moment(value.createdAt).format('dddd, Do MMMM YYYY')} />
                            </div>
                        )
                    }) : null}

                    {orderData.length == 0 ? <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Sorry we dont find any order</span>
                    </div> : null}
                </div>

                <div className="flex justify-center mt-4 mb-10">
                    <PaginationFixed
                        page={page}
                        maxPage={maxPage}
                        handlePageChange={handlePageChange}
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                    />
                </div>


            </div>

            <Footer />

        </div>
    )
}

export default SuperOrderList
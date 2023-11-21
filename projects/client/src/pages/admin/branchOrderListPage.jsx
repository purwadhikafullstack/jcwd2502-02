import Navbar from "../../components/navbarUser"
import NavbarAdmin from "../../components/navbarAdmin";
import Footer from "../../components/footer"
import OrderComponent from "../../components/orderComponent"
import { BiSearchAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import moment from 'moment';
import debounce from 'lodash/debounce';
import PaginationFixed from "../../components/paginationComponent";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BranchOrderList = () => {
    const [invoice, setInvoice] = useState("");
    const [status, setStatus] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [orderData, setOrderData] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const branchLocation = useSelector((state) => state.users.store_branch_id);

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
            const response = await api().get(`/transaction/all?invoice=${invoice}&page=${page}&status=${status}&createdAt=${createdAt}&branchId=${branchLocation}`)
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

    return (
        <div >
            <Toaster />
            <NavbarAdmin />
            <div className={"mt-[70px] md:mx-20 lg:mx-32 mx-5 h-full"} style={{ minHeight: "100vh" }}>
                <div className="flex text-5xl font-bold gap-2 py-5 text-green-800">Order List
                </div>
                <div className="mb-10 lg:flex border-l-4 border-r-4 border-l-yellow-300 border-r-green-600 lg:gap-3 p-3 shadow-xl rounded-2xl lg:justify-center">
                    <div className="border-2 flex rounded-xl bg-white md:h-[48px] my-3 lg:w-[350px]">
                        <div className="flex items-center pl-2 text-green-800"><BiSearchAlt /></div>
                        <input onChange={(e) => handleInvoice(e.target.value)} type="text" className="lg:grid lg:place-content-center outline-none rounded-full w-full lg:w-[500px] text-lg pl-2" placeholder=" Search your order invoice number" />
                    </div>
                    <div className="flex gap-2 justify-between lg:overflow-none overflow-x-auto my-3">
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
                            <div key={index} >
                                <OrderComponent
                                    status={value.status}
                                    invoice={value.invoice}
                                    total={value.final_total.toLocaleString()}
                                    date={moment(value.createdAt).format('Do MMMM YYYY')}
                                    details={<Link to={`/admin/order/${value.id}`}>
                                        <div className="lg:flex-1 p-2 my-2 lg:grid lg:place-content-center text-green-600 hover:underline">See Transaction Detail</div></Link>}
                                />
                            </div>
                        )
                    }) : null}
                    {orderData.length == 0 ? <div className="alert alert-error">
                        <span className="flex justify-center">Sorry we dont find any order</span>
                    </div> : null}
                </div>

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

            <Footer />
        </div>
    )
}
export default BranchOrderList
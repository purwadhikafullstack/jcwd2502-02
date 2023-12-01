import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import OrderComponent from "../../components/orderComponent"
import { BiSearchAlt } from "react-icons/bi";
import { useEffect, useState, useRef } from "react";
import { api } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import moment from 'moment';
import PaginationFixed from "../../components/paginationComponent";
import { Link } from "react-router-dom";
import { useDebounce } from 'use-debounce';



const UserOrderList = () => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    const [sortBy, setSortBy] = useState("id");
    const [invoice, setInvoice] = useState("");
    const [status, setStatus] = useState("");
    const [startdate, setStartdate] = useState("");
    const [enddate, setEnddate] = useState(formattedToday);
    const [orderData, setOrderData] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [sort, setSort] = useState('DESC');
    const [branch, setBranch] = useState("")
    const [branches, setBranches] = useState()
    const [debouncedInvoice] = useDebounce(invoice, 1000);

    const getBranches = async () => {
        try {
            const branches = await api().get(`/branch/all`)
            setBranches(branches.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleBranch = (event) => {
        try {
            setPage(1);
            setBranch(event.target.value)
        } catch (error) {
            console.log(error);
        }
    }

    const handleReset = () => {
        try {
            setInvoice(""); setStatus(""); setStartdate(""); setPage(1); setMaxPage(1); handleSearch(); setEnddate(""); setSort("ASC"); setSortBy("id"); setBranch("")
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
            setStartdate(event.target.value);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSort = (event) => {
        try {
            setPage(1);
            setSort(event.target.value);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSortBy = (event) => {
        try {
            setPage(1);
            setSortBy(event.target.value);
        } catch (error) {
            console.log(error);
        }
    };
    const handleEndDate = (event) => {
        try {
            setPage(1);
            setEnddate(event.target.value);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchInvoice = (event) => {
        try {
            setPage(1);
            setInvoice(event)
        } catch (error) {
            console.log(error);
        }
    }
    const handleSearch = async () => {
        try {
            const response = await api().get(`/transaction/user/all?invoice=${invoice}&page=${page}&status=${status}&startdate=${startdate}&enddate=${enddate}&sort=${sort}&sortby=${sortBy}&branchId=${branch}`)
            setMaxPage(response.data.maxPages);
            setOrderData(response.data.orders);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= maxPage) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } else {
            toast.error("Invalid page number!");
        }
    };

    const handleNextPage = () => {
        handlePageChange(page + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevPage = () => {
        handlePageChange(page - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        handleSearch()
        getBranches()
    }, [startdate, debouncedInvoice, status, page, enddate, sortBy, sort, branch])


    return (
        <div >
            <Toaster />
            <Navbar />
            <div className={"mt-[70px] md:mx-20 lg:mx-32 mx-5 h-full"} style={{ minHeight: "100vh" }}>
                <div className="flex text-5xl font-bold gap-2 py-5 text-green-800">My Order List
                </div>
                <div className="mb-10 border-l-4 border-r-4 border-l-yellow-300 border-r-green-600 lg:gap-3 py-5 px-8 shadow-xl rounded-2xl ">
                    <div className="border-2 flex rounded-xl bg-white h-[48px] my-3">
                        <div className="flex items-center pl-2 text-green-800"><BiSearchAlt /></div>
                        <input value={invoice} onChange={(e) => handleSearchInvoice(e.target.value)} type="text" className="lg:grid lg:place-content-center outline-none rounded-full w-full text-lg pl-2" placeholder=" Search invoice number" />
                    </div>
                    <div className="flex justify-between gap-2 lg:overflow-none overflow-x-auto my-3 pb-3">
                        <div className="grid place-content-center">
                            <select defaultValue="" value={status} onChange={(e) => handleStatus(e)} className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[220px]">
                                <option value={""} disabled selected>Status</option>
                                <option value={"canceled"} >CANCEL</option>
                                <option value={"pending"} >PENDING</option>
                                <option value={"waiting for payment approval"} >WAITING APPROVAL</option>
                                <option value={"Payment Approved"}>APPROVED</option>
                                <option value={"Delivered"}>DELIVERY</option>
                                <option value={"Complete"}>COMPLETE</option>
                            </select>
                        </div>

                        <div className="grid place-content-center">
                            <select defaultValue="" value={branch} onChange={(e) => handleBranch(e)} className="h-[48px] px-2 border-2 rounded-xl w-[170px] lg:w-[200px]">
                                <option value={""} disabled selected>Store Branch</option>
                                {branches ? branches.map((value, index) => {
                                    return (
                                        <option value={value.id}> {value.name}</option>
                                    )
                                }) : null}
                            </select>
                        </div>

                        <div className="flex">
                            <div className="flex">
                                <div className="grid place-content-center mr-3 text-xl">from</div>
                                <div className="grid place-content-center"><input value={startdate} max={formattedToday} onChange={(e) => handleDate(e)} type="date" className="w-[200px] p-2 rounded-xl border-2 h-[48px] lg:w-[200px]" />
                                </div>
                            </div>

                            <div className="flex">
                                <div className="grid place-content-center mx-3 text-xl">to</div>
                                <div className="grid place-content-center"><input value={enddate} max={formattedToday} min={startdate} onChange={(e) => handleEndDate(e)} type="date" className="w-[200px] p-2 rounded-xl border-2 h-[48px] lg:w-[200px]" />
                                </div>
                            </div>
                        </div>

                        <div className="grid place-content-center">
                            <select defaultValue="" value={sortBy} onChange={(e) => handleSortBy(e)} className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[150px]">
                                <option value={"id"} disabled selected>Sort By</option>
                                <option value="createdAt"> Date </option>
                                <option value="final_total"> Subtotal </option>
                            </select>
                        </div>
                        <div className="grid place-content-center">
                            <select defaultValue="" value={sort} onChange={(e) => handleSort(e)} className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[80px]">
                                <option value={""} disabled selected>Sort</option>
                                <option value="ASC"> Asc </option>
                                <option value="DESC"> Desc </option>
                            </select>
                        </div>
                        <div className="grid place-content-center">
                            <div onClick={handleReset} className=" w-[70px] h-[48px] grid place-content-center text-lg lg:text-xl hover:underline  text-green-700 font-black">Reset</div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 h-[5px] bg-gradient-to-r from-yellow-300 to-green-600 my-10 rounded-full"></div>
                <div className="grid  gap-3">
                    {orderData ? orderData.map((value, index) => {
                        return (
                            <div key={index}>
                                <OrderComponent
                                    status={value.status}
                                    invoice={value.invoice}
                                    total={value.final_total.toLocaleString()}
                                    date={moment(value.createdAt).format('DD MMMM YYYY')}
                                    details={<Link to={`/order/${value.id}`}>
                                        <div className=" text-green-600 hover:underline">See Details</div></Link>}
                                    store={value.store_branch.name}
                                    image={value.transaction_details[0]?.product?.image}
                                    productName={value.transaction_details[0]?.name}
                                    quantity={value.transaction_details.length > 1 ? `+ ${value.transaction_details.length - 1} Item` : "1 Item"}
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
export default UserOrderList
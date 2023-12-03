import React, { useMemo } from 'react';
import PaginationFixed from "../../components/paginationComponent";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import debounce from 'lodash/debounce';
import ModalTransactionDetail from '../../components/modalTransactionDetail';
import NavbarAdmin from '../../components/navbarAdmin';
import { Link } from 'react-router-dom';
import { BiSearchAlt } from "react-icons/bi";
import Footer from '../../components/footer';
import { useDebounce } from 'use-debounce';
import { useAppSelector } from '../../redux/App/Store';

const SalesReportPage = () => {
    const userSelector = useAppSelector((state) => state.users)
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    const [sortBy, setSortBy] = useState("id");
    const [transactionFilter, setTransactionFilter] = useState("");
    const [data, setData] = useState([]);
    const [cardData, setCardData] = useState([]);
    const [branchList, setBranchList] = useState("")
    const [startDate, setStartDate] = useState(formattedToday);
    const [endDate, setEndDate] = useState("");
    const [branch, setBranch] = useState("");
    const [sort, setSort] = useState('DESC');
    const [username, setUsername] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [debouncedName] = useDebounce(username, 1000);
    const handleTransactionFilter = (event) => {
        setPage(1)
        setTransactionFilter(event.target.value)
    }
    const handleSortBy = (event) => {
        setPage(1)
        setSortBy(event.target.value)
    }
    const handleStartDate = (event) => {
        setPage(1)
        setStartDate(event.target.value);
    };
    const handleEndDate = (event) => {
        setPage(1);
        setEndDate(event.target.value);
    };
    const handleBranch = (event) => {
        setPage(1)
        setBranch(event.target.value);
    };
    const handleSortQuery = (event) => {
        setPage(1)
        setSort(event.target.value);
    };
    const handleUsernameQuery = (event) => {
        setPage(1)
        setUsername(event.target.value);
    };
    const debouncedSearch = debounce((value) => {
        setUsername(value);
    }, 1000);
    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= maxPage) {
            await fetchData(newPage)
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
    function formatRupiah(amount) {
        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        });
        return formatter.format(amount);
    }
    const fetchData = async (page) => {
        const response = await api().get(`/transaction/data/product-transaction?username=${username}&sort=${sort}&startdate=${startDate}&enddate=${endDate}&page=${page}&branch=${branch}&sortby=${sortBy}&transactionstatus=${transactionFilter}`);
        const response2 = await api().get(`/transaction/data/overall-transaction?startdate=${startDate}&enddate=${endDate}&branch=${branch}`)
        const branchData = await api().get('/branch/all')
        setCardData(response2.data.data);
        setBranchList(branchData.data.data);
        setMaxPage(response.data.data.maxPages)
        setData(response.data.data.data);
    }

    const handleReset = () => {
        try {
            setUsername(""); setSort("DESC"); setStartDate(formattedToday); setPage(1); setMaxPage(1); setEndDate(""); setSortBy("id"); setBranch(""); setTransactionFilter("");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData(page)
    }, [debouncedName, sort, startDate, endDate, page, branch, sortBy, transactionFilter])
    return (
        <div >
            <NavbarAdmin />
            <div className='mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32'>
                <div className="">
                    <div className="text-4xl font-bold text-green-800 mb-3 flex">
                        Sales Report {userSelector.role == "admin" ? <div className="text-sm pl-3 flex items-end">({branchList[userSelector?.store_branch_id - 1]?.name})</div> : null}
                    </div>
                </div>
                <div className="overflow-x-auto mt-5 border-b-4 border-green-700">
                    <div role="tablist" className="tabs tabs-lifted tabs-lg">
                        <div role="tab" className="tab lg:text-xl tab-active bg-green-700 text-white rounded-t-xl">Transactions</div>
                        <Link to={`/sales-report/product`}>
                            <div role="tab" className="tab lg:text-xl">Products</div>
                        </Link>
                    </div>
                </div>
                <div className='overflow-x-auto h-[100px] lg:h-auto flex justify-between gap-3 mt-5'>
                    <div className='w-[400px] border-4 bg-yellow-300 border-green-700 rounded-xl p-3'>
                        <div className='grid place-content-start font-medium'>Current Revenue:</div>
                        <div className="grid place-content-end text-3xl font-bold mt-2">
                            <div className='flex'> Rp <div className='pl-3'></div>
                                {cardData ? cardData?.completedOrderRevenue?.toLocaleString() : null
                                }
                                {!cardData || cardData.length === 0 ? (
                                    <span className="loading loading-spinner loading-lg"></span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className='w-[450px] border-4 bg-yellow-300 border-green-700 rounded-xl p-3'>
                        <div className='grid place-content-start font-medium'>Potential Revenue:</div>
                        <div className="grid place-content-end text-3xl font-bold mt-2">
                            <div className='flex'>
                                Rp
                                <div className='pl-3'></div>
                                {cardData ? (
                                    cardData.onGoingOrderRevenue || cardData.completedOrderRevenue ? (
                                        (cardData.onGoingOrderRevenue + cardData.completedOrderRevenue).toLocaleString()
                                    ) : (
                                        <span className="loading loading-spinner loading-lg"></span>
                                    )
                                ) : (
                                    <span className="loading loading-spinner loading-lg"></span>
                                )}
                                <div className='text-sm grid place-content-end pl-3 pb-1'>
                                    (+ Rp {cardData ? cardData?.onGoingOrderRevenue?.toLocaleString() : null
                                    })
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[350px] border-4 bg-yellow-300 border-green-700 rounded-xl p-3 flex justify-between gap-3'>
                        <div className='flex flex-col justify-between pl-2'>
                            <div className=''> Completed Sales: </div>
                            <div className='grid place-content-end text-xl font-bold'>
                                {cardData && cardData.completedOrderCount !== undefined ? cardData.completedOrderCount : <span className="loading loading-spinner loading-lg"></span>}
                            </div>
                        </div>
                        <div className='bg-green-800 w-[3px]'></div>
                        <div className='flex flex-col justify-between pl-2'>
                            <div className=''> Ongoing Sales: </div>
                            <div className='grid place-content-end text-xl font-bold'>
                                {cardData && cardData.totalOrders !== undefined && cardData.completedOrderCount !== undefined
                                    ? cardData.totalOrders - cardData.completedOrderCount
                                    : <span className="loading loading-spinner loading-lg"></span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className='border shadow-lg rounded-2xl overflow-x-auto lg:justify-center mt-5 p-3 border-l-4 border-r-4 border-l-yellow-300 border-r-green-600 mb-5'>
                        <div className="border-2 flex rounded-xl bg-white h-[48px] my-3">
                            <div className="flex items-center pl-2 text-green-800"><BiSearchAlt /></div>
                            <input value={username} onChange={handleUsernameQuery} type="text" className="lg:grid lg:place-content-center outline-none rounded-full w-full text-lg pl-2" placeholder=" Search Customer Name" />
                        </div>
                        <div className='flex gap-5 lg:overflow-none overflow-x-auto my-3'>
                            <div className="flex">
                                <div className="flex">
                                    <div className="grid place-content-center mx-3">from</div>
                                    <div className="grid place-content-center"><input value={startDate} max={formattedToday} onChange={handleStartDate} type="date" className="w-[200px] p-2 rounded-xl border-2 h-[48px] lg:w-[160px]" />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="grid place-content-center mx-3">to</div>
                                    <div className="grid place-content-center"><input value={endDate} max={formattedToday} min={startDate} onChange={handleEndDate} type="date" className="w-[200px] p-2 rounded-xl border-2 h-[48px] lg:w-[160px]" />
                                    </div>
                                </div>
                            </div>
                            <div className='grid place-content-center'>
                                <select name="" id="" className='w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[170px]' onChange={handleTransactionFilter} value={transactionFilter}>
                                    <option value="1"> All sales</option>
                                    <option value="2"> Completed sales</option>
                                    <option value="3"> Ongoing sales</option>
                                </select>
                            </div>
                            <div className='grid place-content-center'>
                                {
                                    userSelector.role == "superadmin" ?
                                        <select name="" id="" onChange={handleBranch} value={branch} className='w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[180px]'>
                                            <option value={""} selected>All Branch</option>
                                            {
                                                branchList && branchList.map((value) => {
                                                    return (
                                                        <option value={value.id}> {value.name} </option>
                                                    )
                                                })
                                            }
                                        </select>
                                        :
                                        null
                                }
                            </div>
                            <div className='flex gap-3'>
                                <div className="flex">
                                    <div className='grid place-content-center mr-2 w-[60px]'>Sort By</div>
                                    <div className=''>
                                        <select defaultValue="" value={sortBy} onChange={handleSortBy} className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[120px]">
                                            <option value={"id"}>Id</option>
                                            <option value="user_id"> Username </option>
                                            <option value="status"> Status </option>
                                            <option value="createdAt"> Date </option>
                                            <option value="final_total"> Subtotal </option>
                                            <option value="store_branch_id"> Branch </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid place-content-center">
                                    <select defaultValue="grid place-content-center" value={sort} onChange={handleSortQuery} className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[80px]">
                                        <option value={""} disabled selected>Sort</option>
                                        <option value="ASC"> ASC </option>
                                        <option value="DESC"> DESC </option>
                                    </select>
                                </div>
                                <div className="grid place-content-center">
                                    <div onClick={() => handleReset()} className=" w-[70px] h-[48px] grid place-content-center text-lg lg:text-xl hover:underline  text-green-700 font-black">Reset</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <div className=''>
                            <div className=''>
                                <table className='w-full table-auto'>
                                    <thead className="">
                                        <tr className="text-md">
                                            <th className="px-4 py-2 text-xl bg-green-700 text-white ">ID</th>
                                            <th className="px-4 py-2 text-xl bg-green-700 text-white">Username</th>
                                            <th className="px-4 py-2 text-xl bg-green-700 text-white">Status</th>
                                            <th className="px-4 py-2 text-xl bg-green-700 text-white">Date</th>
                                            <th className="px-4 py-2 text-xl bg-green-700 text-white">Total</th>
                                            <th className='px-4 py-2 text-xl bg-green-700 text-white'>Branch</th>
                                            <th className="px-4 py-2 text-xl bg-green-700 text-white">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.map((value, index) => (
                                            <tr key={value.id} className="hover:bg-gray-100 py-3">
                                                <td className="px-4 py-3 text-center border-r">{value.id}</td>
                                                <td className="px-4 py-3 text-center border-r">{value.user.username}</td>
                                                <td className="px-4 py-3 text-center border-r">{value.status.toUpperCase()}</td>
                                                <td className="px-4 py-3 text-center border-r">{value.createdAt.split("T")[0]}</td>
                                                <td className="px-4 py-3 text-center border-r">{formatRupiah(value.final_total)}</td>
                                                <td className='px-4 py-3 text-center border-r'> {value.store_branch.name}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <ModalTransactionDetail transactionData={value} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className='flex justify-center mt-3'>
                                    {data.length == 0 ? <div className="alert alert-error flex justify-center w-full">
                                        <span className="flex justify-center">Sorry there are no data yet</span>
                                    </div> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center my-3">
                {
                    data && data.length > 0 ?
                        <PaginationFixed
                            page={page}
                            maxPage={maxPage}
                            handlePageChange={handlePageChange}
                            handlePrevPage={handlePrevPage}
                            handleNextPage={handleNextPage}
                        />
                        :
                        null
                }
            </div>
            <Footer />
        </div>
    )
}

export default SalesReportPage;
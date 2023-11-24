import React, { useMemo } from 'react';
import PaginationFixed from "../../components/paginationComponent";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import debounce from 'lodash/debounce';
import ModalTransactionDetail from '../../components/modalTransactionDetail';

const SalesReportPage = () => {
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
    const [sort, setSort] = useState('ASC');
    const [username, setUsername] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const handleTransactionFilter = (event) => {
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
    useEffect(() => {
        fetchData(page)
    }, [username, sort, startDate, endDate, page, branch, sortBy, transactionFilter])
    return(
        <div className="h-full min-h-screen w-full">
            <div className="flex bg-gradient-to-l from-green-300 to-yellow-300 p-4 justify-center">  
                <div className="flex bg-slate-400 p-3 rounded-xl">
                    <h1 className="flex font-extrabold">User-based Sales Report Page</h1>
                </div>
            </div>
            <div className='bg-gray-300 h-[150px] justify-center flex flex-col lg:flex lg:flex-row items-center gap-8'>
                <div className='flex gap-8'>
                    <div className='h-[100px] w-[300px] border bg-gradient-to-br from-green-300 to-yellow-300 rounded-xl p-5'>
                        <h1 className='xl:text-xl text-sm font-bold '>Total Revenue:</h1>
                        <h1 className='flex xl:text-3xl justify-center text-sm'>{formatRupiah(cardData?.completedOrderRevenue)}</h1>
                    </div>
                    <div className='h-[100px] w-[300px] border bg-gradient-to-br from-green-300 to-yellow-300 rounded-xl p-5'>
                        <h1 className='xl:text-xl text-sm font-bold'>Potential Revenue:</h1>
                        <h1 className='flex xl:text-3xl text-sm justify-center'>{formatRupiah(cardData?.onGoingOrderRevenue)}</h1>
                    </div>
                </div>
                <div className='flex gap-8'>
                    <div className='h-[100px] w-[300px] border bg-gradient-to-br from-green-300 to-yellow-300 rounded-xl p-5'>
                        <h1 className='xl:text-xl text-sm font-bold'>:</h1>
                        <h1 className='flex xl:text-3xl text-sm justify-center'>{"Rp.100,000,00"}</h1>
                    </div>
                    <div className='h-[100px] w-[300px] border bg-gradient-to-br from-green-300 to-yellow-300 rounded-xl p-5'>
                        <h1 className='xl:text-xl text-sm font-bold'> Completed sales: {cardData?.completedOrderCount}</h1>
                        <h1 className='flex xl:text-xl text-sm font-bold'> Ongoing sales: { cardData?.totalOrders - cardData?.completedOrderCount}</h1>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className='w-full mx-3'>
                    <div className='flex justify-around align-middle'>
                        <div className='flex gap-3 justify-center'>
                            <div className='flex gap-3 my-4'>
                                <div>
                                    <input type="text" className='border border-black h-[30px] w-[200px] p-2 rounded-lg' onChange={handleUsernameQuery} value={username} placeholder='look for username' />
                                </div>
                                <div className='flex gap-2'>
                                    <h1> Sort:</h1>
                                    <select name="" id="" onChange={handleSortQuery} className='border border-black rounded-md mb-1'>
                                        <option value="ASC"> Asc </option>
                                        <option value="DESC"> Desc </option>
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <h1> Sort by: </h1>
                                    <select name="" id="" className='text-center border border-black rounded-md mb-1' onChange={handleSortBy}>
                                        <option value="id">Id</option>
                                        <option value="user_id"> Username </option>
                                        <option value="status"> Status </option>
                                        <option value="createdAt"> Date </option>
                                        <option value="final_total"> Subtotal </option>
                                        <option value="store_branch_id"> Branch </option>
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <h1> Filter by branch: </h1>
                                    <select name="" id="" onChange={handleBranch} value={branch} className='mb-1 border border-black rounded-md text-center'>
                                        <option value="">All branch</option>
                                        {
                                            branchList && branchList.map((value) => {
                                                return(
                                                    <option value={value.id}> {value.name} </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <h1> Date range: </h1>
                                    <div className='flex gap-2'>
                                    <input type="date" onChange={handleStartDate} value={startDate} max={formattedToday} />    
                                    <h1>and</h1>
                                    <input type="date" onChange={handleEndDate} value={endDate} max={formattedToday} min={startDate}  />
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md mx-3 shadow-2xl py-4 bg-gradient-to-b from-green-300 to-yellow-300">
                        <div className='mx-4 my-2'>
                            <select name="" id="" className='rounded-md mx-2 py-1' onChange={handleTransactionFilter}>
                                <option value="1"> All sales</option>
                                <option value="2"> Completed sales</option>
                                <option value="3"> Ongoing sales</option>
                            </select>
                        </div>
                        <div className='bg-gray-300 mx-6'>
                            <div className='border'>
                                <table className='w-full table-auto'>
                                    <thead className="border-b-2">
                                        <tr className="text-md">
                                        <th className="px-4 py-2">Transaction ID</th>
                                        <th className="px-4 py-2">Username</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">CreatedAt</th>
                                        <th className="px-4 py-2">Subtotal</th>
                                        <th>Branch</th>
                                        <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.map((value, index) => (
                                        <tr key={value.id} className="hover:bg-gray-100 border-b">
                                            <td className="px-4 py-2 text-center">{value.id}</td>
                                            <td className="px-4 py-2 text-center">{value.user.username}</td>
                                            <td className="px-4 py-2 text-center">{value.status}</td>
                                            <td className="px-4 py-2 text-center">{value.createdAt.split("T")[0]}</td>
                                            <td className="px-4 py-2 text-center">{formatRupiah(value.final_total)}</td>
                                            <td className='px-4 py-2 text-center'> {value.store_branch.name}</td>
                                            <td className="px-4 py-2 text-center">
                                                <ModalTransactionDetail transactionData={value}/>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
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
                </div>
            </div>
        </div>
    )
}

export default SalesReportPage;
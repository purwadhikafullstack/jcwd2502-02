import React, { useMemo } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import PaginationFixed from "../../components/paginationComponent";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import debounce from 'lodash/debounce';

// components
import SortButton from "../../components/sortButton";
import ModalTransactionDetail from '../../components/modalTransactionDetail';

const SalesReportPage = () => {
    const [data, setData] = useState([]);
    const [cardData, setCardData] = useState([]);
    const [branchList, setBranchList] = useState("")
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(formattedToday);
    const handleStartDate = (event) => {
        setPage(1)
        setStartDate(event.target.value);
    };
    const [endDate, setEndDate] = useState("");
    const handleEndDate = (event) => {
        setPage(1);
        setEndDate(event.target.value);
    };
    const [branch, setBranch] = useState("");
    const handleBranch = (event) => {
        setPage(1)
        setBranch(event.target.value);
    };
    const [sort, setSort] = useState('ASC');
    const handleSortQuery = (event) => {
        setSort(event.target.value);
    };
    const [username, setUsername] = useState("");
    const handleUsernameQuery = (event) => {
        setPage(1)
        setUsername(event.target.value);
    };
    const debouncedSearch = debounce((value) => {
        setUsername(value);
    }, 1000);
    const [days, setDays] = useState("");
    const handleDaysQuery = (event) => {
        setDays(event.target.value);
    };
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
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
        // const response = await api().get(`/transaction/data/transactions?username=${username}&sort=${sort}&days=${days}&page=${page}`)
        const response = await api().get(`/transaction/data/product-transaction?username=${username}&sort=${sort}&startdate=${startDate}&enddate=${endDate}&page=${page}&branch=${branch}`);
        const response2 = await api().get(`/transaction/data/overall-transaction?startdate=${startDate}&enddate=${endDate}&branch=${branch}`)
        const branchData = await api().get('/branch/all')
        setCardData(response2.data.data);
        setBranchList(branchData.data.data);
        setMaxPage(response.data.data.maxPages)
        setData(response.data.data.data);
    }

    useEffect(() => {
        fetchData(page)
    }, [username, sort, startDate, endDate, page, branch])

    console.log(startDate, endDate);
    console.log(`****`);
    console.log(cardData);

    return(
        <div className="h-[1000px] w-screen">
            {/* Page title */}
            <div className="flex bg-gradient-to-l from-green-300 to-yellow-300 p-4 justify-center">  
                <div className="flex bg-slate-400 p-3 rounded-xl">
                    <h1 className="flex font-extrabold">User-based Sales Report Page</h1>
                </div>
            </div>
            {/* Page body */}
            <div className='bg-gray-300 h-[150px] justify-center flex items-center gap-12'>
                <div className='h-[120px] w-1/6 border bg-gradient-to-br from-green-300 to-yellow-300 rounded-xl p-5'>
                    <h1 className='xl:text-xl text-sm font-bold '>Total Revenue:</h1>
                    <h1 className='flex xl:text-3xl justify-center text-sm'>{formatRupiah(cardData?.completedOrderRevenue)}</h1>
                </div>
         <div className='h-[120px] w-1/6 border bg-gradient-to-br from-green-300 to-yellow-300 rounded-xl p-5'>
                    <h1 className='xl:text-xl text-sm font-bold'>Potential Revenue:</h1>
                    <h1 className='flex xl:text-3xl text-sm justify-center'>{formatRupiah(cardData?.onGoingOrderRevenue)}</h1>
                </div>
             <div className='h-[120px] w-1/6 border bg-gradient-to-br from-green-300 to-yellow-300 rounded-xl p-5'>
                    <h1 className='xl:text-xl text-sm font-bold'>:</h1>
                    <h1 className='flex xl:text-3xl text-sm justify-center'>{"Rp.100,000,00"}</h1>
                </div>
             <div className='h-[120px] w-1/6 border bg-gradient-to-br from-green-300 to-yellow-300 rounded-xl p-5'>
                    <h1 className='xl:text-xl text-sm font-bold'>Completed orders:</h1>
                    <h1 className='flex xl:text-3xl text-sm justify-center'>{cardData?.completedOrderCount}</h1>
                </div>
            </div>
            <div className="flex">
                <div className='w-full mx-3'>
                    <div className='flex justify-around items-center'>
                        <input type="text" className='border border-black h-[50px] w-[200px] p-2 rounded-lg' onChange={handleUsernameQuery} value={username} />
                        {/* <Searchbar value={username} onChange={(e) => debouncedSearch(e.target.value)} /> */}
                        <div className='flex h-fit m-6 gap-3'>
                            <div>
                                <SortButton onChange={handleSortQuery} value1={"DESC"} value2={"ASC"} className="border" />
                            </div>
                        </div>
                        <div>
                            <div className='flex gap-2'>
                                <h1> Filter by branch: </h1>
                                <select name="" id="" onChange={handleBranch} value={branch}>
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
                        </div>
                        <div className='flex gap-3'>
                            <h1> Date range:</h1>
                            <div className='flex flex-col'>
                                <div className='flex gap-2'>
                                    <h1>from</h1>
                                    <input type="date" className='' onChange={handleStartDate} value={startDate} max={formattedToday} />
                                </div>
                                <div className='flex gap-2'>
                                    <h1>to</h1>
                                    <input type="date" onChange={handleEndDate} value={endDate} max={formattedToday} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md m-3 shadow-2xl py-4 bg-gradient-to-b from-green-300 to-yellow-300">
                        <h1 className='shadow-2xl bg-gradient-to-l from-yellow-500 to-green-500 w-fit p-1 rounded-lg mx-4 text-black'>Sales Data</h1>
                        <div className='p-2 rounded-lg overflow-x-auto'>                            
                        </div>
                        {/* table baru Daisy UI */}
                        <div className='bg-gray-300 mx-6'>
                            <div className='border'>
                                <table className='w-full table-auto'>
                                    <thead className="border-b-2">
                                        <tr className="text-md">
                                        <th className="px-4 py-2">Transaction ID</th>
                                        <th className="px-4 py-2">User</th>
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
                                            <td className="px-4 py-2 text-center">{value.final_total}</td>
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
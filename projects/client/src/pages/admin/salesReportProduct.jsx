import { useEffect, useState } from "react";
import { api } from "../../api/api";
import NavbarAdmin from "./../../components/navbarAdmin"
import React from 'react';
import PaginationFixed from "../../components/paginationComponent";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesReportProduct = () => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    const [sortHow, setSortHow] = useState("ASC");
    const [sortBy, setSortBy] = useState("name");
    // const [transactionFilter, setTransactionFilter] = useState("");
    const [data, setData] = useState([]);
    // const [cardData, setCardData] = useState([]);
    const [branchList, setBranchList] = useState("")
    const [startDate, setStartDate] = useState(formattedToday);
    const [endDate, setEndDate] = useState("");
    const [branch, setBranch] = useState("");
    const [sort, setSort] = useState('ASC');
    const [name, setName] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const handleSortQuery = (event) => {
        setSort(event.target.value);
    };
    const handleNameQuery = (event) => {
        setName(event.target.value)
    }
    const handleSortBy = (event) => {
        setSortBy(event.target.value)
    }
    const handleBranch = (event) => {
        setPage(1)
        setBranch(event.target.value);
    };
    const handleStartDate = (event) => {
        setPage(1)
        setStartDate(event.target.value);
    };
    const handleEndDate = (event) => {
        setPage(1);
        setEndDate(event.target.value);
    };
    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= maxPage) {
            // await fetchData(newPage)
            setPage(newPage);
        } else {
            // toast.error("Invalid page number!");
        }
    };
    const handleNextPage = () => {
        handlePageChange(page + 1);
    };
    const handlePrevPage = () => {
        handlePageChange(page - 1);
    };

    const fetchData = async () => {
        try {
            const data = await api().get(`report/data?sortHow=${sort}&sortBy=${sortBy}&productName=${name}&branch=${branch}&startDate&endDate&page=${page}`);
            console.log(data);
            setData(data.data.data.dataFinal);
            setMaxPage(data.data.data.maxPages)
        } catch (error) {
            console.log(error);   
        }
    }

    const chartData = Object.entries(data).map(([item, quantity]) => ({
        item,
        quantity,
    }));

    function formatRupiah(amount) {
        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        });
        return formatter.format(amount);
    }

    useEffect(() => {
        fetchData()
    }, [sortHow, sortBy, startDate, endDate, sort, name,page])

    return (
        <div className="bg-white w-screen h-full min-h-screen">
            {/* Header */}
            <NavbarAdmin />
            <div className="border bg-gradient-to-l to-yellow-300 from-green-300 flex justify-center p-2 shadow-2xl mt-6">
                <h1 className="text-lg">Product Sales Report</h1>
            </div>
            {/* Body */}
            <div className="bg-gray-400 p-2 flex justify-center">
                <div className='flex gap-3 my-4'>
                    <div>
                        <input type="text" className='border border-black h-[30px] w-[200px] p-2 rounded-lg' onChange={handleNameQuery} placeholder='look up product names' />
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
                            <option value="name"> Product </option>
                            <option value="price"> Price </option>
                            <option value="quantity"> Quantity </option>
                            <option value="total_sales"> Profit </option>
                        </select>
                    </div>
                    <div className='flex gap-2'>
                        <h1> Filter by branch: </h1>
                        <select name="" id="" onChange={handleBranch} value={branch} className='mb-1 border border-black rounded-md text-center'>
                            <option value="">All branch</option>
                            {
                                branchList && branchList.map((value) => {
                                    return (
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
                            <input type="date" onChange={handleEndDate} value={endDate} max={formattedToday} min={startDate} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h1>Filtering by {sort} {name} {startDate} {endDate} {sortHow} {sortBy}</h1>
                </div>
            </div>
            <div>
                <div className="m-6 border">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th> Product </th>
                                <th className=""> Category </th>
                                <th className=""> Price </th>
                                <th className=""> Amount Sold </th>
                                <th className=""> Profit </th>
                                <th className=""> Store Branch </th>
                                <th className=""> Date </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.map((value) => {
                                    return(
                                        <tr key={value.id}>
                                            <td className="text-center">{value.name}</td>
                                            <td className="text-center">{value.product.product_category.name}</td>
                                            <td className="text-center"> {formatRupiah(value.price)} </td>
                                            <td className="text-center"> {value.quantity_total} </td>
                                            <td className="text-center"> {formatRupiah(value.total_sales)} </td>
                                            <td className="text-center"> {value.store_branch_id} </td> 
                                            <td className="text-center"> {value.date.split("T")[0]} </td>
                                        </tr>
                                    )
                                })
                                // :
                                // <h1> There are no data to display </h1>
                            }
                        </tbody>
                    </table>
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
            {/* <div className="h-[500px] w-[1000px] m-4 border border-black rounded-xl">
                <h1> Quantity of products sold by type </h1>
                <ResponsiveContainer width="90%" height="100%">
                    <LineChart width={300} height={800} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <Line type="monotone" dataKey="total_sales" stroke="#8884d8" strokeWidth={2} />
                        <XAxis dataKey="name" interval="preserveStartEnd" tick={{ textAnchor: 'center' }} />
                        <YAxis dataKey="total_sales" domain={[0, 1500000]} />
                        <Tooltip />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </div> */}
        </div>
    )
}

export default SalesReportProduct;
import { useEffect, useState } from "react";
import { api } from "../../api/api";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const SalesReportProduct = () => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    const [sortHow, setSortHow] = useState("ASC");
    const [sortBy, setSortBy] = useState("");
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
        const data = await api().get(`/report/data?sortHow=${sort}&sortBy=${sortBy}&productName=${name}&branch=${branch}&startDate=${startDate}&endDate=${endDate}`);
        console.log(`ngambil data`);
        setData(data.data.data.quantityResult);
    }

    const chartData = Object.entries(data).map(([item, quantity]) => ({
        item,
        quantity,
    }));

    useEffect(() => {
        fetchData()
    }, [sortHow, sortBy, startDate, endDate, sort, name, ])

    const dummyData = [
        {
            name: "Anggur Merah Seedless",
            quantitySold: "10"
        },
        {
            name: "Alpukat Mentega",
            quantitySold: "44"
        },
        {
            name: "Greenfields Susu UHT Skimmed",
            quantitySold: "1"
        },
        {
            name: "Ultramilk Full Cream",
            quantitySold: "3"
        },
    ]
    return(
        <div className="bg-white w-screen h-full min-h-screen">
            {/* Header */}
            <div className="border bg-gradient-to-l to-yellow-300 from-green-300 flex justify-center p-2 shadow-2xl">
                <h1 className="text-lg">Product Sales Report</h1>
            </div>
            {/* Body */}
            <div className="bg-gray-400 p-2 flex justify-center">
                {/* Table Controls */}
                {/* <input type="text" className="mx-2"/>
                <select name="" id="">
                    <option value=""> Filter by Dates </option>
                    <option value=""> Newest </option>
                    <option value=""> Oldest </option>
                </select> */}
                <div className='flex gap-3 my-4'>
                    <div>
                        <input type="text" className='border border-black h-[30px] w-[200px] p-2 rounded-lg' onChange={handleNameQuery} placeholder='look for username' />
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
            <div>
                <div>
                        <h1>Filtering by {sort} {name} {startDate} {endDate} {sortHow} {sortBy}</h1>
                </div>
            </div>
            <div className="h-[300px] w-[1000px] m-4 border border-black rounded-xl">
                <h1> Quantity of products sold by type </h1>
                <ResponsiveContainer width="90%" height="100%">
                    <LineChart width={300} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <Line type="monotone" dataKey="quantitySold" stroke="#8884d8" strokeWidth={2} />
                        <XAxis dataKey="name" interval="preserveStartEnd" tick={{textAnchor: 'center'}}/>
                        <YAxis dataKey="quantitySold" domain={[0, 60]}/>
                        <Tooltip />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default SalesReportProduct;
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import NavbarAdmin from "./../../components/navbarAdmin"
import React from 'react';
import PaginationFixed from "../../components/paginationComponent";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import Footer from "../../components/footer";
import { useAppSelector } from '../../redux/App/Store';
import { useDebounce } from 'use-debounce';


const SalesReportProduct = () => {
    const userSelector = useAppSelector((state) => state.users)
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    const [sortBy, setSortBy] = useState("name");
    const [data, setData] = useState([]);
    const [branchList, setBranchList] = useState("")
    const [startDate, setStartDate] = useState(formattedToday);
    const [endDate, setEndDate] = useState("");
    const [branch, setBranch] = useState("");
    const [sort, setSort] = useState('ASC');
    const [name, setName] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [debouncedName] = useDebounce(name, 1000);

    const handleSortQuery = (event) => {
        setPage(1)
        setSort(event.target.value);
    };
    const handleNameQuery = (event) => {
        setPage(1)
        setName(event.target.value)
    }
    const handleSortBy = (event) => {
        setPage(1)
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

    const handleReset = () => {
        try {
            setSort(""); setStartDate(""); setPage(1); setMaxPage(1); setEndDate(""); setSort("ASC"); setSortBy("name"); setBranch(""); setName("");
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        try {
            const data = await api().get(`report/data?sortHow=${sort}&sortBy=${sortBy}&productName=${name}&branch=${branch}&startDate=${startDate}&endDate=${endDate}&page=${page}`);
            const branchData = await api().get('/branch/all')
            setBranchList(branchData.data.data);
            setData(data.data.data.dataFinal);
            setMaxPage(data.data.data.maxPages)
            console.log(data.data.data.dataFinal);
        } catch (error) {
            console.log(error);
        }
    }

    function formatRupiah(amount) {
        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        });
        return formatter.format(amount);
    }

    useEffect(() => {
        fetchData()
    }, [sortBy, startDate, endDate, sort, debouncedName, page, branch])
    console.log(data);

    return (
        <div className="">
            <NavbarAdmin />
            <div className="mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32">
                <div className="text-4xl font-bold text-green-800 mb-3 flex">
                    Sales Report {userSelector.role == "admin" ? <div className="text-sm pl-3 flex items-end">({branchList[userSelector?.store_branch_id - 1]?.name})</div> : null}
                </div>
                <div className="overflow-x-auto mt-5 border-b-4 border-green-700">
                    <div role="tablist" className="tabs tabs-lifted tabs-lg">
                        <Link to={`/sales-report/user`}>
                            <div role="tab" className="tab lg:text-xl ">Transactions</div>
                        </Link>
                        <div role="tab" className="tab tab-active bg-green-700 text-white rounded-t-xl lg:text-xl">Products</div>
                    </div>
                </div>
                <div className="border shadow-lg rounded-2xl overflow-x-auto lg:justify-center mt-5 p-3 border-l-4 border-r-4 border-l-yellow-300 border-r-green-600 mb-5">
                    <div className="border-2 flex rounded-xl bg-white h-[48px] my-3">
                        <div className="flex items-center pl-2 text-green-800"><BiSearchAlt /></div>
                        <input onChange={handleNameQuery} value={name} type="text" className="lg:grid lg:place-content-center outline-none rounded-full w-full text-lg pl-2" placeholder=" Search Product Name" />
                    </div>
                    <div className="flex gap-3 lg:overflow-none justify-center overflow-x-auto my-3">
                        <div className="flex">
                            <div className="flex">
                                <div className="grid place-content-center mx-3">from</div>
                                <div className="grid place-content-center"><input value={startDate} max={formattedToday} onChange={handleStartDate} type="date" className="w-[200px] p-2 rounded-xl border-2 h-[48px] lg:w-[180px]" />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="grid place-content-center mx-3">to</div>
                                <div className="grid place-content-center"><input value={endDate} max={formattedToday} min={startDate} onChange={handleEndDate} type="date" className="w-[200px] p-2 rounded-xl border-2 h-[48px] lg:w-[180px]" />
                                </div>
                            </div>
                        </div>
                        {
                            userSelector?.role === "superadmin" ?
                                <div className='grid place-content-center'>
                                    <select name="" id="" onChange={handleBranch} value={branch} className='w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[220px]'>
                                        <option value={""} selected>All Branch</option>
                                        {
                                            branchList && branchList.map((value) => {
                                                return (
                                                    <option value={value.id}> {value.name} </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                :
                                null
                        }
                        <div className="flex">
                            <div className='grid place-content-center mr-2 w-[60px]'>Sort By</div>
                            <div className=''>
                                <select defaultValue="" value={sortBy} onChange={handleSortBy} className="w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[150px]">
                                    <option value="name"> Product </option>
                                    <option value="price"> Price </option>
                                    <option value="quantity_total"> Quantity </option>
                                    <option value="total_sales"> Profit </option>
                                    <option value="date"> Date </option>
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
                            <div className=" w-[70px] h-[48px] grid place-content-center text-lg lg:text-xl hover:underline  text-green-700 font-black" onClick={handleReset}>Reset</div>
                        </div>

                    </div>

                </div>
                <div className="overflow-x-auto">
                    <div className=''>
                        <div className=''>
                            <table className='w-full table-auto'>
                                <thead className="">
                                    <tr className="text-md">
                                        <th className="px-4 py-2 text-xl bg-green-700 text-white ">Product</th>
                                        <th className="px-4 py-2 text-xl bg-green-700 text-white">Category</th>
                                        <th className="px-4 py-2 text-xl bg-green-700 text-white">Price</th>
                                        <th className="px-4 py-2 text-xl bg-green-700 text-white">Amount Sold </th>
                                        <th className="px-4 py-2 text-xl bg-green-700 text-white">Profit</th>
                                        <th className='px-4 py-2 text-xl bg-green-700 text-white'>Store Branch</th>
                                        <th className='px-4 py-2 text-xl bg-green-700 text-white'>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data ? data.map((value, index) => (
                                        <tr key={value.id} className="hover:bg-gray-100 py-3">
                                            <td className="px-4 py-3 text-center border-r">{value.name}</td>
                                            <td className="px-4 py-3 text-center border-r">{value.product.product_category.name}</td>
                                            <td className="px-4 py-3 text-center border-r">{formatRupiah(value.price)} </td>
                                            <td className="px-4 py-3 text-center border-r">{value.quantity_total}</td>
                                            <td className="px-4 py-3 text-center border-r">{formatRupiah(value.total_sales)}</td>
                                            <td className="px-4 py-3 text-center border-r">{value.transaction.store_branch.name} </td>
                                            <td className="px-4 py-3 text-center border-r">{value.date.split("T")[0]} </td>
                                        </tr>
                                    )) :
                                        null
                                    }

                                </tbody>
                            </table>
                            <div className='flex justify-center mt-3'>
                                {data.length == 0 ? <div className="alert alert-error flex justify-center w-full">
                                    <span className="flex justify-center">Sorry there are no data yet</span>
                                </div> : null}
                            </div>
                            <div className='flex justify-center m-3'>
                                {/* {data.length == 0 ? <div className="alert alert-error flex justify-center w-[600px]">
                                    <span className="flex justify-center">Sorry there are no data just yet</span>
                                </div> : null} */}
                            </div>
                        </div>
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

export default SalesReportProduct;
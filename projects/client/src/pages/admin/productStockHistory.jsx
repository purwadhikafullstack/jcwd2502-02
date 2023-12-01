import { useEffect, useState } from "react";
import { api } from "../../api/api";
import PaginationFixed from "../../components/paginationComponent";
import { useAppSelector } from '../../redux/App/Store';
import toast, { Toaster } from "react-hot-toast";
import NavbarAdmin from "../../components/navbarAdmin";
import Footer from "../../components/footer";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import debounce from 'lodash/debounce';


const ProductStockHistoryPage = () => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    const [stockData, setStockData] = useState("");
    const [nameQuery, setNameQuery] = useState("");
    const [descQuery, setDescQuery] = useState("");
    const [branchQuery, setBranchQuery] = useState("");
    const userSelector = useAppSelector((state) => state.users);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [branchList, setBranchList] = useState([]);

    const [sort, setSort] = useState("DESC");

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const handleReset = () => {
        try {
            setNameQuery(""); setBranchQuery(""); setDescQuery(""); setStartDate(formattedToday); setSort("DESC"); setEndDate(""); setPage(1);
        } catch (error) {
            console.log(error);
        }
    }
    const handleNameQuery = (event) => {
        setPage(1)
        setNameQuery(event.target.value);
    };
    const handleDescQuery = (event) => {
        setPage(1)
        setDescQuery(event.target.value);
    };
    const handleBranchQuery = (event) => {
        setPage(1)
        setBranchQuery(event.target.value);
    };
    const handleStartDate = (event) => {
        setPage(1)
        setStartDate(event.target.value);
    };
    const handleEndDate = (event) => {
        setPage(1);
        setEndDate(event.target.value);
    };
    const handleSort = (event) => {
        setPage(1);
        setSort(event.target.value)
    }

    const fetchData = async () => {
        const response = await api().get(`/stock/history?product=${nameQuery}&branch=${branchQuery}&description=${descQuery}&startDate=${startDate}&endDate=${endDate}&sort=${sort}&page=${page}`)
        const branchData = await api().get('/branch/all');
        setBranchList(branchData.data.data);
        setMaxPage(response.data.data.maxPages);
        setStockData(response.data.data.productStockHistory);
    }
    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= maxPage) {
            setPage(newPage);
            await fetchData()
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
        fetchData()
    }, [nameQuery, descQuery, branchQuery, startDate, endDate, sort, page]);
    return (
        <div className="">
            <NavbarAdmin />
            <Toaster />
            <div className="mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32">
                <div className="">
                    <div className="">
                        <div className="text-4xl font-bold text-green-800 mb-3">
                            Stock History                        </div>
                    </div>
                    <div className="border shadow-lg rounded-2xl overflow-x-auto lg:justify-center mt-5 p-3 border-l-4 border-r-4 border-l-yellow-300 border-r-green-600 mb-5">
                        <div className="w-full">
                            <div className="border-2 flex rounded-xl bg-white h-[48px] my-3">
                                <div className="flex items-center pl-2 text-green-800"><BiSearchAlt /></div>
                                <input value={nameQuery} onChange={handleNameQuery} type="text" className="lg:grid lg:place-content-center outline-none rounded-full w-full text-lg pl-2" placeholder="Search Product Name" />
                            </div>
                        </div>
                        <div className="flex lg:justify-center">
                            <div className="flex">
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
                            </div>
                            <div className="flex">
                                <div className="grid place-content-center mx-3">
                                    <select name="" id="" className="w-[200px] p-2 rounded-xl border-2 h-[48px] lg:w-[130px]" onChange={handleSort} value={sort}>
                                        <option value="ASC"> Oldest </option>
                                        <option value="DESC"> Newest </option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex gap-3">
                                    <div className=''>
                                        <select name="" id="" className='w-[130px] h-[48px] px-2 border-2 rounded-xl lg:w-[160px]' onChange={handleDescQuery} value={descQuery}>
                                            <option value=""> Show all </option>
                                            <option value="sale"> Sale </option>
                                            <option value="stock"> Restock </option>
                                            <option value="expire"> Expire Product </option>
                                        </select>
                                    </div>
                                    <div>
                                        {
                                            userSelector.role == "superadmin" ?
                                                <select name="" id="" className="w-[200px] h-[48px] px-2 border-2 rounded-xl lg:w-[170px]" onChange={handleBranchQuery} value={branchQuery}>
                                                    <option value=""> All stores </option>
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
                                    <div className="">
                                        <div onClick={handleReset} className=" w-[70px] h-[48px] grid place-content-center text-lg lg:text-xl hover:underline  text-green-700 font-black">Reset</div>
                                    </div>
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
                                            <th className="px-4 py-2 text-xl bg-green-700 text-white">Product</th>
                                            <th className="px-4 py-2 text-xl bg-green-700 text-white">Quantity</th>
                                            <th className="px-4 py-2 text-xl bg-green-700 text-white">Date</th>
                                            <th className='px-4 py-2 text-xl bg-green-700 text-white'>Branch</th>
                                            <th className='px-4 py-2 text-xl bg-green-700 text-white'>Desc</th>
                                            <th className="px-4 py-2 text-xl bg-green-700 text-white">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stockData ? stockData.map((value, index) => {
                                            return (
                                                <tr key={value.id} className="hover:bg-gray-100 py-3">
                                                    <td className="px-4 py-3 text-center border-r">{value.id}</td>
                                                    <td className="px-4 py-3 text-center border-r">{value?.product?.name}</td>
                                                    <td className="px-4 py-3 text-center border-r">{value?.stock}</td>
                                                    <td className="px-4 py-3 text-center border-r">{value?.createdAt.split("T")[0]}</td>
                                                    <td className="px-4 py-3 text-center border-r">{value?.store_branch?.name}</td>
                                                    <td className="px-4 py-3 text-center border-r">{value?.description == "Sales" || value?.description == "Cancel Delivery" ? `${value?.description} - Transaction ID ${value?.transaction_id}` : `${value?.description}`} </td>
                                                    <td className="px-4 py-3 text-center">
                                                        {value?.description == "Sales" || value?.description == "Cancel Delivery" ? <Link to={`/admin/order/${value?.transaction_id}`}>
                                                            <div className="hover:underline hover:text-green-700">See Details</div></Link> : null}
                                                    </td>
                                                </tr>
                                            )
                                        }) : null}
                                    </tbody>
                                </table>
                                {stockData.length == 0 ? <div className="alert alert-error mt-3">
                                    <span className="flex justify-center">Sorry Product is Unavailable</span>
                                </div> : null}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center my-10">
                    {
                        stockData && stockData.length > 0 ?
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
            <Footer />
        </div>
    )
}

export default ProductStockHistoryPage;
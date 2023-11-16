import { useEffect, useState } from "react";
import { api } from "../../api/api";
import PaginationFixed from "../../components/paginationComponent";
import { useAppSelector } from '../../redux/App/Store';
import toast, { Toaster } from "react-hot-toast";

const ProductStockHistoryPage = () => {
    const [stockData, setStockData] = useState("");
    const [nameQuery, setNameQuery] = useState("");
    const [descQuery, setDescQuery] = useState("");
    const [branchQuery, setBranchQuery] = useState("");
    const userSelector = useAppSelector((state) => state.users);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const handleNameQuery = (event) => {
        setNameQuery(event.target.value);
    };
    const handleDescQuery = (event) => {
    setDescQuery(event.target.value);
    };
    const handleBranchQuery = (event) => {
    setBranchQuery(event.target.value);
    };
    const fetchData = async () => {
        const response = await api().get(`/stock/history?product=${nameQuery}&branch=${branchQuery}&description=${descQuery}&page=${page}`)
        setMaxPage(response.data.data.maxPages);
        setStockData(response.data.data.productStockHistory);
        console.log(response.data.data.productStockHistory);
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
        // console.log(`name query: ${nameQuery}, desc query: ${descQuery}, branch query: ${branchQuery} page number = ${page}`);
    }, [nameQuery, descQuery, branchQuery, page])
    return(
        <div className="h-screen bg-white">
            <Toaster />
            <div className="">
                <div className="flex justify-center bg-gradient-to-b from-green-500 to-yellow-300">
                    <h1 className="m-3 text-lg font-bold">Product stock History page</h1>
                </div>
                <div className="">
                    <div className="bg-white p-3 rounded-lg flex justify-around shadow-2xl">
                        <input type="text" className="w-2/5 p-2 rounded-xl border border-black" onChange={handleNameQuery} value={nameQuery} placeholder="look for products here"/>
                        <select name="" id="" className="w-1/5 p-2 rounded-md bg-gray-200 hover:bg-gray-300" onChange={handleDescQuery} value={descQuery}>
                            <option value=""> show all </option>
                            <option value="sale"> sale </option>
                            <option value="stock"> restock </option>
                            <option value="expire"> expire </option>
                        </select>
                        {
                            userSelector.role == "superadmin" ?
                            <select name="" id="" className="w-1/5 p-2 rounded-md" onChange={handleBranchQuery} value={branchQuery}>
                                <option value=""> filter by store </option>
                                <option value="1"> Graha Raya </option>
                                <option value="2"> Denpasar </option>
                            </select>
                            :
                            // <h1 className="w-1/5 p-2 rounded-md"> Data of branch {userSelector.store_branch_id} </h1>
                            null
                        }
                    </div>
                    {/* {stockData && stockData.map((value, index) => {
                        return(
                            <div className="m-6 p-1 h-[100px] bg-gradient-to-r to-yellow-300 from-green-600 shadow-xl rounded-lg md:mx-24 lg:mx-48">
                                <div className="bg-white h-full mx-2 rounded-md">
                                    <div className="text-md mx-2">
                                        <h1>Product name: {value?.product?.name}</h1>
                                        <div className="flex gap-2">
                                            <h1>Quantity: {value?.stock}</h1>
                                            <h1> || </h1>
                                            <h1 className="bg-green-400 rounded-xl w-fit px-2">Date: {value?.createdAt.split("T")[0]} </h1>
                                        </div>
                                    </div>
                                    <div className="border bg-gradient-to-b from-green-500 to-yellow-300 h-1 my-1"></div>
                                    <div className="flex gap-3 m-2">
                                        <h1>Note: {value?.description}</h1>
                                        <h1> Store Branch: {value?.store_branch_id} </h1>
                                    </div>
                                </div>
                            </div>
                        )
                    })} */}
                    {stockData && stockData.length > 0 ? (
                        stockData.map((value, index) => (
                            <div key={index} className="m-6 p-1 h-[100px] bg-gradient-to-r to-yellow-300 from-green-600 shadow-xl rounded-lg md:mx-24 lg:mx-48">
                            <div className="bg-white h-full mx-2 rounded-md">
                                <div className="text-md mx-2">
                                <h1>Product name: {value?.product?.name}</h1>
                                <div className="flex gap-2">
                                    <h1>Quantity: {value?.stock}</h1>
                                    <h1> || </h1>
                                    <h1 className="bg-green-400 rounded-xl w-fit px-2">Date: {value?.createdAt.split("T")[0]} </h1>
                                </div>
                                </div>
                                <div className="border bg-gradient-to-b from-green-500 to-yellow-300 h-1 my-1"></div>
                                <div className="flex gap-3 m-2">
                                <h1>Note: {value?.description}</h1>
                                <h1> Store Branch: {value?.store_branch_id} </h1>
                                </div>
                            </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-full flex justify-center my-12 ">
                            <div className="rounded-lg p-6 flex w-1/2 justify-center bg-gradient-to-b from-green-500 to-yellow-300 shadow-2xl">
                                <h1 className="bg-white rounded-xl w-full py-1 flex justify-center"> Unfortunately, there are no data to display at the moment.. </h1>
                            </div>
                        </div>
                    )}
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
            </div>
        </div>
    )
}

export default ProductStockHistoryPage;
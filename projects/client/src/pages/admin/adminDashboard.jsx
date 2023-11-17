import { useEffect, useState } from "react";
import NavbarAdmin from "../../components/navbarAdmin";
import { useAppSelector } from '../../redux/App/Store';
import { FiUsers } from 'react-icons/fi';
import { api } from "../../api/api";
import { Link } from "react-router-dom";
// component chart
import DashboardOrderChart from "../../components/dashboardOrderChart";
import DashboardUserChart from "../../components/dashboardUserChart";

// data visualization
import { ComposedChart, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import UserChart from "../../components/userChart";


const AdminDashboardPage = () => {
    const [transactionData, setTransactionData] = useState("");
    const userSelector = useAppSelector((state) => state.users)
    const [adminBranch, setAdminBranch] = useState("");
    const [orderByBranch, setOrderByBranch] = useState("")
    const [userData, setUserData] = useState("");
    const [orderData, setOrderData] = useState("");
    const [branch, setBranch] = useState("");

    const [popularProduct, setPopularProduct] = useState("");

    const handleBranchInput = (event) => {
        setOrderByBranch(event.target.value);
    };

    const onFetchData = async () => {   
        const orderCount = await api().get(`/chart/order-count?branch=${orderByBranch}`)
        setOrderData(orderCount.data.data);
        // setOrderData(orderCount.data.data);
        const branchData = await api().get('/branch/all');
        setBranch(branchData.data.data)
        // get user data
        const users = await api().get('/chart/new-users');
        setUserData(users.data.data);
        // get product mvp
        const bestProduct = await api().get('/chart/top-product');
        setPopularProduct(bestProduct.data.data)
    }

    useEffect(() => {
        onFetchData()
    }, [orderByBranch])

    const revenueData = [
        {
            "name": "Anggur Merah Seedless",
            "total_price": "518000",
            "transaction.id": 33,
            "transaction.store_branch_id": 1
        },
        {
            "name": "Alpukat Mentega",
            "total_price": "1040000",
            "transaction.id": 33,
            "transaction.store_branch_id": 1
        },
        {
            "name": "Greenfields Susu UHT Skimmed",
            "total_price": "25000",
            "transaction.id": 35,
            "transaction.store_branch_id": 1
        },
        {
            "name": "Ultramilk Full Cream",
            "total_price": "54000",
            "transaction.id": 36,
            "transaction.store_branch_id": 1
        },
        {
            "name": "Greenfields Susu UHT Low Fat",
            "total_price": "50000",
            "transaction.id": 37,
            "transaction.store_branch_id": 1
        },
        {
            "name": "Apel Super Fuji",
            "total_price": "128000",
            "transaction.id": 40,
            "transaction.store_branch_id": 1
        },
        {
            "name": "Blueberry Lokal",
            "total_price": "50000",
            "transaction.id": 40,
            "transaction.store_branch_id": 1
        },
        {
            "name": "Bakso Sapi",
            "total_price": "100000",
            "transaction.id": 41,
            "transaction.store_branch_id": 1
        },
        {
            "name": "Greenfields Susu UHT Vanilla",
            "total_price": "16000",
            "transaction.id": 46,
            "transaction.store_branch_id": 1
        },
        {
            "name": "Otak-Otak Ikan",
            "total_price": "25000",
            "transaction.id": 48,
            "transaction.store_branch_id": 1
        },
        {
            "name": "Telur Ayam",
            "total_price": "30000",
            "transaction.id": 49,
            "transaction.store_branch_id": 1
        },
        {
            "name": "Tahu Putih",
            "total_price": "15000",
            "transaction.id": 49,
            "transaction.store_branch_id": 1
        },
        {
            "name": "Tiram Utuh",
            "total_price": "25000",
            "transaction.id": 50,
            "transaction.store_branch_id": 1
        },
        {
            "name": "Ikan Salmon Potong",
            "total_price": "80000",
            "transaction.id": 50,
            "transaction.store_branch_id": 1
        }
    ]
    console.log(`data branch`, branch);
    return(
        <div className="h-full bg-white">
            <div>
                <div className="">
                    <div className="flex flex-col mx-3">
                        <div className="rounded-xl shadow-2xl bg-gray-400 lg:p-3 flex flex-col justify-center items-center m-4 p-3">
                            <div>
                                <Link to={"/user-management"}>Hello</Link> {userSelector?.role} of branch {userSelector?.store_branch_id} <span className="font-bold">{userSelector?.username}</span>!  Welcome to Buyfresh's admin dashboard!
                            </div>  
                        </div>
                        <div className="flex justify-between mx-4">
                            <div className="rounded-xl shadow-2xl bg-gray-400 p-4 w-1/5 h-[150px]">
                                <div className="flex flex-col">
                                    <h1 className="fontbold">total users:</h1>
                                    <span className="flex text-4xl justify-center align-middle items-center">18 <FiUsers /></span>
                                </div>
                            </div>
                            <div className="rounded-xl shadow-2xl bg-gray-400 p-4 w-1/5 h-[150px]">
                                <div className="flex flex-col">
                                    <h1 className="fontbold">total orders:</h1>
                                    <span className="flex text-4xl justify-center align-middle items-center">18<FiUsers /></span>
                                </div>
                            </div>
                            <div className="rounded-xl shadow-2xl bg-gray-400 p-4 w-1/5 h-[150px]">
                                <div className="flex flex-col">
                                    <h1 className="fontbold">total products:</h1>
                                    <span className="flex text-4xl justify-center align-middle items-center">18<FiUsers /></span>
                                </div>
                            </div>
                            <div className="rounded-xl shadow-2xl bg-gray-400 p-4 w-1/5 h-[150px]">
                                <div className="flex flex-col">
                                    <h1 className="fontbold">Best Seller:</h1>
                                    <span className="flex text-md justify-center align-middle items-center font-bold"> {popularProduct} </span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[10px] bg-gradient-to-r from-yellow-300 to-green-600 mx-4 mt-4 rounded-full"></div>
                        <div className="rounded-xl shadow-2xl border bg-gray-200 m-4 p-4">
                            <div className="flex gap-4">
                                <h1 className="font-bold">User Report</h1>
                                <h1> Displaying user registration count in the past week</h1>
                            </div>
                            <div className="">
                                <div>
                                    < DashboardUserChart data={userData}/>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl shadow-2xl border bg-gray-200 m-4 p-4">
                            <div className="font-bold">
                                Revenue Report
                            </div>
                            <div>
                            <ResponsiveContainer width="90%" height={350}>
                                <BarChart width={900} height={250} data={revenueData}>
                                    <XAxis dataKey="name" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="total_price" barSize={20} fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="rounded-xl shadow-2xl border bg-gray-200 m-4 p-4">
                            <div className="font-bold flex gap-3">
                                <h1> Order Count </h1>
                                { !userSelector?.store_branch_id ?
                                    <select id="store_branch_id" name="store_branch_id" onChange={handleBranchInput} value={orderByBranch} className="rounded-md w-1/4 border border-black text-xs">
                                        <option value=""> Filters </option>
                                        {
                                            branch && branch.map((value, index) => {
                                                if(userSelector?.store_branch_id) {
                                                    const optionValue = userSelector?.store_branch_id;  
                                                }  
                                                return(
                                                    <option key={index} value={value.id} disabled={userSelector?.store_branch_id}> 
                                                        {value.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    :
                                    <h1> Displaying data for {branch[userSelector?.store_branch_id - 1].name} </h1>
                                }
                            </div>  
                            <div>
                                < DashboardOrderChart data={orderData}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardPage;
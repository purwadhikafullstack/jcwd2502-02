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
            month: "October",
            profit: 13000000
        },
        {
            month: "November",
            profit: 900000
        },
        {
            month: "December",
            profit: 0
        }
    ]

    return(
        <div className="h-full bg-white">
            <div>
                <div className="">
                    <div className="flex flex-col mx-3">
                        <div className="rounded-xl shadow-2xl bg-gray-200 lg:p-3 flex flex-col justify-center items-center m-4 p-3">
                            <div>
                                <Link to={"/user-management"}>Hello</Link> {userSelector?.role} of branch {userSelector?.store_branch_id} <span className="font-bold">{userSelector?.username}</span>!  Welcome to Buyfresh's admin dashboard!
                            </div>  
                        </div>
                        <div className="flex justify-around">
                            <div className="rounded-xl shadow-2xl bg-gray-200 p-4 w-1/5 h-[150px]">
                                <div className="flex flex-col">
                                    <h1 className="fontbold">total users:</h1>
                                    <span className="flex text-4xl justify-center align-middle items-center">18 <FiUsers /></span>
                                </div>
                            </div>
                            <div className="rounded-xl shadow-2xl bg-gray-200 p-4 w-1/5 h-[150px]">
                                <div className="flex flex-col">
                                    <h1 className="fontbold">total orders:</h1>
                                    <span className="flex text-4xl justify-center align-middle items-center">18<FiUsers /></span>
                                </div>
                            </div>
                            <div className="rounded-xl shadow-2xl bg-gray-200 p-4 w-1/5 h-[150px]">
                                <div className="flex flex-col">
                                    <h1 className="fontbold">total products:</h1>
                                    <span className="flex text-4xl justify-center align-middle items-center">18<FiUsers /></span>
                                </div>
                            </div>
                            <div className="rounded-xl shadow-2xl bg-gray-200 p-4 w-1/5 h-[150px]">
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
                                <BarChart width={270} height={200} data={revenueData}>
                                    <XAxis dataKey="month" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="profit" fill="#8884d8" />
                                </BarChart>
                            </div>
                        </div>
                        <div className="rounded-xl shadow-2xl border bg-gray-200 m-4 p-4">
                            <div className="font-bold flex gap-3">
                                <h1>Order Count {userSelector?.store_branch_id} </h1>
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
                                    <h1> Displaying data for branch </h1>
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
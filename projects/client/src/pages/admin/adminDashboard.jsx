import { useEffect, useState } from "react";
import NavbarAdmin from "../../components/navbarAdmin";
import Footer from "../../components/footer";
import { useAppSelector } from '../../redux/App/Store';
import { FiUsers } from 'react-icons/fi';
import { api } from "../../api/api";
import { HiShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import '../../css/admin.css'
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
    const [cardBranch, setCardBranch] = useState("");
    const [userData, setUserData] = useState("");
    const [orderData, setOrderData] = useState("");
    const [branch, setBranch] = useState("");
    const [popularProduct, setPopularProduct] = useState("");
    const [cardData, setCardData] = useState("");
    const handleBranchInput = (event) => {
        setOrderByBranch(event.target.value);
    };

    const handleCardBranchChange = (event) => {
        setCardBranch(event.target.value)
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
        // get card data 
        const cardData = await api().get(`/report/dashboard-card?branch=${cardBranch}`)
        setCardData(cardData.data.data);
    }

    useEffect(() => {
        onFetchData()
    }, [orderByBranch, cardBranch])

    return (
        <div className="h-full w-full bg-white">
            <div>
                <NavbarAdmin />

                <div className="mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32 ">
                    <div className="">
                        <div className="flex text-5xl font-bold gap-2 py-5 text-green-800">Admin Dashboard</div>
                        <div className="rounded-md w-fit border border-black text-xs p-1 my-1">
                            {   
                                userSelector.role == "superadmin" ?
                                <select name="" id="" onChange={handleCardBranchChange}>
                                    <option value=""> All branch </option>
                                    {
                                        branch && branch.map((value, index) => {
                                            return(
                                                <option value={value.id}> {value.name} </option>
                                            )
                                        })
                                    }
                                </select>
                                :
                                <h1> Displaying data of {branch[userSelector?.store_branch_id - 1]?.name}</h1>
                            }
                        </div>

                        {/* <div className="rounded-full border-8 border-green-700 bg-yellow-300 lg:p-3 flex flex-col justify-center items-center my-5 p-3 overflow-hidden">
                            <div className="truncate">
                                Hello {userSelector?.role} of {branch[userSelector?.store_branch_id - 1]?.name} {userSelector?.username}! <span className="font-bold"></span>Welcome to Buyfresh's admin dashboard!
                            </div>
                        </div> */}

                        {/* Nanti tolong masukin component aja */}
                        <div className="lg:flex lg:justify-between grid gap-3">
                            <div className="rounded-xl border-8 border-green-700 bg-yellow-300 p-4 lg:w-1/5 h-[150px] flex flex-col justify-between overflow-hidden">
                                <div className="text-3xl lg:text-2xl">Total Product:</div>
                                <div className="flex justify-end text-5xl gap-3">
                                    <div><FiUsers /></div>
                                    <div>{cardData?.productCount}</div>
                                </div>
                            </div>
                            <div className="rounded-xl border-8 border-green-700 bg-yellow-300 p-4 lg:w-1/5 h-[150px] flex flex-col justify-between overflow-hidden">
                                <div className="text-3xl lg:text-xl">This week's new User:</div>
                                <div className="flex justify-end text-5xl gap-3">
                                    <div><FiUsers /></div>
                                    <div>{cardData?.userCount}</div>
                                </div>
                            </div>
                            <div className="rounded-xl border-8 border-green-700 bg-yellow-300 p-4 lg:w-1/5 h-[150px] flex flex-col justify-between overflow-hidden">
                                <div className="text-3xl lg:text-xl">This week's ongoing Orders:</div>
                                <div className="flex justify-end text-5xl gap-3">
                                    <div><HiShoppingCart /></div>
                                    <div>{cardData?.orderCount}</div>
                                </div>
                            </div>
                            <div className="rounded-xl border-8 border-green-700 bg-yellow-300 p-4 lg:w-1/5 h-[150px] flex flex-col justify-between overflow-hidden">
                                <div className="text-3xl lg:text-2xl">Best Seller:</div>
                                <div className="font-bold text-3xl marquee"> {popularProduct} </div>
                            </div>
                        </div>

                        <div className="h-[10px] bg-gradient-to-r from-yellow-300 to-green-600 my-10 rounded-full"></div>

                        <div className="grid gap-3">
                            <div className="rounded-xl shadow-xl border  my-5 p-4 w-full ">
                                <div className="grid place-content-center pb-5">
                                    <div className="font-black text-3xl grid place-content-center">User Report</div>
                                    <div className="text-sm grid place-content-center text-center"> Displaying user registration count in the past week</div>
                                </div>

                                <div className="">
                                    < DashboardUserChart className="" data={userData} />
                                </div>

                            </div>

                            {/* better masukin di sales report aja  */}
                            {/* <div className="rounded-xl shadow-xl border bg-gray-200 my-5 p-4">
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
                        </div> */}


                            <div className="rounded-xl shadow-xl border my-5 mb-20 p-4">
                                <div className="grid place-content-center pb-5">
                                    <div className="font-bold text-3xl grid place-content-center"> Order Count </div>
                                    {!userSelector?.store_branch_id ?
                                        <select id="store_branch_id" name="store_branch_id" onChange={handleBranchInput} value={orderByBranch} className="rounded-md w-1/2 lg:w-1/2 border border-black text-xs">
                                            <option value=""> Filters </option>
                                            {
                                                branch && branch.map((value, index) => {
                                                    if (userSelector?.store_branch_id) {
                                                        const optionValue = userSelector?.store_branch_id;
                                                    }
                                                    return (
                                                        <option key={index} value={value.id} disabled={userSelector?.store_branch_id}>
                                                            {value.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                        :
                                        <div className="text-sm grid place-content-center text-center"> Displaying data for {branch[userSelector?.store_branch_id - 1]?.name} </div>
                                    }
                                </div>
                                <div>
                                    <DashboardOrderChart data={orderData} />
                                </div>


                            </div>
                        </div>

                    </div>
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default AdminDashboardPage;
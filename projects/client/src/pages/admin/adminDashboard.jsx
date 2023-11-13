import { useEffect, useState } from "react";
import NavbarAdmin from "../../components/navbarAdmin";
import { useAppSelector } from '../../redux/App/Store';

// data visualization
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import UserChart from "../../components/userChart";

const AdminDashboardPage = () => {
    const [userData, setUserData] = useState("");
    const [transactionData, setTransactionData] = useState("");
    const userSelector = useAppSelector((state) => state.users)

    const data = [
        {
            name: '6 Nov',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: '7 Nov',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: '8 Nov',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: '9 Nov',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: '10 Nov',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: '11 Nov',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: '12 Nov',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    const orderData = [
        {
            date: "10 Nov",
            number: 6
        },
        {
            date: "11 Nov",
            number: 7
        },
        {
            date: "12 Nov",
            number: 2
        },
        {
            date: "13 Nov",
            number: 5
        },
        {
            date: "14 Nov",
            number: 12
        },
        {
            date: "15 Nov",
            number: 20
        }
    ],

    revenueData = [
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
        <div className="h-full bg-gray-300">
            {/* <NavbarAdmin/> */}

            <div>
                <div className="lg:grid lg:grid-cols-5">
                    {/* Admin Welcome Card */}
                    <div className="lg:grid lg:col-start-2 lg:col-span-2 lg:gap-3 lg:m-2    ">
                        <div className="lg:rounded-xl lg:shadow-2xl bg-white lg:p-3 flex flex-col justify-center items-center">
                            <div>
                                Hello {userSelector?.role} <span className="font-bold">{userSelector?.username}</span>!  Welcome to Buyfresh's admin dashboard!
                            </div>  
                            <div>
                                We hope that you will have a productive day!
                            </div>
                        </div>
                    {/* User Data Card, user registration */}
                        <div className="rounded-xl shadow-2xl border bg-white p-4">
                            <div className="flex gap-4">
                                <h1 className="font-bold">User Report</h1>
                                <select name="" id="">
                                    <option value=""> Registration </option>
                                </select>
                            </div>
                            <div className="m-3">
                                < UserChart/>
                            </div>  
                        </div>
                    {/* Transaction Report */}
                        <div className="rounded-xl shadow-2xl border bg-white p-4">
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
                        <div className="rounded-xl shadow-2xl border bg-white p-4">
                            <div className="font-bold">
                                Order Count
                            </div>  
                            <div className="mt-2">
                                <LineChart
                                    width={600}
                                    height={350}
                                    data={orderData} 
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="number" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                                </LineChart>
                            </div>
                        </div>
                    </div>

                    <div className="grid col-start-4 col-span-2 gap-3 h-[500px] w-[300px] m-2">
                        <div className="flex gap-3">
                            <div className="rounded-xl shadow-2xl bg-white p-4 w-1/3 h-[200px]">
                                total sales
                            </div>
                            <div className="rounded-xl shadow-2xl bg-white p-4 w-1/3 h-[200px]">
                                total users
                            </div>
                            <div className="rounded-xl shadow-2xl bg-white p-4 w-1/3 h-[200px]">
                                total stocks
                            </div>
                        </div>
                        <div className="rounded-xl shadow-2xl bg-white p-4">
                            <div className="font-bold">
                                Profit
                            </div>
                            <div className="m-4">
                                {/* <ResponsiveContainer> */}
                                    <LineChart
                                    width={600}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="amt" stroke="#82ca9d" />
                                    </LineChart>
                                {/* </ResponsiveContainer> */}
                            </div>
                        </div>

                        <div className="rounded-xl shadow-2xl bg-white p-4">
                            <h1 className="font-bold">
                                Sales
                            </h1>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardPage;
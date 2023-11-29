import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardOrderChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <ComposedChart
                width={500}
                height={350}
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ textAnchor: 'start', dx: 100 }} scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" barSize={40} fill="#005B31" />
            </ComposedChart>
        </ResponsiveContainer>
    )
}

export default DashboardOrderChart;
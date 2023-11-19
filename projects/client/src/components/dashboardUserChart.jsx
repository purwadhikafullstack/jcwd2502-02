import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardUserChart = ({ data }) => {
    console.log(`ini di component dashboard user chart`);
    console.log(data);
    return (
        <ResponsiveContainer width="100%" height={350}>
            <ComposedChart
                width={400}
                height={400}
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" barSize={40} fill="#005B31" />
            </ComposedChart>
        </ResponsiveContainer>
    )
}

export default DashboardUserChart;
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardUserChart = ({ data }) => {
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
                barCategoryGap={50}
                barGap={50}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date" tick={{ textAnchor: 'start', dx: 60 }} scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" barSize={40} fill="#005B31" />
            </ComposedChart>
        </ResponsiveContainer>
    )
}

export default DashboardUserChart;
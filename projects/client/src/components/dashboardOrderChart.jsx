import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardOrderChart = ({data}) => {
    console.log(`ini di component dashboard order chart`);
    console.log(data);
    return(
        <ResponsiveContainer width="75%" height={350}>
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
                <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3"/>
                <XAxis dataKey="date" tick={{ textAnchor: 'end', dy: 10 }} scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" barSize={20} fill="#413ea0" />
            </ComposedChart>
        </ResponsiveContainer>
    )
}

export default DashboardOrderChart;
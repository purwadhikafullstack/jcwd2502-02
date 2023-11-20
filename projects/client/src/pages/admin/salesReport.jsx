import React, { useMemo } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';

const SalesReportPage = () => {
    const data = [
        { id: 1, name: 'John Doe', age: 25, city: 'New York' },
        { id: 2, name: 'Jane Smith', age: 30, city: 'San Francisco' },
        { id: 3, name: "hitla", age: 48, city: "Berlin"}
        // Add more data as needed
    ];

    const columns = [
        { Header: 'Id', accessor: "id" },
        { Header: 'Name', accessor: "name" },
        { Header: 'Age', accessor: "age" },
        { Header: 'City', accessor: "city" },
        { Header: 'Nation', accessor: "nation"}
    ]

    const finalColumns = useMemo(() => columns, []);
    const finalData = useMemo(() => data, []);

    const tableInstance = useTable({columns: finalColumns, data: finalData})
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return(
        <div className="h-screen w-screen">
            {/* Page title */}
            <div className="flex bg-gradient-to-l from-green-300 to-yellow-300 p-4 justify-center">  
                <div className="flex bg-slate-400 p-3 rounded-xl">
                    <h1 className="flex font-extrabold">This is the Sales Report page</h1>
                </div>
            </div>
            {/* Page body */}
            <div className="flex">
                <div className='w-full mx-3'>
                    <div className='flex justify-between'>
                        <input type="text" className='border border-black m-3 p-3 rounded-lg' />
                        <div className='flex gap-3 m-4'>
                            <h1>Filter by Date:</h1>
                            <div className='border border-black h-fit'>
                                <select name="" id="">
                                    <option value=""> All Time </option>
                                    <option value=""> Past 2 months </option>
                                    <option value=""> Past 3 months </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md m-3 shadow-2xl bg-slate-300">
                        <h1 className='border shadow-2xl bg-gradient-to-l from-yellow-300 to-green-300 w-fit p-1 rounded-lg text-black'>Sales Data</h1>
                        <div className='p-2 rounded-lg overflow-x-auto'>
                        {/* tabel nanti disini */}
                            <table {...getTableProps()} className='border border-black min-w-full'>
                                <thead>
                                    {
                                        headerGroups && headerGroups.map(headerGroup => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {
                                                    headerGroup.headers.map((column) => (
                                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                    }
                                </thead>
                                <tbody {...getTableBodyProps()} className='border border-black text-center'>
                                    {
                                        rows.map(row => {
                                            prepareRow(row)
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {
                                                        row.cells.map((cell) => {
                                                            return(
                                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesReportPage;
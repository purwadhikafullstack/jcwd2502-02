import { useState } from "react";


const SalesReportProduct = () => {
    const [product, setProduct] = useState("");
    const [sort, setSort] = useState("");
    return(
        <div className="bg-white w-screen h-screen">
            {/* Header */}
            <div className="border bg-gradient-to-l to-yellow-300 from-green-300 flex justify-center p-2 shadow-2xl">
                <h1 className="text-lg">Product Sales Report</h1>
            </div>
            {/* Body */}
            <div className="bg-gray-400 p-2 flex justify-center">
                {/* Table Controls */}
                <input type="text" className="mx-2"/>
                <select name="" id="">
                    <option value=""> Filter by Dates </option>
                    <option value=""> Newest </option>
                    <option value=""> Oldest </option>
                </select>
            </div>
            <div>
                <div>
                    {/* Table disini */}

                </div>
            </div>
        </div>
    )
}

export default SalesReportProduct;
import ProductStockHistoryChart from "../../components/stockHistoryChart";

const ProductStockHistoryPage = () => {
    const data = [
        {id: 1, name: "apel", stock: 10, description: "stock", updatedAt: "2023-11-05 13:22:59", product_id: 1, store_branch_id: 1},
        {id: 2, name: "Jeruk", stock: 10, description: "stock", updatedAt: "2023-11-05 13:22:59", product_id: 2, store_branch_id: 1},
        {id: 3, name: "apel", stock: 5, description: "sale", updatedAt: "2023-11-05 13:22:59", product_id: 1, store_branch_id: 1},
        {id: 4, name: "apel", stock: 10, description: "restock", updatedAt: "2023-11-05 13:22:59", product_id: 1, store_branch_id: 1}
    ]
    return(
        <div className="h-screen">
            <div className="grid grid-cols-6">
                <div className="flex justify-center">
                    Product stock History page
                </div>
                <div className="grid col-start-2 col-span-4 gap-4">
                    <div className="p-3 border flex justify-around">
                        <input type="text" className="w-1/3 p-2 border border-black rounded-xl" placeholder="look for products here"/>
                        <select name="" id="" className="w-1/6 p-2 border">
                            <option value=""> all data </option>
                            <option value=""> sales data </option>
                            <option value=""> restock data </option>
                        </select>
                        <select name="" id="" className="w-1/6 p-2 border">
                            <option value=""> filter by store </option>
                            <option value=""> Graha Raya </option>
                            <option value=""> Denpasar </option>
                        </select>
                    </div>
                    <div className="flex justify-evenly shadow-xl p-3">
                        <h1>
                            id
                        </h1>
                        <h1>
                            nama produk
                        </h1>
                        <h1>
                            jumlah
                        </h1>
                        <h1>
                            deskripsi
                        </h1>
                        <h1>
                            toko
                        </h1>
                    </div>
                    {data && data.map((value, index) => {
                        return(
                            <div>
                                <div className="flex justify-around shadow-xl border p-2 border-black rounded-xl">
                                    <h1>
                                        {data[index]?.id}
                                    </h1>
                                    <h1>
                                        {data[index]?.name}
                                    </h1>
                                    <h1 className="">
                                        {data[index]?.stock}
                                    </h1>
                                    <h1>
                                        {data[index]?.description}
                                    </h1>
                                    <h1>
                                        {data[index]?.store_branch_id}
                                    </h1>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductStockHistoryPage;
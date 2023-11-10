import { AiFillShopping } from "react-icons/ai";

const OrderComponent = ({ status, invoice, total, date }) => {

    return (
        <div>
            <div className="border p-3 rounded-xl border-green-700 border-l-8 hover:border-b-4 ease-in duration-200">
                <div className="w-full lg:flex lg:justify-between">
                    {status == "pending" ? <div className={`lg:flex-1 ml-2 grid place-content-center rounded-xl font-bold bg-yellow-300 p-2`}>{status}</div> : null}
                    {status == "canceled" ? <div className={`lg:flex-1 ml-2 grid place-content-center rounded-xl font-bold bg-red-400 p-2`}>{status}</div> : null}

                    <div className="lg:flex-1 lg:ml-10 p-2 font-black ">INV {invoice}</div>
                    <div className="lg:flex-1 p-2  ">{date}</div>
                    <div className="lg:flex-1 p-2 font-medium">Total Order: Rp {total}</div>
                </div>
            </div>



        </div>
    )
}

export default OrderComponent
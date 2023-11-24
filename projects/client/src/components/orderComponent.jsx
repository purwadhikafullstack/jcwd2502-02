import { AiFillShopping } from "react-icons/ai";

const OrderComponent = ({ status, invoice, total, date, details }) => {

    return (
        <div>
            <div className="border p-3 rounded-xl border-green-700 border-l-8 hover:border-b-4 ease-in duration-200">
                <div className="w-full lg:flex lg:justify-between ">
                    <div className="lg:flex-1 lg:grid lg:place-content-center p-2 font-black ">INV {invoice}</div>
                    <div></div>
                    <div className="lg:flex-1 lg:grid lg:place-content-center  p-2 ">{date}</div>
                    <div className="lg:flex-1 lg:grid lg:place-content-center p-2   font-medium">Total Order: Rp {total}</div>
                    <div className="lg:flex-1 lg:grid">{details}</div>
                    {status == "pending" ? <div className={` lg:flex-1 text-md ml-2 grid place-content-center rounded-xl font-bold bg-yellow-300 p-2`}>WAITING FOR PAYMENT</div> : null}
                    {status == "waiting for payment approval" ? <div className={` lg:flex-1 text-md ml-2 grid place-content-center rounded-xl font-bold bg-yellow-300 p-2`}>WAITING FOR APPROVAL</div> : null}
                    {status == "canceled" ? <div className={` lg:flex-1 text-xl ml-2 grid place-content-center rounded-xl font-bold bg-red-400 p-2`}>{status.toUpperCase()}</div> : null}
                    {status == "Delivered" ? <div className={` lg:flex-1 text-xl ml-2 grid place-content-center rounded-xl font-bold bg-orange-400 p-2`}>{status.toUpperCase()}</div> : null}
                    {status == "Payment Approved" ? <div className={` lg:flex-1 text-xl ml-2 grid place-content-center rounded-xl font-bold bg-blue-600 p-2`}>{status.toUpperCase()}</div> : null}
                    {status == "Complete" ? <div className={` lg:flex-1 text-xl ml-2 grid place-content-center rounded-xl font-bold bg-green-600 text-white p-2`}>{status.toUpperCase()}</div> : null}
                </div>
            </div>
        </div>
    )
}

export default OrderComponent
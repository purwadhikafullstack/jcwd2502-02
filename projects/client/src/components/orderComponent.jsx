import { AiFillShopping } from "react-icons/ai";

const OrderComponent = () => {

    return (
        <div>
            <div className="border   p-3 rounded-xl border-green-700 border-l-8 hover:border-b-4">
                <div className="w-full lg:flex lg:justify-between">
                    <div className="lg:flex-1 ml-2 grid place-content-center rounded-xl font-bold bg-yellow-300 p-2 ">PENDING</div>
                    <div className="lg:flex-1 lg:ml-10 p-2 font-black ">INV 1700015812447</div>
                    <div className="lg:flex-1 p-2  ">3 November 2023</div>
                    <div className="lg:flex-1 p-2 font-medium">Total Order: Rp 250,000,000</div>
                </div>
            </div>



        </div>
    )
}

export default OrderComponent
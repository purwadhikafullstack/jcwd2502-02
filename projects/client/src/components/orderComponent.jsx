import { AiFillShopping } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";

const OrderComponent = ({ status, invoice, total, date, details, store, image, productName, quantity }) => {

    return (
        <div>
            <div className="border p-3 rounded-xl border-green-700 border-l-8 hover:border-b-4 ease-in duration-200">
                <div className=" justify-between ">
                    <div className="flex justify-between lg:justify-normal">
                        <div className="lg:flex ">
                            <div className="lg:grid lg:place-content-center p-2 font-thin lg:text-base text-xs hidden lg:hidden-none">INV {invoice}</div>
                            <div className="lg:grid lg:place-content-center p-2 ">{date}</div>
                        </div>
                        {status == "pending" ? <div className={` text-sm ml-2 grid place-content-center rounded-xl font-bold bg-yellow-300 p-2`}>WAITING FOR PAYMENT</div> : null}
                        {status == "waiting for payment approval" ? <div className={` text-sm ml-2 grid place-content-center rounded-xl font-bold bg-yellow-300 p-2`}>WAITING FOR APPROVAL</div> : null}
                        {status == "canceled" ? <div className={` text-md ml-2 grid place-content-center rounded-xl font-bold bg-red-400 p-2`}>{status.toUpperCase()}</div> : null}
                        {status == "Delivered" ? <div className={` text-md ml-2 grid place-content-center rounded-xl font-bold bg-orange-400 p-2`}>{status.toUpperCase()}</div> : null}
                        {status == "Payment Approved" ? <div className={` text-md ml-2 grid place-content-center rounded-xl font-bold bg-blue-600 p-2`}>{status.toUpperCase()}</div> : null}
                        {status == "Complete" ? <div className={` text-md ml-2 grid place-content-center rounded-xl font-bold bg-green-600 text-white p-2`}>{status.toUpperCase()}</div> : null}
                    </div>

                    {/* <div className="h-[5px] my-3 bg-green-800 rounded-full"></div> */}
                    <div>
                        <div className="flex">
                            <div className="grid place-content-center"><FaLocationDot /></div>
                            <div className="p-2 ">{store}</div>
                        </div>

                        <div className="lg:flex lg:justify-between">
                            <div className="flex">
                                <div className=" h-[80px] w-[100px] lg:h-[100] lg:w-[120px]">
                                    <img className="object-cover rounded-xl h-full w-full" src={process.env.REACT_APP_URL + `${image}`} alt="product_image" />
                                </div>
                                <div className="w-full justify-center flex flex-col">
                                    <div className="pl-3 text-lg font-bold truncate w-[230px] lg:w-full">{productName}</div>
                                    <div className="pl-3"> {quantity}</div>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="w-[5px] my-3 bg-base-200 rounded-full hidden sm:block mr-5"></div>

                                <div className="p-3 grid place-content-center font-medium lg:text-base text-xs">Total Order: <div className="text-base lg:text-xl font-bold">Rp {total}</div></div>
                                <div className="p-3 grid place-content-center lg:text-xl">{details}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderComponent
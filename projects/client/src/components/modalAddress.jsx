import { FaLocationDot } from "react-icons/fa6";
import { BiSolidDownArrow } from "react-icons/bi";
import Button from '../components/button'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { api } from "../api/api"
import { useDispatch, useSelector } from "react-redux";
import { getMainAddress } from "../redux/Features/branch";

const ModalAddress = () => {

    const apiInstance = api()
    const [address, setAddress] = useState()
    const mainAddress = useSelector((state) => state.branch.mainAddress)
    const dispatch = useDispatch();

    const getAddress = async () => {
        try {
            const userAddress = await apiInstance.get('/location/')
            userAddress.data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setAddress(userAddress.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAddress()

    }, [])

    useEffect(() => {
        dispatch(getMainAddress());
    }, []);

    return (
        <div>
            <div onClick={() => document.getElementById('my_modal_2').showModal()} className="flex p-1 px-3 w-[350px] rounded-full md:w-auto md:mx-0 border-t-2 border-r-8 border-l-2 border-b-2 border-green-700 hover:underline justify-center gap-3 text-green-700 bg-yellow-300">
                <div className="grid place-content-center ">
                    <FaLocationDot />
                </div>
                <div className="font-bold truncate">Delivered to {mainAddress?.name}</div>
                <div className="grid place-content-center "><BiSolidDownArrow /></div>
            </div>
            <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                <div className="modal-box">
                    <div className="font-bold text-3xl text-green-700">Address List</div>
                    <div className="mt-3 flex gap-2 overflow-x-auto py-8">

                        {address ? address.map((value, index) => {
                            return (
                                <div key={index}>
                                    < div className="border-green-700 border rounded-xl w-[150px] h-[300px] gap-3 flex flex-col justify-between flex-none p-2 hover:shadow-xl ease-in duration-200 hover:border-4">
                                        {value.isPrimary == "true" ? <div className="grid place-content-center rounded-xl px-2 bg-gradient-to-r from-yellow-300 to-green-600 text-white font-bold">Main</div> :
                                            null}
                                        <div className="font-bold">{value.name} </div>
                                        <div>{value.address} </div>
                                        <div>{value.city.name}</div>
                                        <div>{value.city.province.name}</div>

                                    </div>
                                </div>
                            )
                        }) :
                            null}

                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <div className="flex gap-2">
                                <Link to={'/manage-address'}>
                                    <Button text={"Manage Address"} />
                                </Link>
                                <Button text={"Close"} />
                            </div>
                        </form>
                    </div>
                </div>
            </dialog >
        </div >
    )
}

export default ModalAddress
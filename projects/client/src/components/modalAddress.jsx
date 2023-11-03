import { FaLocationDot } from "react-icons/fa6";
import { BiSolidDownArrow } from "react-icons/bi";
import Button from '../components/button'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { api } from "../api/api"

const ModalAddress = () => {

    const apiInstance = api()
    const [address, setAddress] = useState()

    const getAddress = async () => {
        try {
            const userAddress = await apiInstance.get('/location/')
            console.log(userAddress.data.data);
            userAddress.data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setAddress(userAddress.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAddress()

    }, [])

    return (
        <div>
            <div onClick={() => document.getElementById('my_modal_2').showModal()} className="flex p-1 px-3 rounded-full w-full md:w-auto mx-2 md:mx-0 justify-center gap-3 hover:bg-green-700 ease-in duration-200 hover:text-white">
                <div className="grid place-content-center">
                    <FaLocationDot />
                </div>
                <div className="">Delivered to Rumah Bayu</div>
                <div className="grid place-content-center"><BiSolidDownArrow /></div>
            </div>
            <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                <div className="modal-box">
                    <div className="font-bold text-3xl text-green-800">Address List</div>
                    <div className="mt-3 flex gap-2 overflow-x-auto py-8">

                        {address ? address.map((value, index) => {
                            return (
                                <div key={index}>
                                    < div className="border-green-800 border rounded-xl w-[150px] h-[300px] gap-3 flex flex-col justify-between flex-none p-2 hover:shadow-xl ease-in duration-200 hover:border-4">
                                        <div className="font-bold">{value.name} </div>
                                        <div>{value.address} </div>
                                        <div>{value.city.name}</div>
                                        <div>{value.city.province.name}</div>
                                        {value.isPrimary == "true" ? <div className="grid place-content-center rounded-xl px-2 bg-gradient-to-r from-yellow-300 to-green-600 text-white font-bold">Main</div> :
                                            null}
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
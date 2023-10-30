import { FaLocationDot } from "react-icons/fa6";
import { BiSolidDownArrow } from "react-icons/bi";
import Button from '../components/button'
const ModalAddress = () => {
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <div onClick={() => document.getElementById('my_modal_1').showModal()} className="flex p-1 px-3 rounded-full w-full md:w-auto mx-2 md:mx-0 justify-center gap-3 hover:bg-green-700 ease-in duration-200 hover:text-white">
                <div className="grid place-content-center">
                    <FaLocationDot />
                </div>
                <div className="">Delivered to Rumah Bayu</div>
                <div className="grid place-content-center"><BiSolidDownArrow /></div>
            </div>
            <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                <div className="modal-box">
                    <div className="font-bold text-xl">Where Should We Deliver?</div>
                    <div className="mt-3 flex gap-2 overflow-x-auto p-3">
                        <div className="border-green-800 border rounded-xl w-[150px] h-[300px] gap-3 flex flex-col justify-between flex-none p-2 hover:shadow-xl ease-in duration-200 hover:border-4">
                            <div className="font-bold">Rumah Bayu Krisna Prasetya </div>
                            <div>Melia Grove blok GMB/22 </div>
                            <div>Tangerang Selatan</div>
                            <div>Banten</div>
                            <div className="bg-green-800 text-white justify-center flex rounded-md">Main</div>
                        </div>
                        <div className="border-green-800 border rounded-xl w-[150px] h-[300px] gap-3 flex flex-col justify-between flex-none p-2 hover:shadow-xl ease-in duration-200 hover:border-4">
                            <div className="font-bold">Rumah Bayu Krisna Prasetya </div>
                            <div>Melia Grove blok GMB/22 </div>
                            <div>Tangerang Selatan</div>
                            <div>Banten</div>
                            <div className="bg-green-800 text-white justify-center flex rounded-md"></div>
                        </div>
                        <div className="border-green-800 border rounded-xl w-[150px] h-[300px] gap-3 flex flex-col justify-between flex-none p-2 hover:shadow-xl ease-in duration-200 hover:border-4">
                            <div className="font-bold">Rumah Bayu Krisna Prasetya </div>
                            <div>Melia Grove blok GMB/22 </div>
                            <div>Tangerang Selatan</div>
                            <div>Banten</div>
                            <div className="bg-green-800 text-white justify-center flex rounded-md"></div>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className="flex gap-2">
                                <Button text={"Manage Address"} />
                                <Button text={"Close"} />
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ModalAddress
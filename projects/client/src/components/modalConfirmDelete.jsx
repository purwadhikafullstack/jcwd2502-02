import Button from './button'
import { Link } from "react-router-dom";

const ModalDelete = ({ button, content, message, click }) => {

    console.log(click);

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <div onClick={() => document.getElementById('my_modal_4').showModal()} className="">
                {button}
            </div>
            <dialog id="my_modal_4" className="modal sm:modal-middle backdrop-blur-sm">
                <div className="modal-box">

                    <div className='flex justify-center text-center flex-col gap-3'>
                        <div className="font-bold text-3xl ">{content}</div>
                        <div>{message}</div>
                    </div>


                    <div className="modal-action flex justify-center">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className="flex gap-2">

                                <button className="btn bg-gray-200 ml-3 text-black border-4 border-black hover:bg-gray-200 hover:border-black rounded-2xl"
                                >CANCEL</button>


                                <button className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black rounded-2xl"
                                    onClick={click} >DELETE</button>

                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ModalDelete
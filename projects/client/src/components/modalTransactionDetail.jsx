import { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast";
import Button from "./button";

const ModalTransactionDetail = ({ transactionData }) => {

    const products = transactionData.transaction_details;
    const cumulativePrice = products.reduce((total, product) => {
        return total + product.price;
    }, 0);
    const cumulativeDiscount = products.reduce((total, product) => {
        return total + product.discount_value;
    }, 0);
    const cumulativeSubtotal = products.reduce((total, product) => {
        return total + product.subtotal;
    }, 0);

    function formatRupiah(amount) {
        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        });
        return formatter.format(amount);
    }

    useEffect(() => {
    }, [])
    return (
        <div className="h-fit">
            < Toaster />
            <Button text={"Detail"} style={"w-full"} onClick={() => document.getElementById(`my_modal_${transactionData.id}`).showModal()}></Button>
            <dialog id={`my_modal_${transactionData.id}`} className="modal modal-bottom sm:modal-middle backdrop-blur-md">
                <div className="modal-box ">
                    <div className="font-bold text-3xl text-green-800"> Transaction ID: #{transactionData.id}</div>
                    <div className="">
                        <div className="rounded-xl border-4 my-3 rounded-mdflex bg-yellow-300 border-green-800 w-full">
                            <div className="text-left p-3 text-green-800">
                                <div className="font-semibold  flex justify-between"> Customer username: <div>{transactionData.user.username}</div> </div>
                                <div className="font-semibold flex justify-between"> INV Number: <div>{transactionData.invoice}</div></div>
                                <div className="font-semibold flex justify-between"> Bought from: <div>{transactionData.store_branch.name}</div></div>
                                <div className="font-semibold flex justify-between"> Status: <div>{transactionData.status.toUpperCase()}</div></div>
                            </div>
                        </div>

                        <div className="grid gap-3">
                            {
                                products && products.map((value) => {
                                    return (
                                        <div className="flex gap-3 border rounded-xl  w-full">

                                            <div className="">
                                                <img src={process.env.REACT_APP_URL + value.product.image} alt="" className="h-[100px] w-[120px] rounded-l-xl" />
                                            </div>
                                            <div className=" w-full flex flex-col justify-between pr-3">
                                                <div className=" text-left pt-2">
                                                    <div>{value.name}</div>
                                                    <div className="flex gap-3"><div className="text-green-800">{formatRupiah(value.price)}</div> x {value.quantity}  </div>
                                                </div>
                                                <div className="h-[3px] bg-green-800"></div>
                                                <div className="text-left pb-2">Subtotal: {formatRupiah(value.quantity * value.price)} </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>


                        <div className="my-3 p-3 text-white rounded-md bg-green-800">
                            <div className="flex justify-between">Total Subtotal: <div>{formatRupiah(transactionData.subtotal)}</div></div>
                            <div className="flex justify-between">Shipping Cost: <div>{formatRupiah(transactionData.shipping_cost)}</div></div>
                            <div className="h-[3px] my-1 bg-white"></div>
                            <div className="flex font-bold text-lg justify-between">Final Total: <div>{formatRupiah(transactionData.final_total)}</div></div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={() => document.getElementById(`my_modal_${transactionData.id}`).close()} className="btn bg-red-600 text-white border-4 border-black hover:bg-red-600 hover:border-black w-full">Close</button>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button hidden>close</button>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default ModalTransactionDetail;
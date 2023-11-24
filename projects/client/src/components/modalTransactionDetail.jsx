import { useEffect } from "react"
import toast, {Toaster} from "react-hot-toast";
import Button from "./button";

const ModalTransactionDetail = ({transactionData}) => {

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
        console.log(products);
    }, [])
    return(
        <div className="h-fit">
            < Toaster />
            <Button text={"Detail"} style={"w-full"} onClick={() => document.getElementById(`my_modal_${transactionData.id}`).showModal()}></Button>
            <dialog id={`my_modal_${transactionData.id}`} className="modal backdrop-blur-md">
                <div className="modal-box bg-gradient-to-l from-yellow-300 to-green-600">
                    <h3 className="font-bold text-3xl text-white"> Transaction Detail #{transactionData.id}</h3>
                    <div className="bg-white rounded-lg h-fit p-2 my-2 ">
                        <div className="border text-left justify-start m-2 rounded-md border-black shadow-xl flex">
                            <div className="m-2">
                                <h1> Customer: {transactionData.user.username} </h1>
                                <h1> Invoice number: {transactionData.invoice}</h1>
                                <h1> Bought from: {transactionData.store_branch.name}</h1>
                            </div>
                        </div>
                        {
                            products && products.map((value) => {
                                return(
                                    <div className="flex gap-3 border h-[110px] w-[430px] rounded-lg m-2 border-black shadow-lg">
                                        <div className="m-2 flex">
                                            <div className="flex">
                                                <img src={process.env.REACT_APP_URL + value.product.image} alt="" className="h-[70px] w-[70px] rounded-md mt-2 shadow-lg" />
                                                <div className="flex flex-col m-2 text-left">
                                                    <h1>{value.name}</h1>
                                                    <h1>{value.quantity} x {formatRupiah(value.price)}</h1>
                                                </div>
                                            </div>
                                            <div className="flex m-2 text-right">
                                                <div className="flex flex-col ml-auto">
                                                    <h1> Total Harga </h1>
                                                    <h1> {formatRupiah(value.quantity * value.price)} </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="">
                            <h1>Transaction status: {transactionData.status}</h1>
                        </div>
                        <div className="flex flex-col my-2 rounded-md mx-3">
                            <h1 className="flex justify-end">Total Price: {formatRupiah(transactionData.subtotal)}</h1>
                            <h1 className="flex justify-end">Shipping fee: {formatRupiah(transactionData.shipping_cost)}</h1>
                            <h1 className="flex justify-end">Amount paid: {formatRupiah(transactionData.final_total)}</h1>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={() => document.getElementById(`my_modal_${transactionData.id}`).close()} className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black">Close</button>
                        {/* <button onClick={() => console.log(products)}> check item </button> */}
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ModalTransactionDetail;
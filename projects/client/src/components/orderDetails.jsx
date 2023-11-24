import React from "react";
import moment from 'moment';
import DeleteConfirmation from "./deleteModal";
import { useSelector } from "react-redux";

const OrderDetailsSection = ({ transaction, fetchData, id }) => {

    const role = useSelector((state) => state.users.role);

    return (


        <div className="bg-green-800 my-10 lg:my-0 p-5 rounded-xl h-[650px] lg:w-[400px] flex flex-col justify-between">
            <div className="text-4xl font-bold text-white">Order Details: </div>

            <div className="font-bold text-lg p-2 mt-3 text-center bg-yellow-300 text-green-800 rounded-xl">Customer Name: {transaction ? transaction.user.username : null}</div>

            <div className="text-white">
                <div className="my-3 flex flex-col gap-2">
                    <div className="font-bold text-xl underline">Shipping Address</div>
                    <div>{transaction ? transaction.address : null}</div>
                </div>
                <div className="grid gap-2">
                    <div className="grid gap-2">
                        <div className="font-bold text-xl underline">Transaction Date</div>
                        <div>
                            {transaction
                                ? moment(transaction.createdAt).format('dddd, Do MMMM YYYY')
                                : null}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <div className="font-bold text-xl underline">Shipping Option</div>
                        <div>
                            {transaction
                                ? transaction.shipping_method.toUpperCase()
                                : null}
                        </div>
                    </div>
                    {transaction.discount_coupon === null ? null : <div className="grid gap-2">
                        <div className="font-bold text-xl underline">Voucher</div>
                        <div>{transaction
                            ? transaction.coupon_name
                            : null}</div>
                    </div>}

                </div>
            </div>
            <div className="text-white">
                <div className="grid gap-2 mt-3">
                    <div className="flex justify-between">
                        <div>Total Weight</div>
                        {transaction ? transaction.total_weight : null} gr
                    </div>

                    <div className="flex justify-between">
                        <div>Subtotal</div>
                        Rp {transaction ? transaction.subtotal.toLocaleString() : null}
                    </div>

                    <div className="flex justify-between">
                        <div>Shipping Cost</div>
                        Rp {transaction ? transaction.shipping_cost.toLocaleString() : null}
                    </div>
                    {transaction.discount_coupon === null ? null : <div className="flex justify-between">
                        <div>Voucher Discount</div>
                        <div>- Rp {transaction ? transaction?.discount_coupon?.toLocaleString() : null}</div>
                    </div>}
                    {/* <div className="flex justify-between">
                        <div>Voucher Discount</div>
                        <div>- Rp {transaction ? transaction?.discount_coupon?.toLocaleString() : null}</div>
                    </div> */}
                </div>

                <div className="h-[3px] bg-white my-2"></div>

                <div className="flex justify-between text-xl font-black">
                    <div>Grand Total</div>
                    Rp {transaction ? transaction.final_total.toLocaleString() : null}
                </div>
            </div>
            <div className="my-3">
                {/* {role === "customer" ?
                    <div>
                        {

                            transaction.status === "pending" ? (
                                <DeleteConfirmation
                                    itemId={id}
                                    onDelete={fetchData}
                                    apiEndpoint="/transaction/cancel"
                                    text={""}
                                    message={"Order Canceled"}
                                    textOnButton={"Yes"}
                                    button={<div className=" btn hover:bg-red-600 bg-red-600 text-white w-full border-none ">
                                        CANCEL ORDER
                                    </div>}
                                />
                            ) : null
                        }
                    </div>
                    : null} */}

            </div>
        </div>
    );
};

export default OrderDetailsSection;

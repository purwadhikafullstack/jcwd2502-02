// ModalEditProduct.js

import React from 'react';

const ModalEditProduct = ({
    showModal,
    onCloseModal,
    onSaveProduct,
    inputName,
    setInputName,
    inputPrice,
    setInputPrice,
    inputDescription,
    setInputDescription,
    inputWeight,
    setInputWeight,
    inputCategory,
    setInputCategory,
    categories,

}) => {
    return (
        <>
            {showModal ? (<div className="fixed backdrop-blur-md bg-black/30 h-screen w-full z-50 top-0 right-0 duration-600 ease-in"></div>) : ("")}
            <div className={showModal ? `fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[50%] lg:w-[30%] p-10 rounded-xl bg-gradient-to-l from-yellow-300 to-green-600` : `hidden`}>
                <div className="modal-content">
                    <h3 className="font-bold text-4xl text-white">Edit Product</h3>
                    <div className="flex flex-col gap-5 mt-5">
                        <div>
                            <div className="text-white pb-2"> Product Name</div>
                            <input
                                className="input w-full"
                                type="text"
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="text-white pb-2"> Product Price</div>
                            <input className="input w-full" type="number" value={inputPrice} onChange={(e) => setInputPrice(e.target.value)} />
                        </div>
                        <div>
                            <div className="text-white pb-2"> Product Description</div>
                            <input className="input w-full" type="text" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} />
                        </div>
                        <div>
                            <div className="text-white pb-2"> Product Weight</div>
                            <input className="input w-full" type="text" value={inputWeight} onChange={(e) => setInputWeight(e.target.value)} />
                        </div>
                        <div>
                            <div className="text-white pb-2"> Product Category</div>
                            <select
                                value={inputCategory}
                                onChange={(e) => setInputCategory(e.target.value)}
                                className="select select-bordered w-full">
                                <option disabled value=""></option>
                                {
                                    categories.map((value) => {
                                        return (
                                            <option key={value.id} value={value.id}>{value.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="modal-action">
                        <button
                            className="btn bg-red-600 text-white border-4 border-black hover:bg-red-600 hover:border-black"
                            onClick={onCloseModal}
                        >
                            Cancel
                        </button>
                        <form method="dialog" onSubmit={onSaveProduct}>
                            <button
                                className="btn bg-yellow-300 text-black border-4 border-green-600 hover:bg-yellow-300 hover:border-green-600"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default ModalEditProduct;

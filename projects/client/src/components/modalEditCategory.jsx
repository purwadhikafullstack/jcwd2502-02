// ModalEditCategory.js
import React from "react";

const ModalEditCategory = ({ modal, setModal, inputCat, setInputCat, handleSaveCat }) => {
    return (
        <>
            {modal ? (
                <div className="fixed backdrop-blur-md bg-black/30 h-screen w-full z-50 top-0 right-0 duration-600 ease-in"></div>
            ) : (
                ""
            )}
            <div
                className={
                    modal
                        ? `fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[50%] lg:w-[30%] p-10 rounded-xl bg-gradient-to-l from-yellow-300 to-green-600`
                        : `hidden`
                }
            >
                <h3 className="font-bold text-4xl text-white">Edit Category</h3>
                <div className="flex flex-col gap-5 mt-5">
                    <div>
                        <div className="text-white pb-2"> Category Name</div>
                        <input className="input w-full" type="text" value={inputCat} onChange={(e) => setInputCat(e.target.value)} />
                    </div>
                </div>
                <div className="modal-action">
                    <button className="btn bg-red-600 text-white border-4 border-black hover:bg-red-600 hover:border-black" onClick={() => setModal(!modal)}>
                        Cancel
                    </button>
                    <form method="dialog" onSubmit={handleSaveCat}>
                        <button className="btn bg-yellow-300 text-black border-4 border-green-600 hover:bg-yellow-300 hover:border-green-600">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ModalEditCategory;

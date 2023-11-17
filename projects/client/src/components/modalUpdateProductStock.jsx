import React, { useState } from 'react';
import { api1 } from '../../src/api/api';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';

const ModalUpdateProductStock = ({ isOpen, onClose, productId, branchId, onStockUpdated, currentStock }) => {
    const [inputStock, setInputStock] = useState('');
    const api = api1();
    const debouncedUpdateStock = debounce(async () => {
        try {
            if (!Number.isInteger(Number(inputStock))) {
                toast.error('Please enter a valid integer for stock');
                return;
            }
            else if (inputStock <= 0) {
                toast.error("Add stock cannot be 0 or minus")
                return
            } else {
                const res = await api.patch(`products/updatestock`, {
                    inputStock,
                    productId,
                    branchId,
                });
                toast.success('Update Product Success');
                onStockUpdated();
                setInputStock('');
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, 1000);
    const debouncedCloseModal = debounce(() => {
        setInputStock('');
        onClose();
    }, 500)
    return (
        <div>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg w-96">
                        <h3 className="font-bold text-4xl text-gray-800 mb-4">Add Product Stock</h3>
                        <div className="flex flex-col gap-5">
                            <div>
                                <div className="text-gray-800 pb-2">Current Stock: {currentStock}</div>
                                <div className="text-gray-800 pb-2">Add Stock:</div>
                                <input
                                    className="input w-full border-black"
                                    type="number"
                                    value={inputStock}
                                    onChange={(e) => setInputStock(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                className="btn bg-red-600 text-white border-4 border-black hover:bg-red-600 hover:border-black mr-2"
                                onClick={debouncedCloseModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn bg-yellow-300 text-black border-4 border-green-600 hover:bg-yellow-300 hover:border-green-600"
                                onClick={debouncedUpdateStock}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalUpdateProductStock;

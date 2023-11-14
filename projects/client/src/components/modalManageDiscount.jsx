import React, { useState, useEffect } from 'react';
import { api1 } from '../../src/api/api';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';

const ModalManageDiscount = ({ isOpen, onClose, productId, discountId, discountType }) => {
    const api = api1();
    const [inputDiscount, setInputDiscount] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedTypeId, setSelectedTypeId] = useState('');
    const [showInput, setShowInput] = useState(true); // Initialize as true

    useEffect(() => {
        setInputDiscount('');
        setSelectedType('');
        setSelectedTypeId('');
        setShowInput(true); // Reset to true when the modal is opened
    }, [isOpen]);

    const handleSelectChange = (e) => {
        const selectedTypeIdValue = parseInt(e.target.value, 10);
        setInputDiscount('');
        const selectedTypeValue = discountType.find((type) => type.id === selectedTypeIdValue);
        setSelectedType(selectedTypeValue ? selectedTypeValue.type : '');
        setSelectedTypeId(selectedTypeIdValue);

        // Update showInput based on the selected discount type
        setShowInput(selectedTypeValue ? selectedTypeValue.type !== 'buy 1 get 1' : true);
    };

    const debouncedUpdateDiscount = debounce(async () => {
        try {
            const res = await api.patch(`products/updatediscount`, {
                id: productId,
                nominal: selectedType === 'nominal' ? inputDiscount : null,
                percent: selectedType === 'percent' ? inputDiscount : null,
                discountId: selectedTypeId,
            });
            toast.success('Update Product Discount Success');
            onClose();
        } catch (error) {
            console.error(error);
        }
    }, 1000);

    return (
        <div>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg w-96">
                        <h3 className="font-bold text-4xl text-gray-800 mb-4">Update Product Discount</h3>
                        <div className="flex flex-col gap-5">
                            <div>
                                <div className="text-gray-800 pb-2">Discount Type: </div>
                                <select
                                    className="input w-full border-black"
                                    value={selectedType}
                                    onChange={(e) => handleSelectChange(e)}
                                >
                                    <option value="">{selectedType ? ` ${selectedType}` : 'Select Discount Type'}</option>
                                    {discountType.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {showInput && selectedType && (
                                <div>
                                    <div className="text-gray-800 pb-2">Enter Discount Value:</div>
                                    <input
                                        type="number"
                                        className="input w-full border-black"
                                        value={inputDiscount}
                                        onChange={(e) => setInputDiscount(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                className="btn bg-red-600 text-white border-4 border-black hover:bg-red-600 hover:border-black mr-2"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn bg-yellow-300 text-black border-4 border-green-600 hover:bg-yellow-300 hover:border-green-600"
                                onClick={debouncedUpdateDiscount}
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

export default ModalManageDiscount;

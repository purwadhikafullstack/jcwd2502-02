import React, { useState } from 'react';

const ModalDelete = ({
    title,
    text,
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
}) => {
    const [showDialog, setShowDialog] = useState(false);

    const handleConfirm = async () => {
        try {
            await onConfirm();
            setShowDialog(false);
        } catch (error) {
            console.error(error);
            // Handle the error as needed.
        }
    };

    return (
        <div>
            <button onClick={() => setShowDialog(true)}>Open Dialog</button>
            {showDialog && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{title}</h2>
                        <p>{text}</p>
                        <button onClick={() => setShowDialog(false)}>{cancelText}</button>
                        <button onClick={handleConfirm}>{confirmText}</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalDelete;
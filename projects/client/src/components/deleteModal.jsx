import React from "react";
import Swal from "sweetalert2";
import { api } from "../api/api";

const DeleteConfirmation = ({ itemId, onDelete, apiEndpoint, button }) => {
    const apiInstance = api()

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#039E57",
            confirmButtonColor: "#d33",
            cancelButtonText: "Cancel", // Change the cancel button text
            confirmButtonText: "Delete", // Change the confirm button text
            reverseButtons: true, // Reverse the button positions
        });

        if (result.isConfirmed) {
            try {
                const softDeleteResponse = await apiInstance.patch(`${apiEndpoint}/${itemId}`);
                Swal.fire("Deleted!", "Your item has been deleted.", "success");
                onDelete();
            } catch (error) {
                console.log(error);
                // Handle the error, e.g., display an error message.
            }
        }
    };

    return (
        <div className="" onClick={handleDelete}>
            {button}
        </div>
    );
};

export default DeleteConfirmation;
import React from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const PaginationFixed = ({ page, maxPage, handlePageChange, handlePrevPage, handleNextPage }) => {
    const generatePageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= maxPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-center mt-4 mb-10">
            <button
                className={`text-white mr-3 ${page === 1 ? "join-item btn bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-700 hover:bg-green-700 join-item btn"
                    }`}
                onClick={handlePrevPage}
                disabled={page === 1}
            >
                <div>
                    <IoArrowBackOutline className="text-xl text-white" />
                </div>
            </button>

            {generatePageNumbers().map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={`mx-1 bg-base-200 hover:bg-base-200 join-item btn ${pageNumber === page ? "border-4 text-green-700 border-green-700 font-bold" : "text-black"
                        }`}
                    onClick={() => handlePageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                className={`text-white ml-3 ${page === maxPage ? " join-item btn bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-700 hover:bg-green-700 join-item btn"
                    }`}
                onClick={handleNextPage}
                disabled={page === maxPage}
            >
                <div>
                    <IoArrowForwardOutline className="text-xl text-white" />
                </div>
            </button>
        </div>
    );
};

export default PaginationFixed;

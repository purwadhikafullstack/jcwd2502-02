import React from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const PaginationFixed = ({ page, maxPage, handlePageChange, handlePrevPage, handleNextPage }) => {


    const generatePageNumbers = () => {
        if (maxPage <= 1) {
            return []; // No need for pagination if there's only one page or none.
        }

        if (window.innerWidth < 640) { // Assuming 640px as the breakpoint for small screens (you can adjust this based on your design)
            return [page];
        }

        const pageNumbers = [];
        const maxButtonsToShow = 3; // Number of buttons to show excluding ellipses
        const totalButtonsToShow = maxButtonsToShow + 2; // Including ellipses

        if (maxPage <= totalButtonsToShow) {
            for (let i = 1; i <= maxPage; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (page <= Math.ceil(maxButtonsToShow / 2) + 1) {
                for (let i = 1; i <= maxButtonsToShow; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(maxPage);
            } else if (page > maxPage - Math.floor(maxButtonsToShow / 2)) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = maxPage - maxButtonsToShow + 1; i <= maxPage; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = page - Math.floor(maxButtonsToShow / 2); i <= page + Math.floor(maxButtonsToShow / 2); i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(maxPage);
            }
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

            {generatePageNumbers().map((pageNumber, index) => (
                <React.Fragment key={index}>
                    <button
                        key={pageNumber}
                        className={`mx-1 bg-base-200 hover:bg-base-200 join-item btn hidden sm:inline lg:inline ${pageNumber === page ? "border-4 text-green-700 border-green-700 font-bold" : "text-black"
                            }`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                </React.Fragment>
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

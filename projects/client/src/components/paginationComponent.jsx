import React from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const PaginationFixed = ({
    page,
    maxPage,
    handlePageChange,
    handlePrevPage,
    handleNextPage,
}) => {
    const generatePageNumbers = () => {
        if (maxPage <= 1) {
            return [];
        }
        if (window.innerWidth < 640) {
            return [page];
        }
        const pageNumbers = [];
        const maxButtonsToShow = 3;

        if (maxPage <= maxButtonsToShow) {
            for (let i = 1; i <= maxPage; i++) {
                pageNumbers.push(i);
            }
        } else {
            const startPage = Math.max(1, page - Math.floor(maxButtonsToShow / 2));
            const endPage = Math.min(maxPage, startPage + maxButtonsToShow - 1);
            if (startPage > 1) {
                pageNumbers.push(1);
                if (startPage > 2) {
                    pageNumbers.push('...');
                }
            }
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
            if (endPage < maxPage) {
                if (endPage < maxPage - 1) {
                    pageNumbers.push('...');
                }
                pageNumbers.push(maxPage);
            }
        }
        return pageNumbers;
    };


    return (
        <div className="flex justify-center mt-4 mb-10">
            <button
                className={`text-white mr-3 ${page === 1
                    ? "join-item btn bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-700 hover:bg-green-700 join-item btn"
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
                        className={`mx-1 ${window.innerWidth < 640
                            ? page === pageNumber
                                ? "bg-base-200 text-green-700 border-4 border-green-700 btn"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-base-200 hover:bg-base-200 join-item btn hidden sm:inline lg:inline " +
                            (pageNumber === page
                                ? "border-4 text-green-700 border-green-700 font-bold"
                                : "text-black")
                            }`}
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={window.innerWidth < 640 ? false : pageNumber === '...'}
                    >
                        {pageNumber === '...' ? '...' : pageNumber}
                    </button>
                </React.Fragment>
            ))}

            <button
                className={`text-white ml-3 ${page === maxPage
                    ? " join-item btn bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-700 hover:bg-green-700 join-item btn"
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

import { Toaster, toast } from "react-hot-toast";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoArrowForwardOutline } from "react-icons/io5";
const Pagination = ({ totalPost, postsPerPage, setCurrentPage, currentPage }) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPost / postsPerPage); i++) {
        pages.push(i);
    }
    return (
        <div>
            <Toaster />
            <div className="flex justify-center items-center w-full py-3 border border-white gap-2 ">
                <button
                    className="bg-green-800 hover:bg-green-800 join-item btn"
                    onClick={() => {
                        if (currentPage > 1) {
                            setCurrentPage((prev) => prev - 1);
                        } else {
                            toast.error("You already in minimum pages");
                        }
                    }}
                >
                    <div>
                        <IoArrowBackOutline className="text-xl text-white" />
                    </div>
                </button>
                {pages.map((page, index) => {
                    return (
                        <button
                            className={`bg-base-200 hover:bg-base-200 join-item btn ${page === currentPage ? `text-green-800 border-green-800 font-bold` : `text-black`
                                }`}
                            key={index}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    );
                })}
                <button
                    className="bg-green-800 hover:bg-green-800 join-item btn"
                    onClick={() => {
                        if (currentPage < pages.length) {
                            setCurrentPage((prev) => prev + 1);
                        } else {
                            toast.error("You already in maximum pages");
                        }
                    }}
                >
                    <IoArrowForwardOutline className="text-xl text-white" />
                </button>
            </div>
        </div>
    );
};
export default Pagination;

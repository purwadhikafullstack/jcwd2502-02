import { useEffect, useRef, useState } from "react"
import Button from "../../components/button"
import { api } from "../../api/api"
import ModalNewAdmin from "../../components/modalNewAdmin";
import ModalEditAdmin from "../../components/modalEditAdmin";
import toast, { Toaster } from "react-hot-toast";
import Searchbar from "../../components/searchBar";
import NavbarAdmin from "../../components/navbarAdmin";
import PaginationFixed from "../../components/paginationComponent";

export default function CreateAdminPage() {
    const [branch, setBranch] = useState(false);
    const [admin, setAdmin] = useState("");
    const [queryUsername, setQueryUsername] = useState("");
    const [queryBranch, setQueryBranch] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= maxPage) {
            setPage(newPage);
            await onGetAdmins()
        } else {
            toast.error("Invalid page number!");
        }
    };
    const handleNextPage = () => {
        handlePageChange(page + 1);
    };
    const handlePrevPage = () => {
        handlePageChange(page - 1);
    };

    const handleNameInput = (event) => {
        setQueryUsername(event.target.value);
    };

    const handleBranchInput = (event) => {
        setQueryBranch(event.target.value);
    };

    const onGetAdmins = async () => {
        try {
            const {data} = await api().get(`/users/admin-filter?username=${queryUsername}&branch=${queryBranch}&page=${page}`)
            setMaxPage(data.data.maxPages)
            setAdmin(data.data.filteredAdmins);
        } catch (error) {
            console.log(error);
        }
    }

    const onGetBranch = async () => {
        try {
            const {data} = await api().get('/branch/all');
            setBranch(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeactivateAdmin = async (email) => {
        const response = await api().patch('/users/deactivate-admin', { email: email })
        toast.success(response.data.message);
        onGetAdmins()
    }

    useEffect(() => {
        onGetAdmins()
        onGetBranch()
    }, [queryUsername, queryBranch, page])

    console.log(`name: ${queryUsername}, branch: ${queryBranch}`);

    return (
        <div className="flex flex-col flex-grow min-h-screen bg-gradient-to-b from-green-700 to-yellow-300 gap-2">
            <Toaster />
            <div className="my-7">
                <NavbarAdmin />
            </div>
            <div>
                <div className="flex justify-center bg-gradient-to-b from-green-500 to-yellow-300">
                    <h1 className="m-3 text-lg font-bold">User Management Page</h1>
                </div>
            </div>
            <div className="flex mx-7 gap-3 lg:mx-12 rounded-md">
                <input type="text" className="w-1/4 px-4" placeholder="Look up names here" value={queryUsername} onChange={handleNameInput} />
                <select id="store_branch_id" name="store_branch_id" onChange={handleBranchInput} value={queryBranch} className="rounded-md w-1/6 p-2">
                    <option value=""> All Branches </option>
                    {
                        branch && branch.map((value, index) => {    
                            return(
                                <option key={index} value={value.id}> 
                                    {value.name}
                                </option>
                            )
                        })
                    }
                </select>
                <ModalNewAdmin getAdmins={() => onGetAdmins()} />
            </div>
            {
                admin && admin.map((value, index) => {
                    return (

                        <div className="border bg-slate-200 rounded-lg shadow-xl mx-6 my-2 py-2 lg:mx-12 lg:flex">
                            <div className="flex object-fill rounded-t h-[190px] lg:h-[150px] w-full gap-1 rounded-2xl shadow-xl">
                                <div className="my-5 mx-3 border border-black rounded-full h-[100px] w-[100px]">
                                    <img className="object-cover rounded-full h-full w-full" src={process.env.REACT_APP_URL + `${value?.profile_picture}`} alt="user profile" />
                                </div>
                                <div className="my-4 font-semibold rounded-md w-1/2 md:w-1/3">
                                    <h1 className="">
                                        Name: {value.username}
                                    </h1>
                                    <div>
                                        <h1>
                                            Email: {value?.email}
                                        </h1>
                                    </div>
                                    <div>
                                        <h1>
                                            Date of Birth: {value.birthdate ? value.birthdate : "-"}
                                        </h1>
                                    </div>
                                    <div>
                                        <h1>Assignment: {value?.store_branch?.name}</h1>
                                    </div>
                                    <div>
                                        <h1>
                                            Admin status: <span className={value.isVerified == "unverified" ? "text-red-600" : "text-green-500"}> {value.isVerified == "verified" ? "Active" : "Inactive"} </span>
                                        </h1>
                                    </div>
                                </div>
                                <div className="m-5 flex items-center font-semibold md:w-1/4">
                                    <div className="md:flex md:gap-4">
                                        <ModalEditAdmin getAdmins={() => onGetAdmins()} adminData={value} key={index} />
                                        <button onClick={() => handleDeactivateAdmin(value.email)} className={value.isVerified == "verified" ? " bg-red-500 hover:bg-red-600 w-[90px] h-[45px] rounded-2xl mt-1" : " bg-green-500 hover:bg-green-600 w-[100px] h-[50px] rounded-2xl mt-1"}> {value.isVerified == "verified" ? "Deactivate" : "Activate"} </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })
            }
            <div className="flex justify-center my-10">
                <PaginationFixed
                    page={page}
                    maxPage={maxPage}
                    handlePageChange={handlePageChange}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
            </div>
        </div>
    )
}
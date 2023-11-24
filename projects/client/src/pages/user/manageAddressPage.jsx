import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import Button from "../../components/button"
import ModalNewAddress from "../../components/modalNewAddress"
import ModalUpdateAddress from "../../components/modalUpdateAddress"
import ModalDelete from "../../components/modalConfirmDelete"
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react"
import { api } from "../../api/api";
import { useRef } from "react"
import "../../css/sweet.css"
import Swal from "sweetalert2";
import DeleteConfirmation from "../../components/deleteModal"
import MyForm from "../../components/modal"
import PaginationFixed from "../../components/paginationComponent"
import { FaLocationArrow } from "react-icons/fa6";


const ManageAddress = () => {
    const apiInstance = api()
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [address, setAddress] = useState()
    const pageTopRef = useRef(null);
    const [provinceId, setProvinceId] = useState()
    const [cityId, setCityId] = useState()


    const getProvinceId = async () => {
        try {
            const province = await apiInstance.get(`/location/province`)
            setProvinceId(province.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getCityId = async () => {
        try {
            const cityId = await apiInstance.get(`/location/city`)
            const cityData = cityId.data.data;
            cityData.sort((a, b) => a.name.localeCompare(b.name));
            setCityId(cityId.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getAddress = async () => {
        try {
            const userAddress = await apiInstance.get(`/location/pagination/${page}`)
            setMaxPage(userAddress.data.maxPages)
            setAddress(userAddress.data.userAddress)
        } catch (error) {
            console.log(error);
        }
    }

    const updateMain = async (addressId) => {
        try {
            console.log(addressId);
            const mainAddress = await apiInstance.patch(`/location/main/${addressId}`)
            Swal.fire("Success!", "Main Address Successfully Updated", "success");
            getAddress()

        } catch (error) {
            console.log(error);
        }
    }

    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= maxPage) {
            setPage(newPage);
            await getAddress()
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


    useEffect(() => {
        getCityId()
        getProvinceId()
        getAddress()

    }, [page])


    const UpdateAddres = async (addressId) => {
        try {
            console.log(addressId);
        } catch (error) {
        }
    }

    console.log(address);


    return (
        <div ref={pageTopRef} >
            <Toaster />
            <Navbar />

            <div className="mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32 mb-10 h-full" style={{ minHeight: "100vh" }}>

                <div className="md:flex md:justify-between mt-5 md:mt-10">
                    <div className="text-4xl md:text-5xl font-bold gap-2 text-green-800">Manage Address
                    </div>

                    <div className="mt-5 md:mt-0">
                        <ModalNewAddress />
                    </div>

                </div>

                <div className="mt-10 flex flex-col gap-5">
                    {address ?
                        address.map((value, index) => {
                            return (
                                <div key={index}>
                                    <div className="md:flex md:justify-between border-4 text-lg rounded-xl border-green-700 border-l-8 p-5">
                                        <div className="grid gap-3 md:w-[200px] lg:w-[400px]">
                                            <div className="flex gap-3">
                                                <div className="text-3xl font-bold">{value.name}</div>
                                                {value.isPrimary == "true" ? <div className="grid place-content-center rounded-xl px-2 bg-gradient-to-r from-yellow-300 to-green-600 text-white font-bold">Main</div> : null}
                                            </div>
                                            <div>{value.address}</div>
                                            <div className="font-semibold">{value.city.name} - {value.city.province.name}</div>
                                        </div>
                                        <div className="md:grid md:place-content-center">
                                            {value.isPrimary == "false" ? <DeleteConfirmation
                                                itemId={value.id}
                                                button={<div className="mt-5 md:grid md:place-content-center"><Button text={"Make Main Address"} style={"w-full"} /></div>}
                                                onDelete={getAddress}
                                                apiEndpoint={"/location/main"}
                                                text={"Your cart will be emptied if you change your main address. "}
                                                textOnButton={"Confirm"}
                                                message={"Main address successfully updated!"}
                                            />
                                                : null}
                                        </div>
                                        <div className="flex gap-5 mt-5 md:pr-10 md:mt-0 md:grid md:place-content-center">
                                            <ModalUpdateAddress
                                                id={value.id}
                                                onClick={() => UpdateAddres(value.id)}
                                                name={value.name} />

                                            <div className="text-red-600 hover:underline">
                                                <DeleteConfirmation
                                                    itemId={value.id} // Pass the item ID to delete
                                                    onDelete={getAddress} // Pass a callback function to execute after deletion
                                                    apiEndpoint="/location" // Pass the API endpoint to customize the request URL
                                                    text={""}
                                                    textOnButton={"Delete"}
                                                    message={"Address successfully deleted"}
                                                    button={"Delete"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        null
                    }
                    {!address || address.length === 0 ? (
                        <div>
                            <div className="grid gap-3 place-content-center mt-32">
                                <div className="text-center text-3xl font-black grid place-content-center">Looks Like You Haven't Created Any Address</div>
                                <div className="grid place-content-center text-center text-sm px-5 lg:text-base">Click the Add New Address Button to add an Address</div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="flex justify-center my-10">
                <PaginationFixed
                    page={page}
                    maxPage={maxPage}
                    handlePageChange={handlePageChange}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
            </div>
            <Footer />
        </div >
    )
}

export default ManageAddress
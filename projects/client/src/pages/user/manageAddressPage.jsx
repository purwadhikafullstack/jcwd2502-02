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
import Swal from 'sweetalert2'
import "../../css/sweet.css"


const ManageAddress = () => {
    const apiInstance = api()
    const [address, setAddress] = useState()
    const pageTopRef = useRef(null);

    const getAddress = async () => {
        try {
            const userAddress = await apiInstance.get('/location/')
            console.log(userAddress.data.data);
            // userAddress.data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setAddress(userAddress.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    const deleteAddress = (addressId) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger'
            }, buttonsStyling: false
        });

        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const softDeleteAddress = await apiInstance.patch(`/location/${addressId}`);
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        getAddress()
                    } catch (error) {
                        console.log(error);
                        // Handle the error, e.g., display an error message.
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                    );
                }
            });
    };





    useEffect(() => {
        getAddress()
    }, [])

    console.log(address);

    return (
        <div ref={pageTopRef}>
            <Toaster />
            <Navbar />

            <div className="mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32 mb-10">

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

                                        {value.isPrimary == "false" ? <div className="mt-5 md:grid md:place-content-center"><Button text={"Make Main Address"} style={"w-full"} /></div> : null}


                                        <div className="flex gap-5 mt-5 md:pr-10 md:mt-0 md:grid md:place-content-center">
                                            <ModalUpdateAddress />

                                            <button onClick={() => deleteAddress(value.id)} className="border-black">Delete Adress</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                        : null

                    }

                </div>

            </div>

            <Footer />
        </div>
    )
}

export default ManageAddress
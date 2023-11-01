import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import Button from "../../components/button"
import ModalNewAddress from "../../components/modalNewAddress"
import ModalUpdateAddress from "../../components/modalUpdateAddress"
import ModalDelete from "../../components/modalConfirmDelete"


const ManageAddress = () => {
    return (
        <div>
            <Navbar />

            <div className="mt-[70px] md:h-screen mx-5 pt-5 md:mx-20 lg:mx-32 mb-10">

                <div className="md:flex md:justify-between mt-5 md:mt-10">
                    <div className="text-4xl md:text-5xl font-bold gap-2 text-green-800">Manage Address
                    </div>

                    <div className="mt-5 md:mt-0">
                        <ModalNewAddress />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-5">
                    <div className="md:flex md:justify-between border-4 text-lg rounded-xl border-green-700 border-l-8 p-5">
                        <div className="grid gap-3">
                            <div className="flex gap-3">
                                <div className="text-3xl font-bold">Rumah Graha</div>
                                <div className="grid place-content-center rounded-xl px-2 bg-gradient-to-r from-yellow-300 to-green-600 text-white font-bold">Main</div>
                            </div>

                            <div>Melia Grove Graha Raya Blok GMB no.22, Melia Residence, Graha Raya</div>
                            <div className="font-semibold">South Tangerang - Banten</div>
                        </div>
                        <div className="flex gap-5 mt-5 md:pr-10 md:mt-0 md:grid md:place-content-center">
                            <ModalUpdateAddress />
                            <ModalDelete
                                button={<div className="hover:underline text-red-600">Delete Address</div>}
                                content={"Are you sure?"}
                                message={"Do you really want to delete this address? This process cannot be undone"} />
                        </div>
                    </div>

                    {/* address bukan main: */}
                    <div className="md:flex md:justify-between border-4 text-lg rounded-xl border-green-700 border-l-8 p-5">
                        <div className="grid gap-3">
                            <div className="flex gap-3">
                                <div className="text-3xl font-bold">Rumah Sekneg</div>
                            </div>

                            <div>Melia Grove Graha Raya Blok GMB no.22, Melia Residence, Graha Raya</div>
                            <div className="font-semibold">South Tangerang - Banten</div>
                        </div>
                        {/* <div className="hover:underline text-green-700">Make Main Address</div> */}
                        <div className="mt-5 md:grid md:place-content-center"><Button text={"Make Main Address"} style={"w-full"} /></div>
                        <div className="flex gap-5 mt-5 md:pr-10 md:mt-0 md:grid md:place-content-center">
                            <ModalUpdateAddress />
                            <ModalDelete
                                button={<div className="hover:underline text-red-600">Delete Address</div>}
                                content={"Are you sure?"}
                                message={"Do you really want to delete this address? This process cannot be undone"} />
                        </div>
                    </div>




                </div>

            </div>

            <Footer />
        </div>
    )
}

export default ManageAddress
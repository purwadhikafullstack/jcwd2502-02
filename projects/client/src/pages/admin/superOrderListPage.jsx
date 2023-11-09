import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import OrderComponent from "../../components/orderComponent"

const SuperOrderList = () => {



    return (
        <div>

            <Navbar />

            <div className="mt-[70px] md:mx-20 lg:mx-32 mx-5 h-screen">

                <div className="flex text-5xl font-bold gap-2 py-5 pl-5 text-green-800">Order List
                </div>
                <div className="grid gap-3">
                    <OrderComponent />
                    <OrderComponent />
                    <OrderComponent />
                    <OrderComponent />
                    <OrderComponent />
                    <OrderComponent />
                    <OrderComponent />
                    <OrderComponent />
                </div>

            </div>

            <Footer />

        </div>
    )
}

export default SuperOrderList
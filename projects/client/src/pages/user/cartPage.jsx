import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import { useDispatch, useSelector } from "react-redux";
import CartComponent from "../../components/cartComponent";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { api } from "../../api/api";
import { useEffect, useState } from "react";


const Cart = () => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart);
    const apiInstance = api()
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(true);

    const cartProductIds = cart.cart.map((cartItem) => cartItem.products_id);

    const productStock = async () => {
        try {
            const branch = await apiInstance.get(`/branch/nearest/1`);
            console.log(branch.data.data, "ini data branch");
            setProducts(branch.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        productStock()
    }, [])

    const totalSubtotal = cart.cart.reduce((sum, item) => sum + item.subtotal, 0);

    return (
        <div>
            <Toaster />
            <Navbar />

            <div className="mt-[70px] mx-5 pt-5 md:mx-20 lg:mx-32 ">

                <div className="flex text-5xl font-bold gap-2 text-green-800">My Cart
                </div>
                <div className="flex my-5 text-lg">
                    <div className="pt-1 pr-3"><FaLocationDot /> </div>
                    <div> Branch Name</div>
                </div>
                <div className="lg:flex lg:gap-12 md:mb-10">

                    <div className="flex flex-col gap-3 lg:flex-1 h-[500px] overflow-y-auto ">
                        {loading ? <span className="loading loading-spinner loading-md"></span> :
                            products
                                .filter((value) => cartProductIds.includes(value.products_id))
                                .map((filteredProduct, index) => (
                                    <div className="" key={index}>
                                        <CartComponent
                                            name={filteredProduct.product.name}
                                            price={filteredProduct.product.price}
                                            image={filteredProduct.product.image}
                                            stock={filteredProduct.stock}
                                            data={filteredProduct.products_id}
                                        />
                                    </div>
                                ))

                        }
                    </div>

                    <div className="bg-green-800 my-10 lg:my-0 p-3 rounded-xl md:h-[120px] lg:w-[400px]">
                        <div className="text-2xl lg:text-xl font-bold text-white flex justify-between">
                            <div>Total Order :</div>
                            <div>Rp {totalSubtotal.toLocaleString()}</div>
                        </div>
                        <div className="my-3">
                            <Link to={'/checkout'}>
                                <Button style={"w-full"} text={"Proceed to Checkout"} />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Cart
import { useEffect, useRef, useState } from "react"
import Button from "../../components/button"
import { api } from "../../api/api"
import ModalNewAdmin from "../../components/modalNewAdmin";
import ModalEditAdmin from "../../components/modalEditAdmin";
import toast, { Toaster } from "react-hot-toast";

export default function CreateAdminPage() {

    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [admin, setAdmin] = useState("");
    const [username, setUsername] = useState("");
    const [adminName, setAdminName] = useState("");

    const findName = useRef();
    const branchName = useRef();

    const onGetAdmins = async () => {
        try {
            const { data } = await api().get(`/users/get-admin`)
            setAdmin(data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDeactivateAdmin = async (email) => {
        console.log(`ini bakal matiin admin ${email}`);
        const response = await api().patch('/users/deactivate-admin', { email: email })
        toast.success(response.data.message);
        onGetAdmins()
    }

    const handleInputChange = () => {
        const nameFilter = findName.current.value;
        const branchFilter = branchName.current.value;
        console.log(`filter nama: ${nameFilter} & filter branch: ${branchFilter}`);
    }

    useEffect(() => {
        onGetAdmins()
    }, [])

    return (
        <div className="h-full bg-gradient-to-b from-green-700 to-yellow-300">
            <Toaster />
            <div className="">
                <div className="pt-12 font-bold text-2xl h-[120px] flex justify-center">
                    <h1>Admin Management Page</h1>
                </div>
                {/* <div className="shadow-xl mx-7 md:mx-12">
                <div className="flex object-fill rounded-t h-[150px] w-full border gap-1 rounded-2xl shadow-xl">
                    <div className="my-5 mx-3 border rounded-full h-[100px] w-[100px]">
                        <h1 className="flex justify-center items-center">
                            {admin?.profile_picture}
                        </h1>
                    </div>
                    <div className="my-4 font-semibold rounded-md w-1/2 md:w-1/3">
                        <h1 className="">
                            Name: {admin[0]?.username}
                        </h1>
                        <div>
                            <h1>
                                Email: {admin[0]?.email}
                            </h1>
                        </div>
                        <div>
                            <h1>Assignment: {admin[0]?.store_branch?.name}</h1>
                        </div>
                        <div>
                            <h1>
                                Admin status: <span className="text-red-600"> {admin[0]?.isVerified} </span>
                            </h1>
                        </div>
                    </div>
                    <div className="m-5 flex items-center font-semibold md:w-1/4">
                        <div className="">
                            <Button style={"lg:w-[130px] w-[110px] text-md font-semibold rounded-full"} text={"Deactivate"}/>
                        </div>
                    </div>
                </div>
            </div> */}
            </div>
            <div className="flex justify-end mx-10 gap-3">
                <input type="text" className="w-1/4 px-4" placeholder="Look up names here" ref={findName} onChange={handleInputChange} />
                <input type="text" className="w-1/6 px-4" placeholder="look up branch here" ref={branchName} onChange={handleInputChange} />
                {/* <Button onClick={() => setModal(!modal)} style={"w-[150px] bg-gray-300 hover:bg-gray-400 my-1 text-md font-semibold rounded-full"} text={"Create Admin"}/> */}
                <ModalNewAdmin getAdmins={() => onGetAdmins()} />
            </div>
            {
                admin && admin.map((value, index) => {
                    return (


                        <div className="border bg-slate-200 rounded-lg shadow-xl mx-6 my-4 lg:mx-12 lg:flex">
                            <div className="flex object-fill rounded-t h-[150px] w-full gap-1 rounded-2xl shadow-xl">
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
                                        <ModalEditAdmin getAdmins={onGetAdmins} adminData={value} key={index} />
                                        <Button onClick={() => handleDeactivateAdmin(value.email)} style={value.isVerified == "verified" ? "lg:w-[130px] w-[100px] my-1 text-md font-semibold rounded-full bg-red-400 hover:bg-red-500" : "lg:w-[130px] w-[100px] my-1 text-md font-semibold rounded-full bg-green-400 hover:bg-green-500"} text={value.isVerified == "verified" ? "Deactivate" : "Activate"} />
                                    </div>
                                </div>
                            </div>
                        </div>


                    )
                })
            }
        </div>
    )
}
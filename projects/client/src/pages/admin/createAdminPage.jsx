import { useEffect, useState } from "react"
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

const onGetAdmins = async () => {
    try {
        const {data} = await api().get(`/users/get-admin`)
        console.log(data);
        setAdmin(data.data);
    } catch (error) {
        console.log(error);
    }
}

const handleDeactivateAdmin = async (email) => {
    console.log(`ini bakal matiin admin ${email}`);
    const response = await api().patch('/users/deactivate-admin', {email: email})
    toast.success(response.data.message);
    onGetAdmins()
}

useEffect(() => {
    onGetAdmins()
}, [])

return(
    <div className="h-full bg-gradient-to-b from-green-700 to-yellow-300">
        <Toaster/>
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
        <div className="flex justify-end mx-10">
            {/* <Button onClick={() => setModal(!modal)} style={"w-[150px] bg-gray-300 hover:bg-gray-400 my-1 text-md font-semibold rounded-full"} text={"Create Admin"}/> */}
            <ModalNewAdmin />
        </div>
        {
            admin && admin.map((value, index) => {
                return (


                    <div className="border bg-slate-200 rounded-lg shadow-xl mx-7 my-4 md:mx-12">
                        <div className="flex object-fill rounded-t h-[150px] w-full gap-1 rounded-2xl shadow-xl">
                            <div className="my-5 mx-3 border border-black rounded-full h-[100px] w-[100px]">
                                {/* <h1 className="flex justify-center items-center">
                                    {value?.profile_picture}
                                </h1> */}
                                <img className="object-fit rounded-full h-[50px] w-[50px]" src={process.env.REACT_APP_URL + `${value?.profile_picture}`} />
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
                                    Admin status: <span className="text-red-600"> {value?.isVerified} </span>
                                </h1>
                            </div>
                            </div>
                                <div className="m-5 flex items-center font-semibold md:w-1/4">
                                    <div className="md:flex md:gap-4">
                                        <ModalEditAdmin adminData={value} key={index} />
                                        {/* <Button onClick={() => setModalEdit(!modalEdit)} style={"lg:w-[120px] w-[100px] my-1 text-md font-semibold rounded-full"} text={"Edit"}/> */}
                                        <Button onClick={() => handleDeactivateAdmin(value.email)} style={"lg:w-[130px] w-[100px] my-1 text-md font-semibold rounded-full bg-red-500 hover:bg-red-700"} text={"Deactivate"}/>
                                    </div>
                                </div>
                            </div>
                        </div>


                    )
                })
            }

            {
                modal ? 
                <div>
                    <ModalNewAdmin />
                </div> 
                :
                null
            }

{
                modalEdit ? 
                <div>
                    test modal edit admin
                </div> 
                :
                null
            }
        </div>
    )
}
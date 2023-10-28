import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import Button from "../../components/button"
import axios from "axios";
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from "react-hot-toast";
import debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";


const UpdateProfile = () => {
    const navigate = useNavigate()
    const apiInstance = api()
    const [data, setData] = useState('')
    const [preview, setPreview] = useState();
    const inputFileRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(null)

    let today = new Date().toISOString().split('T')[0];

    const getUserData = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            // console.log("ini token", accessToken);
            const data = await apiInstance.get("/users/fetch-user")
            setData(data.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    // const onSelectImages = (event) => {
    //     try {
    //         const file = event.target.files;

    //         if (file) {
    //             // Check file size and type here (validation)
    //             if (file.size > 1000000 || !/image\/(png|jpg|jpeg)/.test(file.type)) throw {
    //                 message: 'File must be less than 1MB and in png, jpg, or jpeg format!'
    //             }
    //             formik.setFieldValue('file', file);
    //         }
    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // };

    const formik = useFormik({
        initialValues: {
            file: null,
            id: "",
            username: "",
            email: "",
            gender: "",
            birthdate: "",
        },
        onSubmit: async (values) => {
            try {

                const updateUserData = await axios.patch('http://localhost:8905/api/users/update-user', formik.values)
                toast.success(updateUserData.data.message);
            } catch (error) {
                console.log(error);
            }
        },
        validationSchema: yup.object().shape({
            username: yup.string().required().min(3).max(10),
            email: yup.string().required().email(),
            gender: yup.string().required(),
            birthdate: yup.string().required(),
        })
    });
    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    }
    const debouncedHandleSubmit = debounce(() => {
        formik.handleSubmit();
        setTimeout(() => {
            navigate('/profile')
        }, 1500);
    }, 1000);

    useEffect(() => {
        getUserData();
        setCurrentImage(`http://localhost:8905/${data?.profile_picture}`);
        data.id
            ? formik.setValues({
                id: data.id,
                username: data.username,
                email: data.email,
                gender: data.gender,
                birthdate: data.birthdate,
            })
            : formik.setValues({
                id: '',
                username: '',
                email: '',
                gender: '',
                birthdate: '',
            });
    }, [data.id])

    return (
        <div>
            <Toaster />
            <Navbar />
            <div className="mt-[70px]">



                <div className="mx-5 mt-5 md:mx-36 lg:mx-64 flex text-4xl font-bold gap-2 py-5 pl-5 text-green-800">   <div className="grid place-content-center"><AiFillEdit /></div>
                    Update Profile </div>

                <div className=" mx-5 md:p-10 md:mx-36 lg:mx-64 flex flex-col gap-3 border p-3 py-5 rounded-xl shadow-lg">
                    {/* <div className="mt-10"></div> */}
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Username</div>
                        <input type="text" onChange={formik.handleChange} name="username" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.username} />
                        <div className=" pl-3 text-red-600">{formik.errors.username}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Email</div>
                        <input type="text" onChange={formik.handleChange} name="email" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.email} />
                        <div className="pl-3 text-red-600">{formik.errors.email}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Gender</div>
                        <select onChange={formik.handleChange} name="gender" defaultValue={formik.values.gender} className="rounded-2xl border border-green-800 p-3">
                            {formik.values.gender != "male" ? (<option value="male">Male</option>
                            ) : (<option value="male" selected>Male</option>
                            )}
                            {formik.values.gender == "female" ? (
                                <option value="female" selected>Female</option>
                            ) : (<option value="female">Female</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Birthdate</div>
                        <input type="date" name="birthdate" onChange={formik.handleChange} className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.birthdate} max={today} />
                    </div>
                </div>
                <div className="grid place-content-center m-10">
                    <Button onClick={() => debouncedHandleSubmit()} text={"Submit Changes"} />
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default UpdateProfile
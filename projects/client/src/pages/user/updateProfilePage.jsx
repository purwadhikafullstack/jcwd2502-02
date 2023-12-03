import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from "react-hot-toast";
import debounce from 'lodash/debounce';
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useEffect, useRef, useState } from "react";

const UpdateProfile = () => {
    const navigate = useNavigate()
    const apiInstance = api()
    const [disabled, setDisabled] = useState(false)
    const [data, setData] = useState('')
    const [preview, setPreview] = useState();
    const inputFileRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(null)
    let today = new Date().toISOString().split('T')[0];
    const [showPassword, setShowPassword] = useState(false);

    const getUserData = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const data = await apiInstance.get("/users/fetch-user")
            setData(data.data.data)
        } catch (error) {
            console.log(error);
        }
    }

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
                setDisabled(true)
                if (!values.username || !values.email || !values.gender || !values.birthdate) {
                    toast.error("Please input all data.");
                    setDisabled(false)
                    return;
                }
                const updateUserData = await apiInstance.patch('/users/update-user', formik.values)
                toast.success(updateUserData.data.message);
                setTimeout(() => {
                    navigate('/profile')
                }, 1500);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An error occurred while updating the user data.");
                }
                setDisabled(false)
            } finally {
                setDisabled(false)
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
        setCurrentImage(process.env.REACT_APP_URL + `${data?.profile_picture}`);
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
            <div className="grid place-content-center h-screen bg-gradient-to-b from-green-700 to-yellow-300">
                <div className="px-5 md:px-8 lg:px-10 flex-col gap-3 p-3 py-5 mb-10 rounded-xl shadow-lg bg-green-700 w-[300px] lg:w-[350px]">
                    <div className="text-center text-yellow-300 text-3xl font-black pb-5">Update Profile </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-bold text-sm">Username</div>
                        <input type="text" onChange={formik.handleChange} name="username" className="rounded-full border border-green-800 p-3 " defaultValue={formik.values.username} />
                        <div className=" text-orange-400 font-medium pl-3">{formik.errors.username}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-bold text-sm">Email</div>
                        <input type="text" onChange={formik.handleChange} name="email" className="rounded-full border border-green-800 p-3" defaultValue={formik.values.email} />
                        <div className="text-orange-400 font-medium pl-3">{formik.errors.email}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-bold text-sm">Gender</div>
                        <select onChange={formik.handleChange} name="gender" defaultValue={formik.values.gender} className="rounded-full border border-green-800 p-3">
                            <option value="" disabled>
                                Select Gender
                            </option>
                            <option value="male" selected={formik.values.gender === "male"}>
                                Male
                            </option>
                            <option value="female" selected={formik.values.gender === "female"}>
                                Female
                            </option>
                        </select>
                        <div className="text-orange-400 font-medium pl-3">{formik.errors.gender}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-bold text-sm">Birthdate</div>
                        <input type="date" name="birthdate" onChange={formik.handleChange} className="rounded-full border border-green-800 p-3" defaultValue={formik.values.birthdate} max={today} />
                        <div className="text-orange-400 font-medium pl-3">{formik.errors.birthdate}</div>
                    </div>
                    <div className="grid place-content-center mt-5">
                        {disabled ? <button className={"btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900 cursor-not-allowed"}>APPLYING CHANGES</button>
                            :
                            <div className="flex gap-3">
                                <Link to={'/profile'}>
                                    <button className={"btn bg-red-500 hover:bg-red-500 rounded-2xl border-4 border-black hover:border-black text-white"}>CANCEL</button>
                                </Link>
                                <button disabled={disabled} onClick={() => formik.handleSubmit()} type="submit" className={`${disabled ? "btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900 " : "btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900"} `}>{disabled ? "APPLYING CHANGES" : "SUBMIT"}</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdateProfile
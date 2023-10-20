import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import Button from "../../components/button"
import axios from "axios";
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from "react-hot-toast";
import debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const navigate = useNavigate()
    const handleSubmit = async () => {
        try {
            const updateUserData = await axios.patch('http://localhost:8905/api/users/update-user', formik.values)
            console.log(updateUserData);
        } catch (error) {
            console.log(error);
        }
    }
    let today = new Date().toISOString().split('T')[0];
    const formik = useFormik({
        initialValues: {
            id: 4,
            username: "Bayu",
            email: "bkprasetya@gmail.com",
            gender: "Male",
            birthdate: "2023-05-04",
        },
        onSubmit: async () => {
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
    const test = () => {
        console.log('test1233');
    }
    const debouncedHandleChange = debounce((name, value) => {
        formik.setFieldValue(name, value);
    }, 1500);

    const debouncedHandleSubmit = debounce(() => {
        formik.handleSubmit();
        setTimeout(() => {
            navigate('/profile')
        }, 1500);
    }, 1000);


    console.log('form values', formik.values);

    return (
        <div>
            <Toaster />
            <Navbar />
            <div className="mt-[70px]">
                <div className="grid place-content-center py-10 ">
                    <img className="w-[200px] h-[200px] md:w-[180px] lg:w-[220px] lg:h-[220px] md:h-[180px] bg-base-200 rounded-full drawer-button" src="" alt="" />
                </div>
                <div className="my-10 mx-5 md:p-10 md:mx-36 lg:mx-64 flex flex-col gap-3 border p-3 py-5 rounded-xl shadow-lg">
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Username</div>
                        <input type="text" onChange={(e) => debouncedHandleChange('username', e.target.value)} name="username" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.username} />
                        <div>{formik.errors.username}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Email</div>
                        <input type="text" onChange={(e) => debouncedHandleChange('email', e.target.value)} name="email" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.email} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Gender</div>
                        <select onChange={(e) => debouncedHandleChange('gender', e.target.value)} name="gender" defaultValue={formik.values.gender} className="rounded-2xl border border-green-800 p-3">
                            <option value={"Male"} >Male</option>
                            <option value={"Female"}>Female</option>
                            <option value={"None"}>Prefer Not to Say</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Birthdate</div>
                        <input type="date" name="birthdate" onChange={(e) => debouncedHandleChange('birthdate', e.target.value)} className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.birthdate} max={today} />
                    </div>
                </div>
                <div className="grid place-content-center mb-10">
                    <Button onClick={() => debouncedHandleSubmit()} text={"Submit Changes"} />
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default UpdateProfile
import Navbar from "../../components/navbarUser"
import Footer from "../../components/footer"
import Button from "../../components/button"

import { useFormik } from 'formik';
import * as yup from 'yup';


const UpdateProfile = () => {

    let today = new Date().toISOString().split('T')[0];


    const formik = useFormik({
        initialValues: {
            username: "Bayu",
            email: "bkprasetya@gmail.com",
            gender: "Male",
            birthday: "2023-05-04",
        },
        // onSubmit: registerUser,
        validationSchema: yup.object().shape({
            username: yup.string().required().min(3).max(10),
            email: yup.string().required().email(),
            gender: yup.string().required(),
            birthday: yup.string().required(),
        })
    });

    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    }

    const registerUser = () => {
        alert(formik.values.password)
    }

    const handleSubmit = () => {
        console.log('submit');
    }

    console.log('form values', formik.values);


    return (
        <div>

            <Navbar />

            <div className="mt-[70px]">


                <div className="grid place-content-center py-10 ">
                    <img className="w-[200px] h-[200px] md:w-[180px] lg:w-[220px] lg:h-[220px] md:h-[180px] bg-base-200 rounded-full drawer-button" src="" alt="" />
                </div>


                <div className="my-10 mx-5 md:p-10 md:mx-36 lg:mx-64 flex flex-col gap-3 border p-3 py-5 rounded-xl shadow-lg">
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Username</div>
                        <input type="text" onChange={formik.handleChange} name="username" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.username} />
                        <div>{formik.errors.username}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Email</div>
                        <input type="text" onChange={formik.handleChange} name="email" className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.email} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Gender</div>
                        <select onChange={formik.handleChange} name="gender" defaultValue={formik.values.gender} className="rounded-2xl border border-green-800 p-3">
                            <option value={"Male"} >Male</option>
                            <option value={"Female"}>Female</option>
                            <option value={"None"}>Prefer Not to Say</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-green-800">Birthday</div>
                        <input type="date" name="birthday" onChange={formik.handleChange} className="rounded-2xl border border-green-800 p-3" defaultValue={formik.values.birthday} max={today} />
                    </div>



                </div>

                {/* 
                <div className="grid place-content-center mb-10">
                    <Button text={"Submit Changes"} />
                </div> */}

            </div>

            <Footer />

        </div>
    )
}


export default UpdateProfile
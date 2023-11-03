import { FaLocationDot } from "react-icons/fa6";
import { BiSolidDownArrow } from "react-icons/bi";
import Button from '../components/button'
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from "react-hot-toast";
import debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const ModalNewAddress = () => {
    const apiInstance = api()
    const [selectedProvince, setSelectedProvince] = useState("");
    const [provinceId, setProvinceId] = useState()
    const [cityId, setCityId] = useState()

    const getProvinceId = async () => {
        try {
            const province = await apiInstance.get(`/location/province`)
            setProvinceId(province.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getCityId = async () => {
        try {
            const cityId = await apiInstance.get(`/location/city`)
            const cityData = cityId.data.data;
            cityData.sort((a, b) => a.name.localeCompare(b.name));
            setCityId(cityId.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    const inputAddress = useFormik({
        initialValues: {
            name: "",
            address: "",
            province_id: "",
            city_id: "",
            isPrimary: "false",
        },
        onSubmit: async (values) => {
            try {
                if (!values.name || !values.address || !values.province_id || !values.city_id) {
                    toast.error("Please fill in all required fields.");
                } else {
                    const newAddress = await apiInstance.post('/location/add-address', values);
                    // toast.success("New Address Successfully Added!");
                    inputAddress.resetForm();
                    document.getElementById('my_modal_1').close();
                    Swal.fire("Success!", "Address Successfully Added", "success");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } catch (error) {
                toast.error("Please fill all the data")
            }
        },
        validationSchema: yup.object().shape({
            name: yup.string().required(),
            address: yup.string().required(),
            province_id: yup.string().required(),
            city_id: yup.string().required(),
        })
    });
    const handleForm = (event) => {
        const { target } = event;
        inputAddress.setFieldValue(target.name, target.value);
    }
    const debouncedHandleSubmit = debounce(() => {
        inputAddress.handleSubmit();
    }, 1000);

    console.log(inputAddress.values);


    useEffect(() => {
        getProvinceId()
        getCityId()
    }, [])

    console.log(cityId);

    return (
        <div>
            <Toaster />

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <div onClick={() => document.getElementById('my_modal_1').showModal()} className="">
                <Button text={"+ Add New Address"} style={"w-full"}></Button>
            </div>
            <dialog id="my_modal_1" className="modal sm:modal-middle backdrop-blur-sm">
                <div className="modal-box">
                    <div className="font-bold text-3xl text-green-700 ">Where Should We Deliver?</div>

                    <div className="flex flex-col gap-3 mt-5">
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">Address Name:</div>
                            <input type="text" onChange={inputAddress.handleChange} name="name" className="rounded-2xl border border-green-800 p-3" value={inputAddress.values.name} />
                            <div className=" pl-3 text-red-600">{inputAddress.errors.name}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">Complete Address:</div>
                            <input type="text" onChange={inputAddress.handleChange} name="address" className="rounded-2xl border border-green-800 p-3" value={inputAddress.values.address} />
                            <div className=" pl-3 text-red-600">{inputAddress.errors.address}</div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">Province:</div>
                            <select
                                name="province_id"
                                onChange={(e) => {
                                    inputAddress.handleChange(e); // Handle formik change
                                    setSelectedProvince(e.target.value); // Update selectedProvince
                                }}
                                className="rounded-2xl border border-green-800 select"
                                value={inputAddress.values.province_id}>
                                <option value="">Select a province</option>
                                {provinceId
                                    ? provinceId.map((province, index) => (
                                        <option key={index} value={province.id}>
                                            {province.name}
                                        </option>
                                    ))
                                    : null}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">City:</div>
                            <select
                                name="city_id"
                                onChange={inputAddress.handleChange}
                                className="rounded-2xl border border-green-800 select"
                                value={inputAddress.values.city_id}
                            >
                                <option value="">Select a City</option>
                                {cityId
                                    ? cityId.map((city, index) => (
                                        <option key={index} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))
                                    : null}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 my-5">
                            <div className="flex gap-3">
                                <div className="font-bold text-green-800">Create as a Main Address
                                </div>
                                <input
                                    className="text-xl checkbox"
                                    type="checkbox"
                                    name="isPrimary"
                                    value={inputAddress.values.isPrimary}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        const newValue = isChecked ? "true" : "false";
                                        inputAddress.setFieldValue("isPrimary", newValue);
                                    }}
                                />
                            </div>

                        </div>

                    </div>

                    <div className="modal-action flex justify-center">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className="flex gap-2">

                                <button className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black rounded-2xl"
                                >CANCEL</button>



                            </div>
                        </form>
                        <Button type={"button"} onClick={() => debouncedHandleSubmit()} text={"SUBMIT"} />
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ModalNewAddress
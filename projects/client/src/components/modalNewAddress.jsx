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

const ModalNewAddress = () => {
    const apiInstance = api()
    const [selectedProvince, setSelectedProvince] = useState("");
    const [provinceId, setProvinceId] = useState()
    const [cityId, setCityId] = useState()

    const getProvinceId = async () => {
        try {
            const province = await apiInstance.get(`/location/province`)
            console.log(province.data.data);
            setProvinceId(province.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getCityId = async () => {
        try {
            const cityId = await apiInstance.get(`/location/city`)
            // console.log(cityId.data.message.data.rajaongkir.results);
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
            city_id: "",
        },
        onSubmit: async (values) => {
            alert("Halo")
        },
        validationSchema: yup.object().shape({
            name: yup.string().required(),
            address: yup.string().required(),
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


    return (
        <div>
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
                            <input type="text" onChange={inputAddress.handleChange} name="name" className="rounded-2xl border border-green-800 p-3" defaultValue={inputAddress.values.name} />
                            <div className=" pl-3 text-red-600">{inputAddress.errors.name}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">Complete Address:</div>
                            <input type="text" onChange={inputAddress.handleChange} name="address" className="rounded-2xl border border-green-800 p-3" defaultValue={inputAddress.values.address} />
                            <div className=" pl-3 text-red-600">{inputAddress.errors.address}</div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <select
                                name="province_name"
                                onChange={(e) => {
                                    // inputAddress.handleChange(e); // Handle formik change
                                    setSelectedProvince(e.target.value); // Update selectedProvince
                                }}
                                className="rounded-2xl border border-green-800 select"
                                defaultValue={inputAddress.values.province_name}>
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
                                defaultValue={inputAddress.values.city_id}
                            >
                                <option value="">Select a City</option>
                                {cityId
                                    ? cityId
                                        .filter((city) => city.province_id == selectedProvince) // Filter cities by selected province
                                        .map((city, index) => (
                                            <option key={index} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))
                                    : null}
                            </select>
                        </div>

                    </div>

                    <div className="modal-action flex justify-center">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className="flex gap-2">

                                <button className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black rounded-2xl"
                                >CANCEL</button>

                                <Button text={"SUBMIT"} />

                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ModalNewAddress
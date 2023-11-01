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

    const [provinceId, setProvinceId] = useState()
    const [cityId, setCityId] = useState()

    const getProvinceId = async () => {
        try {
            const provinceId = await apiInstance.get(`/location/province`)
            // console.log(cityId.data.message.data.rajaongkir.results);
            setProvinceId(provinceId.data.message.data.rajaongkir.results)
        } catch (error) {
            console.log(error);
        }
    }

    const getCityId = async () => {
        try {
            const cityId = await apiInstance.get(`/location/city`)
            // console.log(cityId.data.message.data.rajaongkir.results);
            const cityData = cityId.data.message.data.rajaongkir.results;
            cityData.sort((a, b) => a.city_name.localeCompare(b.city_name));
            setCityId(cityId.data.message.data.rajaongkir.results)
        } catch (error) {
            console.log(error);
        }
    }


    const inputAddress = useFormik({
        initialValues: {
            name: "",
            address: "",
            city_name: "",
            province_name: ""
        },
        onSubmit: async (values) => {
            alert("Halo")
        },
        validationSchema: yup.object().shape({
            name: yup.string().required(),
            address: yup.string().required(),
            city_name: yup.string().required(),
            province_name: yup.string().required(),
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
                        {/* <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">City:</div>
                            <input type="text" onChange={inputAddress.handleChange} name="city_name" className="rounded-2xl border border-green-800 p-3" defaultValue={inputAddress.values.city_name} />
                            <div className=" pl-3 text-red-600">{inputAddress.errors.city_name}</div>
                        </div> */}
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">City:</div>
                            <select name="city_name" onChange={inputAddress.handleChange} className="rounded-2xl border border-green-800 select " defaultValue={inputAddress.values.city_name}>
                                <option value="">Select a City</option>
                                {
                                    cityId ?

                                        cityId.map((city, index) => (
                                            <option key={index} value={city.city_id}>
                                                {city.city_name}
                                            </option>
                                        )) : null
                                }
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">Province:</div>
                            <select name="province_name" onChange={inputAddress.handleChange} className="rounded-2xl border border-green-800 select " defaultValue={inputAddress.values.province_name}>
                                <option value="">Select a province</option>
                                {
                                    provinceId ?

                                        provinceId.map((province, index) => (
                                            <option key={index} value={province.province_id}>
                                                {province.province}
                                            </option>
                                        )) : null
                                }
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
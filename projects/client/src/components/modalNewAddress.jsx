import Button from '../components/button'
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from "react-hot-toast";
import debounce from 'lodash/debounce';
import { api } from "../api/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const ModalNewAddress = (props) => {
    const apiInstance = api()
    const [selectedProvince, setSelectedProvince] = useState("");
    const [provinceId, setProvinceId] = useState()
    const [cityId, setCityId] = useState()
    const [disabled, setDisabled] = useState(false)
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
                setDisabled(true)
                if (values.name === "" || values.address === "" || values.province_id === "" || values.city_id === "") {
                    document.getElementById('my_modal_1').close();
                    toast.error("Please fill in all required fields.");
                    setDisabled(false)

                } else {
                    const newAddress = await apiInstance.post('/location/add-address', values);
                    inputAddress.resetForm();
                    document.getElementById('my_modal_1').close();
                    Swal.fire("Success!", "Address Successfully Added", "success");
                    props.onCreate()
                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 1000);
                }
            } catch (error) {
                document.getElementById('my_modal_1').close();
                toast.error("Please fill all the data")
                setDisabled(false)
            } finally {
                setDisabled(false)
            }
        },
        validationSchema: yup.object().shape({
            name: yup.string().required("Name Required"),
            address: yup.string().required("Address Required"),
            province_id: yup.string().required("Please Select Province"),
            city_id: yup.string().required("Please Select City"),
        })
    });
    const handleForm = (event) => {
        const { target } = event;
        inputAddress.setFieldValue(target.name, target.value);
    }

    useEffect(() => {
        getProvinceId()
        getCityId()
    }, [])

    return (
        <div>
            <Toaster />
            <div onClick={() => document.getElementById('my_modal_1').showModal()} className="">
                <Button text={"+ Add New Address"} style={"w-full"}></Button>
            </div>
            <dialog id="my_modal_1" className="modal sm:modal-middle backdrop-blur-sm">
                <div className="modal-box">
                    <div className="font-bold text-3xl text-green-700 ">Where Should We Deliver?</div>

                    <div className="flex flex-col gap-3 mt-5">
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">Address Name:</div>
                            <input type="text" onBlur={inputAddress.handleBlur} onChange={inputAddress.handleChange} name="name" className="rounded-2xl border border-green-800 p-3" value={inputAddress.values.name} />
                            {
                                inputAddress.touched.name && inputAddress.errors.name ?
                                    <div className=" pl-3 text-red-600">{inputAddress.errors.name} </div>
                                    :
                                    null
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="lg:flex font-bold text-green-800">Complete Address: <div className="text-gray-400 text-xs lg:grid lg:place-content-center lg:pl-2">(Jl. Rajawali Blok C No 3, Menteng, Jakarta Pusat)</div></div>
                            <input type="text" onBlur={inputAddress.handleBlur} onChange={inputAddress.handleChange} name="address" className="rounded-2xl border border-green-800 p-3" value={inputAddress.values.address} />
                            {
                                inputAddress.touched.address && inputAddress.errors.address ?
                                    <div className=" pl-3 text-red-600">{inputAddress.errors.address} </div>
                                    :
                                    null
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">Province:</div>
                            <select
                                name="province_id"
                                onBlur={inputAddress.handleBlur}
                                onChange={(e) => {
                                    inputAddress.handleChange(e); setSelectedProvince(e.target.value);
                                }}
                                className="rounded-2xl border border-green-800 select" value={inputAddress.values.province_id}>
                                <option value="">Select a province</option>
                                {provinceId
                                    ? provinceId.map((province, index) => (
                                        <option key={index} value={province.id}>
                                            {province.name}
                                        </option>
                                    ))
                                    : null}
                            </select>
                            {
                                inputAddress.touched.province_id && inputAddress.errors.province_id ?
                                    <div className=" pl-3 text-red-600">{inputAddress.errors.province_id} </div>
                                    :
                                    null
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">City:</div>
                            <select
                                name="city_id"
                                onBlur={inputAddress.handleBlur}
                                onChange={inputAddress.handleChange}
                                className="rounded-2xl border border-green-800 select"
                                value={inputAddress.values.city_id}
                            >
                                <option value="">Select a City</option>
                                {cityId
                                    ? cityId
                                        .filter((city) => city.province_id == selectedProvince)
                                        .map((city, index) => (
                                            <option key={index} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))
                                    : null}
                            </select>
                            {
                                inputAddress.touched.city_id && inputAddress.errors.city_id ?
                                    <div className=" pl-3 text-red-600">{inputAddress.errors.city_id} </div>
                                    :
                                    null
                            }
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
                            <div className="flex gap-2">
                                {disabled ? null : <button className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black rounded-2xl"
                                >CANCEL</button>}
                            </div>
                        </form>
                        {disabled ? <button className={"btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900 cursor-not-allowed"}>CREATING</button>
                            :
                            <button disabled={disabled} onClick={() => inputAddress.handleSubmit()} type="submit" className={`${disabled ? "btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900 " : "btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900"} `}>{disabled ? "APPLYING CHANGES" : "SUBMIT"}</button>
                        }
                    </div>
                </div>
            </dialog>
        </div>
    )
}
export default ModalNewAddress
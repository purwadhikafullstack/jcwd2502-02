import { useFormik } from 'formik';
import * as yup from 'yup';
import debounce from 'lodash/debounce';
import { api } from "../api/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from 'react-hot-toast';


const ModalUpdateAddress = ({ id, onClick, name }) => {

    console.log(id);

    const apiInstance = api()
    const [selectedProvince, setSelectedProvince] = useState("");
    const [provinceId, setProvinceId] = useState()
    const [cityId, setCityId] = useState()
    const [addressData, setAddressData] = useState()

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

    const dataUpdate = useFormik({
        initialValues: {
            name: "",
            address: "",
            city_id: "",
            province_id: ""
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const UpdateAddres = await apiInstance.patch(`/location/address/${id}`, dataUpdate.values)
                document.getElementById('my_modal_' + id).close();
                Swal.fire("Success!", "Address Successfully Updated", "success");
                resetForm();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        },
        validationSchema: yup.object().shape({
            name: yup.string().required(),
            address: yup.string().required(),
            city_id: yup.string().required(),
            province_id: yup.string().required(),
        })
    });

    const debouncedHandleSubmit = debounce(() => {
        dataUpdate.handleSubmit();
    }, 1000);


    const getAddress = async () => {
        try {
            const addressDetail = await apiInstance.get(`/location/${id}`)
            console.log(addressDetail.data.data);
            setAddressData(addressDetail.data.data)
            dataUpdate.setValues({
                name: addressDetail.data.data.name,
                address: addressDetail.data.data.address,
                province_id: addressDetail.data.data.city.province.id,
                city_id: addressDetail.data.data.city.id
            })
            setSelectedProvince(addressDetail.data.data.city.province.id)
        } catch (error) {
            console.log(error);
        }
    }

    console.log(dataUpdate.values);
    useEffect(() => {
        getProvinceId()
        getCityId()
        getAddress()
    }, [])

    return (
        <div>
            <div
                onClick={() => document.getElementById('my_modal_' + id).showModal()}
                className="">
                <div className="hover:underline text-green-700">Update Address</div>
            </div>
            <dialog id={"my_modal_" + id} className="modal sm:modal-middle backdrop-blur-sm">
                <div className="modal-box">
                    <div className="font-bold text-3xl text-green-700 ">Update Address: {name} </div>

                    <div className="flex flex-col gap-3 mt-5">
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">Address Name:</div>
                            <input type="text" onChange={dataUpdate.handleChange} name="name" className="rounded-2xl border border-green-800 p-3" defaultValue={dataUpdate.values.name}
                            />
                            <div className=" pl-3 text-red-600">{dataUpdate.errors.name}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">Complete Address:</div>
                            <input type="text" onChange={dataUpdate.handleChange} name="address" className="rounded-2xl border border-green-800 p-3" defaultValue={dataUpdate.values.address} />
                            <div className=" pl-3 text-red-600">{dataUpdate.errors.address}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-green-800">Province:</div>
                            <select
                                name="province_id"
                                onChange={(e) => {
                                    dataUpdate.handleChange(e); // Handle formik change
                                    setSelectedProvince(e.target.value || dataUpdate.values.province_id);
                                }}
                                className="rounded-2xl border border-green-800 select"
                                value={dataUpdate.values.province_id}>
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
                                onChange={dataUpdate.handleChange}
                                className="rounded-2xl border border-green-800 select"
                                value={dataUpdate.values.city_id}
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
                        </div>
                    </div>
                    <div className="modal-action flex justify-center">
                        <form method="dialog">
                            <div className="flex gap-2">
                                <button className="btn bg-red-600 ml-3 text-white border-4 border-black hover:bg-red-600 hover:border-black rounded-2xl"
                                >CANCEL</button>
                            </div>
                        </form>
                        <button type="button" onClick={() => dataUpdate.handleSubmit()} className="btn bg-yellow-300 ml-3 text-green-700 border-4 border-green-700 hover:bg-yellow-300 hover:border-green-700 rounded-2xl"
                        >SUBMIT</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ModalUpdateAddress

import React from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

const MyForm = ({ id }) => {
    const formik = useFormik({
        initialValues: {
            input1: '',
            input2: '',
        },
        onSubmit: (values) => {
        },
    });

    const openSwalModal = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Multiple inputs',
            html: `<input id="swal-input1" class="swal2-input" value="${formik.values.input1}" placeholder="Input 1">
               <input id="swal-input2" class="swal2-input" value="${formik.values.input2}" placeholder="Input 2">`,
            focusConfirm: false,
            preConfirm: () => {
                formik.setValues({
                    ...formik.values,
                    input1: document.getElementById('swal-input1').value,
                    input2: document.getElementById('swal-input2').value,
                });
                formik.validateForm();
            },
        });

        if (formValues) {

        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="input1">Input 1</label>
                <input
                    type="text"
                    id="input1"
                    name="input1"
                    onChange={formik.handleChange}
                    value={formik.values.input1}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.input1 && formik.errors.input1 && (
                    <div>{formik.errors.input1}</div>
                )}
            </div>

            <div>
                <label htmlFor="input2">Input 2</label>
                <input
                    type="text"
                    id="input2"
                    name="input2"
                    onChange={formik.handleChange}
                    value={formik.values.input2}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.input2 && formik.errors.input2 && (
                    <div>{formik.errors.input2}</div>
                )}
            </div>

            <button type="submit">Submit</button>
            <button type="button" onClick={openSwalModal}>
                Open Swal Modal
            </button>
        </form>
    );
};

export default MyForm;

"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";



export default function BingoPaymentForm() {
    const searchParams = useSearchParams();
    const cartones = JSON.parse(searchParams.get("cartones") || "[]");
    const total = searchParams.get("total") || 0;
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            reference: "",
            //receipt: null as File | null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Campo requerido"),
            phone: Yup.string().required("Campo requerido"),
            email: Yup.string().email("Correo inválido").required("Campo requerido"),
            reference: Yup.string()
                .length(4, "Debe tener 4 dígitos")
                .required("Campo requerido"),
            //receipt: Yup.mixed<File>().required("Sube el comprobante"),
        }),
        onSubmit: (values) => {
            console.log("Datos enviados:", values);
        },
    });

    // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     if (event.currentTarget.files && event.currentTarget.files[0]) {
    //         formik.setFieldValue("receipt", event.currentTarget.files[0]);
    //     }
    // };

    return (
        <div className="w-full mx-auto p-6 md:px-20 my-5 rounded-lg text-white">
            <h2 className="text-xl sm:text-3xl font-bold text-center">REALIZA TU PAGO Y ENVIA TUS DATOS</h2>
            <p className="text-sm md:text-xl text-center">Te contactamos a través de tu número de teléfono</p>

            <div className="bg-white text-black p-4 rounded mt-4">
                <h3 className="font-bold text-[#D98019]">PAGO MOVIL:</h3>
                <p className="p-1.5"><strong>Banco:</strong> Venezuela</p>
                <p className="p-1.5"><strong>Teléfono:</strong> 1112233344</p>
                <p className="p-1.5"><strong>Cédula:</strong> 1112233344</p>
                <p className="p-1.5"><strong>Monto a pagar:</strong>{total}bs</p>
                {/* Línea divisoria */}
                <div className="border-t border-black w-full mx-auto my-4"></div>
                <p><strong>Cartones seleccionados:</strong> {cartones.join(", ")}</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="mt-4 w-full">
                <h2 className="text-xl text-white font-bold my-5">DATOS DE CONTACTO</h2>
                <div className="w-full md:flex md:gap-5">
                    <div className="w-full">
                        <label className="block">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-2 border border-[#8E8989] rounded text-black bg-white"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-sm">{formik.errors.name}</p>
                        )}
                    </div>

                    <div className="w-full">
                        <label className="block">Teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            className="w-full p-2 border border-[#8E8989] rounded text-black bg-white"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                        )}
                    </div>
                </div>


                <div className="mt-2">
                    <label className="block">Correo</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full p-2 border border-[#8E8989] rounded text-black bg-white"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm">{formik.errors.email}</p>
                    )}
                </div>

                <h2 className="text-xl text-white font-bold my-5">DATOS DE PAGO</h2>

                <div className="mt-2">
                    <label className="block">Últimos 4 números de referencia</label>
                    <input
                        type="text"
                        name="reference"
                        className="w-full p-2 border border-[#8E8989] rounded text-black bg-white"
                        onChange={formik.handleChange}
                        value={formik.values.reference}
                    />
                    {formik.touched.reference && formik.errors.reference && (
                        <p className="text-red-500 text-sm">{formik.errors.reference}</p>
                    )}
                </div>

                <div className="mt-2">
                    <label className="block">Subir comprobante</label>
                    <input
                        type="file"
                        name="receipt"
                        className="w-full p-2 border border-[#8E8989] rounded text-black bg-white"

                    />

                </div>

                <button
                    type="submit"
                    className="mt-10 w-full bg-yellow-500 text-white py-2 rounded font-bold hover:bg-yellow-600"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}

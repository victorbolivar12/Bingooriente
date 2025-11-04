"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'
import BankInfo from "@/app/components/subcomponents/BankInfo";
import InputField from "@/app/components/subcomponents/InputField";

import { useState } from "react";


type FormValues = {
    name: string;
    phone: string;
    email: string;
    // reference: string;
    // receipt: File | null;
    // code: string;
    // signo: string;
};


export default function BingoPaymentForm() {
    const searchParams = useSearchParams();
    const cartones = JSON.parse(searchParams.get("cartones") || "[]");
    const total = searchParams.get("total") || 0;
    const router = useRouter();
    const [isLoading, setIsloading] = useState<boolean>(false)

    const handleSubmit = async (values: FormValues) => {
        setIsloading(true);
        try {
            const formData = new FormData();
            formData.append("nombre", values.name);
            formData.append("telefono", values.phone);
            formData.append("correo", values.email);
            //formData.append("referencia_pago", values.reference);
            //formData.append("receipt", values.receipt);
            formData.append("cartones", JSON.stringify(cartones));
            //formData.append("code", values.code);
            //formData.append("signo", values.signo);

            const response2 = await fetch("api/enviar-correo", {
                method: "POST",
                body: formData,
            });

            if (!response2.ok) {
                throw new Error("Error al enviar los datos");
            }

            const response = await fetch("api/comprar-cartones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: values.name,
                    telefono: values.phone,
                    correo: values.email,
                    //referencia_pago: values.reference,
                    cartones,
                    // code: values.code,
                    // signo: values.signo,
                }),
            });

            if (!response.ok) {
                throw new Error("Error al enviar los datos");
            }

            Swal.fire({
                title: '¡Ya estás participando! 🎉',
                html: `
                    <p>Descarga tu cartón y únete al juego.</p>
                    <p>¡Mucha suerte! 🍀</p>
                `,
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Descargar Cartón',
                cancelButtonText: 'Volver al inicio',
                confirmButtonColor: '#28a745',
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/Buscar-Carton');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    router.push('/');
                }
            });


        } catch (error) {
            console.error("Error en la solicitud:", error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al enviar los datos.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } finally {
            setIsloading(false);
        }
    };

    const formik = useFormik<FormValues>({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            // reference: "",
            // receipt: null,
            // code: "",
            // signo: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Campo requerido"),
            phone: Yup.string().required("Campo requerido"),
            email: Yup.string().email("Correo inválido").required("Campo requerido"),
            // reference: Yup.string()
            //     .length(4, "Debe tener 4 dígitos")
            //     .required("Campo requerido"),
            // receipt: Yup.mixed<File>().required("Sube el comprobante"),
            // code: Yup.string().when([], {
            //     is: () => cartones.length > 3,
            //     then: (schema) => schema.length(4, "Debe tener 4 dígitos").required("Campo requerido"),
            //     otherwise: (schema) => schema.notRequired(),
            // }),

            // signo: Yup.string().when([], {
            //     is: () => cartones.length > 3,
            //     then: (schema) => schema.required("Campo requerido"),
            //     otherwise: (schema) => schema.notRequired(),
            // }),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });


    // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     if (event.currentTarget.files && event.currentTarget.files[0]) {
    //         formik.setFieldValue("receipt", event.currentTarget.files[0]);
    //     }
    // };


    return (
        <div className="w-full mx-auto p-6 md:px-20 my-5 rounded-lg text-white">

            {isLoading && (
                <div className="fixed sm:w-84 bottom-4 right-4 bg-green-600 border-2 border-white text-white px-4 py-2 rounded shadow-lg z-50 font-light animate-fade-up">
                    <span className="font-bold">PROCESANDO PAGO!</span> <br />
                    Esto puede tardar unos minutos...
                </div>
            )}

            <h2 className="text-xl sm:text-3xl font-bold text-center">REALIZA TU PAGO Y ENVIA TUS DATOS</h2>
            <p className="text-sm md:text-xl text-center">Te contactamos a través de tu número de teléfono</p>

            <BankInfo cartones={cartones} total={total} />


            <form onSubmit={formik.handleSubmit} className="mt-4 w-full">
                <h2 className="text-xl text-white font-bold my-5">DATOS DE CONTACTO</h2>

                <div className="w-full md:flex md:gap-5">
                    <InputField label="Nombre" name="name" type="text" formik={formik} maxLength={100} />
                    <InputField label="Teléfono (Ej:04121234567)" name="phone" type="text" formik={formik} maxLength={30} />
                </div>

                <div className="mt-2">
                    <InputField label="Correo" name="email" type="email" formik={formik} maxLength={200} />
                </div>

                {/* <h2 className="text-xl text-white font-bold my-5">DATOS DE PAGO</h2>

                <div className="mt-2">
                    <InputField label="Número de referencia (4 dígitos)" name="reference" type="text" formik={formik} maxLength={4} />
                </div>

                <div className="mt-2">
                    <label className="block">Subir comprobante</label>
                    <input
                        type="file"
                        name="receipt"
                        className="w-full p-2 border border-[#8E8989] rounded text-black bg-white"
                        onChange={handleFileChange}
                    />
                    {formik.touched.receipt && formik.errors.reference && (
                        <p className="text-white text-sm">{formik.errors.reference}</p>
                    )}
                </div> */}

                {/* {cartones.length >= 3 && (
                    <>
                        <h2 className="text-xl text-white font-bold my-5">DATOS DEL SORTEO</h2>

                        <div className="sm:flex w-full gap-5">
                            <InputField label="Código de Sorteo (4 dígitos) Ejemplo 1497" name="code" type="text" formik={formik} maxLength={4} />
                            <div className="mt-2">
                                <label htmlFor="signo" className="block">Selecciona tu signo zodiacal</label>
                                <select
                                    id="signo"
                                    name="signo"
                                    className="w-full p-2 border border-[#8E8989] rounded text-black bg-white"
                                    value={formik.values.signo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">-- Selecciona un signo --</option>
                                    <option value="Aries">Aries</option>
                                    <option value="Tauro">Tauro</option>
                                    <option value="Géminis">Géminis</option>
                                    <option value="Cáncer">Cáncer</option>
                                    <option value="Leo">Leo</option>
                                    <option value="Virgo">Virgo</option>
                                    <option value="Libra">Libra</option>
                                    <option value="Escorpio">Escorpio</option>
                                    <option value="Sagitario">Sagitario</option>
                                    <option value="Capricornio">Capricornio</option>
                                    <option value="Acuario">Acuario</option>
                                    <option value="Piscis">Piscis</option>
                                </select>
                                {formik.touched.signo && formik.errors.signo && (
                                    <p className="text-white text-sm">{formik.errors.signo}</p>
                                )}
                            </div>
                        </div>
                    </>
                )} */}

                <button
                    type="submit"
                    className="mt-10 w-full bg-green-500 text-white py-2 rounded font-bold hover:bg-green-600 cursor-pointer transition"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}

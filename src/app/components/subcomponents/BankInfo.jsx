"use client";
import React, { useEffect, useState } from "react";

const BankInfo = ({ cartones = [], total }) => {
    const [bankData, setBankData] = useState(null);


    useEffect(() => {
        const fetchBankData = async () => {
            try {
                const res = await fetch("api/configuracion"); 
                const data = await res.json();
                setBankData(data);
            } catch (error) {
                console.error("Error al cargar datos del banco:", error);
            }
        };

        fetchBankData();
    }, []);

    if (!bankData) {
        return <p className="text-gray-500">Cargando datos del banco...</p>;
    }

    console.log("Datos del banco:", bankData);

    return (
        <div className="bg-white text-black p-4 rounded mt-4">
            <h3 className="font-bold text-[#D98019]">PAGO MÓVIL:</h3>
            <p className="p-1.5"><strong>Banco:</strong> {bankData?.banco_pago}</p>
            <p className="p-1.5"><strong>Teléfono:</strong> {bankData?.telefono_pago}</p>
            <p className="p-1.5"><strong>Cédula:</strong> {bankData?.cedula_pago}</p>
            <p className="p-1.5"> <strong>Monto a pagar:</strong> {total} bs </p>

            {/* Línea divisoria */}
            <div className="border-t border-black w-full mx-auto my-4"></div>

            <p>
                <strong>Cartones seleccionados:</strong>
            </p>
            <div className="grid grid-cols-5 md:grid-cols-15 gap-5 mt-6">
                {cartones.map((carton, index) => (
                    <div
                        key={index}
                        className="p-1 bg-yellow-500 text-white rounded-md flex justify-center"
                    >
                        {carton}
                    </div>
                ))}
            </div>

            {cartones.length >= 3 && (
                <p className="mt-4">
                    <strong>Instrucciones:</strong> Al confirmar tu pago de 3 cartones o más participas en el sorteo de {bankData?.monto_sorteo}, recuerda llenar tus datos al final para participar
                </p>
            )}
        </div>
    );
};

export default BankInfo;

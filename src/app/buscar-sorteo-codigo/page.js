"use client";
import React, { useState } from "react";

// Componente que consulta la información del sorteo por código
const SearchSorteoByCode = () => {
    const [codigoSorteo, setCodigoSorteo] = useState(""); // Código del sorteo
    const [sorteo, setSorteo] = useState(null); // Información del sorteo
    const [loading, setLoading] = useState(false); // Indicador de carga
    const [error, setError] = useState(""); // Mensaje de error

    // Función que maneja la búsqueda del sorteo
    const handleSearch = async () => {
        if (!codigoSorteo) {
            setError("El código de sorteo es obligatorio.");
            return;
        }

        setLoading(true);
        setError("");
        try {
            // Llamada al endpoint para obtener la información del sorteo
            const response = await fetch("/api/buscar-codigo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ codigoSorteo }),
            });

            const data = await response.json();

            if (response.ok) {
                setSorteo(data.result); // Guardamos la información del sorteo
            } else {
                setSorteo(null); // No se encontró el sorteo
                setError(data.message); // Mostramos el error
            }
        } catch (err) {
            setError("Hubo un error al obtener la información del sorteo.");
            setSorteo(null);
        } finally {
            setLoading(false);
        }
    };

    console.log(sorteo);

    return (
        <div className="bg-[#950F0F] min-h-screen p-8">
            <h1 className="text-white text-center text-3xl font-bold mb-2">
                Buscar Sorteo por Código
            </h1>
            <p className="text-white text-center mb-6">
                Ingresa el código del sorteo para obtener la información completa
            </p>

            {/* Campo de búsqueda */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Código de Sorteo"
                    value={codigoSorteo}
                    onChange={(e) => setCodigoSorteo(e.target.value)}
                    className="p-2 rounded border border-gray-300 w-full md:w-1/4 bg-white text-black"
                />
                <button
                    onClick={handleSearch}
                    className="p-2 bg-[#D98019] text-white rounded w-full md:w-1/4"
                >
                    Buscar
                </button>
            </div>

            {/* Mostrar error si hay */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Cargar indicador */}
            {loading && <p className="text-white text-center">Cargando...</p>}

            {/* Mostrar la información del sorteo */}
            {sorteo && !loading && (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-white rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-[#D98019] text-white">
                                <th className="p-4 text-left">Nombre Cliente</th>
                                <th className="p-4 text-left">Teléfono Cliente</th>
                                <th className="p-4 text-left">Número de Cartón</th>
                                <th className="p-4 text-left">Monto</th>
                                <th className="p-4 text-left">Signo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={sorteo.id} className="border-t text-black">
                                <td className="p-4">{sorteo.nombre_cliente}</td>
                                <td className="p-4">{sorteo.telefono_cliente}</td>
                                <td className="p-4">{sorteo.numero_carton}</td>
                                <td className="p-4">{sorteo.monto}</td>
                                <td className="p-4">{sorteo.signo}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SearchSorteoByCode;

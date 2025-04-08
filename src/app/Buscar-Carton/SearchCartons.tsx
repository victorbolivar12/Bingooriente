"use client";
import React, { useState } from "react";
import Loading from "../components/Loading";

const SearchCartons = () => {
  const [phone, setPhone] = useState(""); // Almacenar el número de teléfono
  const [cartons, setCartons] = useState([]); // Almacenar los resultados de cartones
  const [isLoading, setIsLoading] = useState(false); // Para mostrar el estado de carga
  const [error, setError] = useState(""); // Para manejar errores

  const handleSearch = async () => {
    if (!phone) {
      setError("El número de teléfono es requerido");
      return;
    }

    setIsLoading(true);
    setError(""); // Limpiar cualquier error anterior

    try {
      const response = await fetch("/api/buscar-carton", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ telefono: phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setCartons(data.cartones); // Establecer los resultados de cartones
      } else {
        setCartons([]); // Limpiar resultados si no se encuentran cartones
        setError(data.message || "No se encontraron cartones.");
      }
    } catch (error) {
      console.error(error);
      setError("Hubo un error al realizar la búsqueda.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (cartonId) => {
    const link = document.createElement("a");
    const imagePath = cartonId
    ? `/CARTONES_JPG_1200/SERIAL_1200_CARTON_${String(cartonId).padStart(5, "0")}.jpg`
    : "/placeholder.jpg"; // Imagen por defecto si cartonId es null
    link.href = imagePath; 
    link.download = `carton ${cartonId}.jpg`; // Cambia el nombre si es necesario
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#950F0F] min-h-screen p-8">
      <h1 className="text-white text-center text-3xl font-bold mb-2">DESCARGA TU CARTÓN</h1>
      <p className="text-white text-center mb-6">Busca tu cartón ingresando el teléfono</p>

      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 rounded border border-gray-300 w-full bg-white text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-[#D98019] text-white p-2 rounded-md"
        >
          Buscar
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-[#D98019] text-white">
                <th className="p-4 text-left">Número de Cartón</th>
                <th className="p-4 text-left">Estado</th>
                <th className="p-4 text-left">Descargar Carton</th>
              </tr>
            </thead>
            <tbody>
              {cartons.length > 0 ? (
                cartons.map((item, index) => (
                  <tr key={index} className="border-t text-black">
                    <td className="p-4">{item.carton_numero}</td>
                    <td className="p-4">{item.status}</td>
                    <td className="p-4">
                      {/* Botón de descargar cartón */}
                      {item && (
                        <button
                          onClick={() => handleDownload(item.carton_numero)}
                          className="bg-[#950F0F] text-white p-2 rounded-md cursor-pointer"
                        >
                          Descargar Cartón
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-center text-gray-500">
                    No se encontraron resultados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchCartons;

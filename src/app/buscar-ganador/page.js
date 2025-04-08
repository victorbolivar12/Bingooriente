"use client";
import React, { useState } from "react";


// Componente que consulta la información del cliente por número de cartón
const SearchClientByCarton = () => {
  const [cartonNumber, setCartonNumber] = useState(""); // Número del cartón
  const [cliente, setCliente] = useState(null); // Información del cliente
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(""); // Mensaje de error

  // Función que maneja la búsqueda del cliente
  const handleSearch = async () => {
    if (!cartonNumber) {
      setError("El número de cartón es obligatorio.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      // Llamada al endpoint para obtener la información del cliente
      const response = await fetch("/api/buscar-carton-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numeroCarton: cartonNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setCliente(data.result); // Guardamos la información del cliente
      } else {
        setCliente(null); // No se encontró el cliente
        setError(data.message); // Mostramos el error
      }
    } catch (err) {
      setError("Hubo un error al obtener la información.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#950F0F] min-h-screen p-8">
      <h1 className="text-white text-center text-3xl font-bold mb-2">Buscar Cliente por Número de Cartón</h1>
      <p className="text-white text-center mb-6">Ingresa el número de cartón para obtener la información del cliente</p>

      {/* Campo de búsqueda */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Número de Cartón"
          value={cartonNumber}
          onChange={(e) => setCartonNumber(e.target.value)}
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

      {/* Mostrar la información del cliente */}
      {cliente && !loading && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-[#D98019] text-white">
                <th className="p-4 text-left">Nombre</th>
                <th className="p-4 text-left">Teléfono</th>
                <th className="p-4 text-left">Correo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t text-black">
                <td className="p-4">{cliente.nombre}</td>
                <td className="p-4">{cliente.telefono}</td>
                <td className="p-4">{cliente.correo}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchClientByCarton;

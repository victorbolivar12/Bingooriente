"use client"
import React, { useState } from "react";

const data = [
  { id: "1", name: "Darivel Gonzales", phone: "042412223344", cartons: 5 },
  { id: "2", name: "Carlos Pérez", phone: "042412223355", cartons: 3 },
  { id: "3", name: "María López", phone: "042412223366", cartons: 7 },
  { id: "4", name: "Ana Fernández", phone: "042412223377", cartons: 2 },
  { id: "5", name: "Luis Martínez", phone: "042412223388", cartons: 4 },
];

const SearchCartons = () => {
  const [searchByName, setSearchByName] = useState("");
  const [searchById, setSearchById] = useState("");
  const [searchByPhone, setSearchByPhone] = useState("");

  const filteredData = data.filter((item) => {
    return (
      (searchByName ? item.name.toLowerCase().includes(searchByName.toLowerCase()) : true) &&
      (searchById ? item.id.includes(searchById) : true) &&
      (searchByPhone ? item.phone.includes(searchByPhone) : true)
    );
  });

  return (
    <div className="bg-[#950F0F] min-h-screen p-8">
      <h1 className="text-white text-center text-3xl font-bold mb-2">DESCARGA TU CARTÓN</h1>
      <p className="text-white text-center mb-6">Busca tu cartón ingresando el nombre, ID o teléfono</p>

      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por Nombre"
          value={searchByName}
          onChange={(e) => setSearchByName(e.target.value)}
          className="p-2 rounded border border-gray-300 w-full md:w-1/4 bg-white text-black"
        />
        <input
          type="text"
          placeholder="Buscar por ID"
          value={searchById}
          onChange={(e) => setSearchById(e.target.value)}
          className="p-2 rounded border border-gray-300 w-full md:w-1/4 bg-white text-black"
        />
        <input
          type="text"
          placeholder="Buscar por Teléfono"
          value={searchByPhone}
          onChange={(e) => setSearchByPhone(e.target.value)}
          className="p-2 rounded border border-gray-300 w-full md:w-1/4 bg-white text-black"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-[#D98019] text-white">
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Cartones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="border-t text-black">
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.cartons}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center text-gray-500">No se encontraron resultados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchCartons;

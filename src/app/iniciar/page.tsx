"use client";

import { useEffect, useState } from "react";

export default function IniciarSorteoPage() {
  const [mensaje, setMensaje] = useState("Iniciando sorteo...");

  useEffect(() => {
    const iniciar = async () => {
      try {
        const res = await fetch("/api/iniciar-sorteo", { method: "POST" });
        const data = await res.json();
        setMensaje(data.message);
      } catch (error) {
        console.error(error);
        setMensaje("Error al iniciar el sorteo");
      }
    };

    iniciar();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Iniciar Sorteo</h1>
        <p>{mensaje}</p>
      </div>
    </div>
  );
}

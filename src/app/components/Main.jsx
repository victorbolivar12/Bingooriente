"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Seleccionar-Carton/Components/Button";

const Main = () => {
  const [precio, setPrecio] = useState(null);

  useEffect(() => {
    const fetchPrecio = async () => {
      try {
        const res = await fetch("/api/configuracion");
        const data = await res.json();
        setPrecio(data.precio_carton);
      } catch (error) {
        console.error("Error al obtener el precio:", error);
      }
    };

    fetchPrecio();
  }, []);

  return (
    <section
      className="relative bg-cover bg-center h-[500px] flex items-center text-white px-6 md:px-16"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Capa de superposición oscura */}
      <div className="absolute inset-0 bg-[#D98019] opacity-50"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col md:flex-row items-center max-w-5xl mx-auto w-full">
        {/* Texto */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            JUEGA CON UN SOLO CARTÓN <span className="text-yellow-200">12 VECES!</span>
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Únete a nuestras partidas a las <strong>7:00 PM</strong> vía YouTube, con un costo de
            participación de{" "}
            <strong>{precio !== null ? `${precio} Bs.` : "..."}</strong> por cartón y la oportunidad de ganar un
            premio diario de <strong>500 USD</strong> a repartir.
          </p>

          {/* Botón principal */}
          <Link href="/Seleccionar-Carton">
            <button className="bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 border border-white text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition w-full cursor-pointer hover:animate-jump animate-ease-out">
              COMPRAR CARTÓN
            </button>
          </Link>
        </div>

        {/* Imagen de cartones (solo en pantallas grandes) */}
        <div className="hidden md:block ml-8">
          <Image src="/img-main.png" width={450} height={459} alt="Cartones Bingo" />
        </div>
      </div>

      {/* Sección "ÚNETE | JUEGA | GANA" */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <a
          href="https://chat.whatsapp.com/Lew8T4ogHYj9MUdlHSpiBU"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-red-800 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-t-lg uppercase tracking-wider w-90 cursor-pointer">
            ÚNETE | JUEGA | GANA
          </button>
        </a>
      </div>
    </section>
  );
};

export default Main;

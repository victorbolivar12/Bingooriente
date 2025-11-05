"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import WelcomeBingo from "./WelcomeBingo";

const Main = () => {
  const [precio, setPrecio] = useState(0);
  // const [loading, setLoading] = useState(true);
  // // const [titulo, setTitulo] = useState("");
  // const [descripcion, setDescripcion] = useState("");

  // useEffect(() => {
  //   const fetchPrecio = async () => {
  //     try {
  //       const res = await fetch("/api/configuracion");
  //       const data = await res.json();
  //       //setPrecio(data.precio_carton);
  //       setTitulo(data.titulo);
  //       setDescripcion(data.descripcion);
  //     } catch (error) {
  //       console.error("Error al obtener el precio:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPrecio();
  // }, []);



  // Mientras carga, mostramos el componente de bienvenida
  // if (loading) {
  //   return <WelcomeBingo />;
  // }

  return (
    <section
      className="relative bg-cover bg-center h-[500px] flex items-center text-white px-6 md:px-16"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Capa de superposición oscura */}
      <div className="absolute inset-0 bg-[#14821f] opacity-60"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col md:flex-row items-center max-w-5xl mx-auto w-full">
        {/* Texto */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {/* {titulo} <br /> */}
            GRAN SORTEO DE LA POLICIA NACIONAL DE COLOMBIA
          </h1>
          <p className="text-lg md:text-xl mb-6">
            {/* {descripcion} */}
            Únete a nuestras partida este 10 de noviembre a las 7:00 PM y participa por increíbles premios.
          </p>
          

          {/* Botón principal */}
          <Link href="/Seleccionar-Carton">
            <button className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 border border-white text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition cursor-pointer w-full">
              SELECCIONAR 2 CARTONES
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
          <button className="bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-t-lg uppercase tracking-wider w-90 cursor-pointer flex justify-center gap-5">
            <Image src="/whatssapp.png" width={20} height={20} alt="whatssapp" />
            ÚNETE | JUEGA | GANA
          </button>
        </a>
      </div>
    </section>
  );
};

export default Main;

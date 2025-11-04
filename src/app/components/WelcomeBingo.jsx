"use client";
import React from "react";

const WelcomeBingo = () => {
  return (
    <div className="bg-[#14821f] min-h-screen flex flex-col justify-center items-center p-6 sm:p-8 text-center">
      {/* Mensaje principal */}
      <h1 className="text-[#eaeaea] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
        Bienvenido a Bingoriente
      </h1>
      
      {/* Mensaje secundario grande */}
      <p className="text-white text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-12">
        ¡Que empiece la diversión!
      </p>

      {/* Mensaje de carga / advertencia */}
      <p className="text-white text-xs sm:text-sm md:text-base px-4 sm:px-6">
        Si tarda mucho en cargar, verifica la conexión a internet e intenta de nuevo.
      </p>
    </div>
  );
};

export default WelcomeBingo;

"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#8B0000] text-white text-center py-6">
      <div className="container mx-auto px-4">
        {/* Menú de navegación */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-4">
          <Link href="#" className="hover:underline">Inicio</Link>
          <Link href="#" className="hover:underline">Cartones</Link>
          <img src="/logo.png" alt="Bingoriente Logo" className="h-10" />
          <Link href="#" className="hover:underline">Testimonios</Link>
          <Link href="#" className="hover:underline">Contacto</Link>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-white w-3/4 mx-auto my-4"></div>

        {/* Iconos de redes sociales */}
        <div className="flex justify-center gap-6 text-2xl mb-4">
          <Link href="#"><i className="fab fa-instagram"></i></Link>
          <Link href="#"><i className="fab fa-facebook"></i></Link>
          <Link href="#"><i className="fab fa-whatsapp"></i></Link>
        </div>

        {/* Derechos reservados */}
        <p className="text-sm">© BINGOORIENTE, 2025. TODOS LOS DERECHOS RESERVADOS</p>
      </div>
    </footer>
  );
};

export default Footer;

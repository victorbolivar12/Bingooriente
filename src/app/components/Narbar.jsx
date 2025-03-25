"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="p-5 flex justify-between items-center shadow-lg lg:px-12">
            {/* Logo */}
            <Link href="/">
                <img src="LOGO.png" alt="Logo Bingoriente" className="w-40 lg:w-60 cursor-pointer" />
            </Link>

            {/* Botón hamburguesa en móvil */}
            <button
                className="md:hidden block text-gray-700 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="material-symbols-outlined text-3xl">
                    {isOpen
                        ? <span class="material-symbols-outlined text-white">close</span>
                        : <span class="material-symbols-outlined text-white">menu</span>
                    }
                </span>
            </button>

            {/* Menú de navegación */}
            <ul className={`md:flex md:gap-6 absolute bg-[#950F0F] z-40 md:static top-16 left-0 w-full md:w-auto md:bg-transparent shadow-md md:shadow-none p-5 md:p-0 transition-all ${isOpen ? "block" : "hidden"}`}>
                <li className="p-2.5 hover:bg-white hover:text-[#950F0F] rounded-xs hover:font-semibold cursor-pointer lg:hover:font-normal transition"><Link href="/Seleccionar-Carton">Comprar</Link></li>
                <li className="p-2.5 hover:bg-white hover:text-[#950F0F] rounded-xs hover:font-semibold cursor-pointer lg:hover:font-normal transition"><Link href="/Buscar-Carton">Cartones</Link></li>
                <li className="p-2.5 hover:bg-white hover:text-[#950F0F] rounded-xs hover:font-semibold cursor-pointer lg:hover:font-normal transition"><Link href="/Testimonios">Testimonios</Link></li>
                <li className="p-2.5 hover:bg-white hover:text-[#950F0F] rounded-xs hover:font-semibold cursor-pointer lg:hover:font-normal transition"><Link href="#">Contacto</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

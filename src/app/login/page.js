"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Narbar";
import Footer from "../components/Footer";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_SECRET; // Se obtiene en el cliente

export default function Login() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            document.cookie = `adminToken=${password}; path=/`;
            router.push("/admin/dashboard"); // Redirigir al área de administrador
        } else {
            setError("Contraseña incorrecta. Inténtalo de nuevo.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-[#950F0F]">
                <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
                    <h1 className="text-2xl font-semibold text-gray-700 mb-4">Iniciar Sesión</h1>

                    <input
                        type="password"
                        placeholder="Ingresa la contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                    />

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        onClick={handleLogin}
                        className="bg-[#950F0F] text-white px-6 py-2 rounded-lg hover:bg-red-700 cursor-pointer transition"
                    >
                        Acceder como Administrador
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

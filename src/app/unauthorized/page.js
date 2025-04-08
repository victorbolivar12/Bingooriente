import Link from "next/link";

export default function Unauthorized() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#950F0F]">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
                <p className="text-gray-700 mb-6">No tienes permisos para ver esta página.</p>
                <Link
                    href="/"
                    className="bg-[#950F0F] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}

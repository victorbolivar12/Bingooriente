"use client";
import { useState, useEffect } from "react";
import Modal from "./Components/Modal";
import Button from "./Components/Button";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading"; // Importa el componente Loading

export default function CartonesSelector() {
  const [selectedCarton, setSelectedCarton] = useState<number | null>(null);
  const [selectedCartones, setSelectedCartones] = useState<number[]>([]);
  const [cartones, setCartones] = useState([]);
  //const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Verificar que el precio es un número válido, parseado desde el archivo .env
  const PRECIO_POR_CARTON = parseFloat(process.env.NEXT_PUBLIC_PRECIO_POR_CARTON || "0");

  const fecha = new Date()
  const fechaActual = fecha.toLocaleDateString("es-MX",{ weekday:'long', day:'numeric', month:'long', year:'numeric' });

  const router = useRouter();

  useEffect(() => {
    const fetchCartones = async () => {
      try {
        const response = await fetch('api/cartones');
        if (!response.ok) {
          throw new Error('Error al recuperar los cartones');
        }

        // Obtener los datos de la respuesta
        const data = await response.json();

        // Establecer los datos en el estado
        setCartones(data.cartones);
      } catch (error) {
        //setError(error.message); // Establecer el mensaje de error en el estado
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    // Llamada a la función para obtener los cartones
    fetchCartones();
  }, []);

  const handleGoToPay = () => {
    router.push(
      `/Comprar-Carton?cartones=${JSON.stringify(selectedCartones)}&total=${total}`
    );
  };

  const handleOpenModal = (cartonId: number) => {
    setSelectedCarton(cartonId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectCarton = () => {
    if (selectedCarton !== null && !selectedCartones.includes(selectedCarton)) {
      setSelectedCartones([...selectedCartones, selectedCarton]);
    }
    setIsModalOpen(false);
  };

  // Calcular el total, validando que el precio sea un número válido
  const total = selectedCartones.length * PRECIO_POR_CARTON; // Calcular total

  return (
    <div className="p-4 sm:px-16 bg-[#950F0F] min-h-screen">
      <h2 className="text-center text-white text-2xl font-bold">SELECCIONA TUS CARTONES</h2>
      <p className="text-center text-white">Puedes seleccionar uno o varios cartones</p>
      <p>Fecha de sorteo: {fechaActual}</p>

      {/* Mostrar el componente Loading mientras los cartones se están cargando */}
      {loading ? (
        <Loading /> // Aquí se muestra el componente de carga
      ) : (
        <>
          {/* Muestra los cartones solo cuando se haya terminado de cargar */}
          <div className="grid grid-cols-5 md:grid-cols-15 gap-3 md:gap-5 mt-6">
            {cartones.map((carton) => (
              <button
                key={carton.id_carton}
                className={`w-16 h-16 bg-[#D98019] cursor-pointer text-white border border-white rounded-md font-bold ${selectedCartones.includes(carton.id_carton) ? "bg-green-500" : ""}`}
                onClick={() => handleOpenModal(carton.id_carton)}
              >
                {carton.id_carton}
              </button>
            ))}
          </div>

          {selectedCartones.length > 0 && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md">
              <Button
                className="w-full text-2xl font-semibold text-white py-3 px-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 focus:outline-none border-2 border-white cursor-pointer"
                onClick={handleGoToPay}
              >
                IR A PAGAR {selectedCartones.length} CARTONES ({total}bs)
              </Button>
            </div>
          )}


          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSelect={handleSelectCarton}
            cartonId={selectedCarton}
          />
        </>
      )}
    </div>
  );
}

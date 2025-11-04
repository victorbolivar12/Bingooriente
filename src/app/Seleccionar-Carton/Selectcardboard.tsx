"use client";
import { useState, useEffect } from "react";
import Modal from "./Components/Modal";
import Button from "./Components/Button";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

export default function CartonesSelector() {
  const [selectedCarton, setSelectedCarton] = useState<number | null>(null);
  const [selectedCartones, setSelectedCartones] = useState<number[]>([]);
  const [precioSorteo, setPrecioSorteo] = useState<number | null>(null);
  const [cartones, setCartones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fecha, setFecha] = useState(null);
  const [fechaFormateada, setFechaFormateada] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [precioCarton, setPrecioCarton] = useState<number | null>(null); // Precio desde la API
  const router = useRouter();

  useEffect(() => {
    if (fecha) {
      const [dia, mes, anio] = fecha.split("/");
      const fechaObj = new Date(anio, mes - 1, dia);

      const formateada = fechaObj.toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      setFechaFormateada(formateada);
    }
  }, [fecha]);

  useEffect(() => {
    const iniciarSorteo = async () => {
      try {
    
        const [cartonesRes, configRes] = await Promise.all([
          fetch("/api/cartones"),
          fetch("/api/configuracion"),
        ]);

        if (!cartonesRes.ok) throw new Error("Error al obtener cartones");
        if (!configRes.ok) throw new Error("Error al obtener configuración");

        const [cartonesData, configData] = await Promise.all([
          cartonesRes.json(),
          configRes.json(),
        ]);

        // 3. Guardar datos en el estado
        setCartones(cartonesData.cartones);
        setPrecioCarton(configData.precio_carton);
        setFecha(configData.Fecha);
        setPrecioSorteo(configData.monto_sorteo);

      } catch (error) {
        console.error("Error en la inicialización del sorteo:", error);
      } finally {
        setLoading(false);
      }
    };

    iniciarSorteo();
  }, []);


  const handleGoToPay = () => {
    const total = selectedCartones.length * (precioCarton ?? 0);
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
    if (selectedCarton === null) return;

    if (selectedCartones.includes(selectedCarton)) {
      // Si ya está seleccionado, lo quitamos
      setSelectedCartones(selectedCartones.filter(id => id !== selectedCarton));
    } else {
      // Si no está seleccionado, lo añadimos
      setSelectedCartones([...selectedCartones, selectedCarton]);
    }

    setIsModalOpen(false);
  };


  const total = selectedCartones.length * (precioCarton ?? 0);

  return (
    <div className="p-4 sm:px-16 bg-[#14821f] min-h-screen">
      <h2 className="text-center text-white text-2xl font-bold">SELECCIONA TUS CARTONES</h2>
      <p className="text-center text-white">Puedes seleccionar uno o varios cartones</p>
      {/* <p>Fecha de sorteo: {fechaFormateada}</p> */}

      {loading || precioCarton === null ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-5 md:grid-cols-15 gap-3 md:gap-5 mt-6">
            {cartones.map((carton) => (
              <button
                key={carton.id_carton}
                className={`w-16 h-16 bg-[#2d9348] cursor-pointer text-white border border-white rounded-md font-bold ${selectedCartones.includes(carton.id_carton) ? "bg-green-500" : ""
                  }`}
                onClick={() => handleOpenModal(carton.id_carton)}
              >
                {carton.id_carton}
              </button>
            ))}
          </div>

          {selectedCartones.length > 0 && selectedCartones.length < 3 && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md">
              <Button
                className="w-full text-2xl font-semibold text-white py-3 px-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 focus:outline-none border-2 border-white cursor-pointer"
                onClick={handleGoToPay}
              >
                SELECCIONAR {selectedCartones.length} CARTONES
              </Button>
            </div>
          )}

          {/* {selectedCartones.length >= 3 && (
            <div className="fixed w-84 sm:w-94 top-4 left-1/2 transform -translate-x-1/2 bg-yellow-600 border-2 border-white text-white px-4 py-2 rounded shadow-lg z-50 font-light animate-fade-up">
              <span className="font-bold">
                SI CONFIRMAS TU COMPRA ESTAS PARTICIPANDO EN UN SORTEO DE {precioSorteo}Bs
              </span>
              <br />
            </div>
          )} */}

           {selectedCartones.length > 2 && (
                <div className="fixed sm:w-84 bottom-4 right-4 bg-green-600 border-2 border-white text-white px-4 py-2 rounded shadow-lg z-50 font-light animate-fade-up">
                    <span className="font-bold">Solo puedes seleccionar 2 cartones</span> <br />
                    debes quitar uno para continuar
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

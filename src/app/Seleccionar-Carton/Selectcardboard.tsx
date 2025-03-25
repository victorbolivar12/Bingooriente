"use client";
import { useState } from "react";
import Modal from "./Components/Modal";
import Button from "./Components/Button";
import { useRouter } from "next/navigation";

const cartones = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  price: 50, // Precio de cada cartón
}));

export default function CartonesSelector() {
  const [selectedCarton, setSelectedCarton] = useState<number | null>(null);
  const [selectedCartones, setSelectedCartones] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();


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

  const total = selectedCartones.length * 50; // Calcular total

  console.log(setSelectedCartones)

  return (
    <div className="p-4 sm:px-16 bg-[#950F0F] min-h-screen">
      <h2 className="text-center text-white text-2xl font-bold">SELECCIONA TUS CARTONES</h2>
      <p className="text-center text-white">Puedes seleccionar uno o varios cartones</p>

      <div className="grid grid-cols-5 md:grid-cols-18 gap-5 mt-6">
        {cartones.map((carton) => (
          <button
            key={carton.id}
            className={`w-16 h-16 bg-[#D98019] cursor-pointer text-white border border-white rounded-md font-bold ${selectedCartones.includes(carton.id) ? "bg-green-500" : ""}`}
            onClick={() => handleOpenModal(carton.id)}
          >
            {carton.id}
          </button>
        ))}
      </div>

      {selectedCartones.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-red-600 text-white text-center p-4 rounded-xl shadow-lg">
          <Button className="w-full text-2xl" onClick={handleGoToPay}>
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
    </div>
  );
}

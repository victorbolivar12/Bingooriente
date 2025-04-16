"use client";
import { useEffect } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: () => void;
  cartonId: number | null;
}

export default function Modal({ isOpen, onClose, onSelect, cartonId }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const imagePath = cartonId
    ? `/CARTONES_JPG_1200/SERIAL_1200_CARTON_${String(cartonId).padStart(5, "0")}.jpg`
    : "/placeholder.jpg"; // Imagen por defecto si cartonId es null

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-up animate-duration-500">
      <div className="bg-white p-6 rounded-lg w-96 h-auto text-center shadow-lg">
        <h2 className="text-lg font-bold text-black">Detalles del Cartón</h2>
        <p className="mt-2 text-black">ID del Cartón: {cartonId < 10 ? "0000" : "000"}{cartonId}</p>
        <div className="mt-4 w-full h-96 relative">
          <Image
            src={imagePath}
            alt="Cartón"
            width={384}
            height={384}
            className="rounded-md"
            unoptimized
          />
        </div>
        <div className="flex justify-between mt-14">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-pointer">Cerrar</button>
          <button onClick={onSelect} className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer">Seleccionar</button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect } from "react";

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

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 text-center shadow-lg">
        <h2 className="text-lg font-bold text-black">Detalles del Cartón</h2>
        <p className="mt-2 text-black">ID del Cartón: {cartonId}</p>
        <img src="/carton-image.png" alt="Cartón" className="mt-4 w-full h-32 object-cover" />
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-pointer">Cerrar</button>
          <button onClick={onSelect} className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer">Seleccionar</button>
        </div>
      </div>
    </div>
  );
}

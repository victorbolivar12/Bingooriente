// components/Loading.js
import Image from 'next/image';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-82 bg-[#14821f]">
      <div className="text-center">
        {/* Imagen de carga */}
        <Image 
          src="/logoPolicia.png" 
          alt="Logo de carga"
          width={300} 
          height={300} 
          className="mx-auto w-40 mb-4 animate-pulse"
        />
        {/* Texto de carga */}
        <p className="text-xl font-semibold text-white">Cargando...</p>
      </div>
    </div>
  );
};

export default Loading;

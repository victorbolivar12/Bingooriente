"use client";

import Image from "next/image";

const HowToPlay = () => {


  return (
    <section className="bg-[#D98019] text-white py-12 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">

        <div className="flex justify-center w-full gap-10">
          <video
            controls
            preload="none"
            className="h-[640px] w-[350px] mb-8"
            poster="/poster1.jpg"
          >
            <source src="/VideoInstrucciones.mp4" type="video/mp4" />
            <track
              src="/VideoInstrucciones.mp4"
              kind="subtitles"
              srcLang="es"
              label="Spanish"
            />
            Su navegador no soporta la etiqueta de vídeo.
          </video>

          <video
            controls
            preload="none"
            className="h-[640px] w-[350px] hidden sm:block"
            poster="/poster2.jpg"

          >
            <source src="/publicidad.mp4" type="video/mp4" />
            <track
              src="/publicidad.mp4"
              kind="subtitles"
              srcLang="es"
              label="Spanish"
            />
            Su navegador no soporta la etiqueta de vídeo.
          </video>
        </div>


        {/* Título */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿CÓMO SE JUEGA?</h2>

        <p className="text-lg md:text-xl mb-8 mt-8">
          Aquí te explicamos todos los pasos que debes seguir para unirte al juego
        </p>

        {/* Contenedor de los pasos */}
        <div className="grid md:grid-cols-2 gap-6 text-left">
          {/* Paso 1 */}
          <div className="flex items-center gap-4">
            <Image src="/carton.png" width={50} height={50} alt="Cartón" />
            <div>
              <h3 className="font-bold text-xl">Paso 1:</h3>
              <p>Selecciona el cartón de tu preferencia</p>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="flex items-center gap-4">
            <Image src="/payment.png" width={50} height={50} alt="Pago" />
            <div>
              <h3 className="font-bold text-xl">Paso 2:</h3>
              <p>Paga el cartón a través de un pago móvil</p>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="flex items-center gap-4">
            <Image src="/download.png" width={50} height={50} alt="Descargar" />
            <div>
              <h3 className="font-bold text-xl">Paso 3:</h3>
              <p>Descarga tu cartón para que disfrutes de la emoción</p>
            </div>
          </div>

          {/* Paso 4 */}
          <div className="flex items-center gap-4">
            <Image src="/youtube.png" width={50} height={50} alt="YouTube" />
            <div>
              <h3 className="font-bold text-xl">Paso 4:</h3>
              <p>Bingo en vivo vía YouTube – Todos los días a las 7:00 PM (Hora local)</p>
            </div>
          </div>

          {/* Paso 5 */}
          <div className="flex items-center gap-4">
            <Image src="/auto.png" width={50} height={50} alt="Automático" />
            <div>
              <h3 className="font-bold text-xl">Paso 5:</h3>
              <p>
                El bingo es automático, por lo que no es necesario cantar bingo, tu cartón sigue
                participando aunque no estés en la transmisión
              </p>
            </div>
          </div>
        </div>

        {/* Nota final */}
        <p className="text-sm mt-8 italic">
          Todos los pagos se realizan el mismo día o a más tardar la mañana siguiente a través de un
          pago móvil. Nos comunicamos con usted a través del número de teléfono que dejó al realizar su
          compra.
        </p>
      </div>

      {/* Imagen de cartones (solo en pantallas grandes) */}
      <div className="hidden md:block absolute top-0 right-0">
        <Image src="/decorate1.png" width={250} height={250} alt="Bingo" />
      </div>

      {/* Imagen de cartones (solo en pantallas grandes) */}
      <div className="hidden md:block absolute top-0 left-0">
        <Image src="/decorate2.png" width={250} height={250} alt="Bolas de bingo" />
      </div>
    </section>
  );
};

export default HowToPlay;

import React from 'react'
import Image from "next/image";

const News = () => {
    return (
        <section className="flex flex-col justify-center items-center md:my-0 bg-[#14821f] relative">
            <h1 className='text-3xl md:text-4xl font-bold mb-4 mt-5'>LO MAS NUEVO</h1>

            <div className="relative w-full md:w-[60%] h-64">
                <Image
                    src="/Banner.png"
                    alt="Cartones Bingo"
                    fill
                    className="object-cover md:object-contain rounded shadow-lg p-4"
                />
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
    )
}

export default News
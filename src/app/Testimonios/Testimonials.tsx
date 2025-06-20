import React from "react";

// const testimonials = [
//     {
//         name: "Darivel Gonzales",
//         videoUrl: "https://www.youtube.com/watch?v=rNoLWFpEuyg",
//     },
//     {
//         name: "Carlos Pérez",
//         videoUrl: "https://www.youtube.com/embed/example2",
//     },
//     {
//         name: "María López",
//         videoUrl: "https://www.youtube.com/embed/example3",
//     },
//     {
//         name: "Ana Fernández",
//         videoUrl: "https://www.youtube.com/embed/example4",
//     },
//     {
//         name: "Luis Martínez",
//         videoUrl: "https://www.youtube.com/embed/example5",
//     },
//     {
//         name: "Sofía Rodríguez",
//         videoUrl: "https://www.youtube.com/embed/example6",
//     },
//     {
//         name: "Diego Sánchez",
//         videoUrl: "https://www.youtube.com/embed/example7",
//     },
//     {
//         name: "Lucía Gómez",
//         videoUrl: "https://www.youtube.com/embed/example8",
//     },
//     {
//         name: "Jorge Díaz",
//         videoUrl: "https://www.youtube.com/embed/example9",
//     },
// ];

const Testimonials = () => {
    return (
        <>
            <div className="w-full flex justify-center items-center my-8">
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

        </>
        // <div className="bg-[#950F0F] p-8">
        //     <h1 className="text-white text-center text-3xl font-bold mb-3">TESTIMONIOS</h1>
        //     <p className="text-white text-center mb-10">Conoce a las personas que han tenido la oportunidad de ganar con nosotros</p>
        //     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        //         {testimonials.map((testimonial, index) => (
        //             <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
        //                 <div className="aspect-w-16 aspect-h-9">
        //                     <iframe
        //                         className="w-full h-full"
        //                         src={testimonial.videoUrl}
        //                         title={testimonial.name}
        //                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        //                         allowFullScreen
        //                     ></iframe>
        //                 </div>
        //                 <div className="p-4">
        //                     <h2 className="text-center text-lg font-semibold text-[#950F0F]">{testimonial.name}</h2>
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    );
};

export default Testimonials;

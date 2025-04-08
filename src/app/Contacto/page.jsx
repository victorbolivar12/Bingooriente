"use client"
import React from 'react';
import Image from 'next/image';
import Navbar from "../components/Narbar";
import Footer from "../components/Footer";

const ContactPage = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#950F0F] p-6">
                <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Contacto</h2>

                    <div className="flex items-center justify-center gap-3 text-gray-600 mb-3">
                        <Image src="/icons/gmail.png" alt="Email" width={20} height={20} />
                        <span>bingoriente@gmail.com</span>
                    </div>

                    <div className="flex items-center justify-center gap-3 text-gray-600 mb-3">
                        <Image src="/icons/phone.png" alt="Teléfono" width={20} height={20} />
                        <span>0424-9368605</span>
                    </div>

                    <div className="flex items-center justify-center gap-3 text-gray-600 mb-5">
                        <Image src="/icons/direccion.png" alt="Dirección" width={20} height={20} />
                        <span>Dirección, Calle 5, ciudad Bolivar, Venezuela, 8050</span>
                    </div>

                    <div className="flex justify-center gap-6 mt-4">
                        <a href="https://facebook.com/bingOriente" target="_blank" rel="noopener noreferrer">
                            <Image src="/icons/facebook.png" alt="Facebook" width={24} height={24} className="hover:scale-110 transition-transform" />
                        </a>
                        <a href="https://www.instagram.com/bingoriente/?hl=es" target="_blank" rel="noopener noreferrer">
                            <Image src="/icons/instagram.png" alt="Instagram" width={24} height={24} className="hover:scale-110 transition-transform" />
                        </a>
                        <a href="https://youtube.com/@BingOriente" target="_blank" rel="noopener noreferrer">
                            <Image src="/icons/youtube.png" alt="YouTube" width={24} height={24} className="hover:scale-110 transition-transform" />
                        </a>
                        <p className='text-gray-600'>@bingOriente</p>
                    </div>

                    <div className="mt-6">
                        <a href="https://chat.whatsapp.com/Lew8T4ogHYj9MUdlHSpiBU" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition cursor-pointer">
                            Unirse al grupo de WhatsApp
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactPage;
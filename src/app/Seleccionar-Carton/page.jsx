import React from 'react'
import Navbar from "../components/Narbar"
import Footer from "../components/Footer"
import CartonesSelector from "./Selectcardboard"

const page = () => {
    return (
        <>
            <Navbar />
            <CartonesSelector />
            <Footer />
        </>
    )
}

export default page
import React from 'react'
import Navbar from "../components/Narbar"
import Footer from "../components/Footer"
import BingoPaymentForm from './BingoPaymentFom'

const page = () => {
    return (
        <>
            <Navbar />
            <BingoPaymentForm />
            <Footer />
        </>
    )
}

export default page
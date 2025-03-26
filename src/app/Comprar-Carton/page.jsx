"use client";
import React from 'react'
import Navbar from "../components/Narbar"
import Footer from "../components/Footer"
import BingoPaymentForm from './BingoPaymentFom'
import { Suspense } from "react";

const page = () => {
    return (
        <Suspense>
            <Navbar />
            <BingoPaymentForm />
            <Footer />
        </Suspense>
    )
}

export default page
import React from 'react'
import Navbar from "../components/Narbar"
import Footer from "../components/Footer"
import SearchCartons from './SearchCartons'

const page = () => {
  return (
    <>
      <Navbar />
      <SearchCartons />
      <Footer />
    </>
  )
}

export default page
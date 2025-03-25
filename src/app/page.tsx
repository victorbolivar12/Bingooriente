import Image from "next/image";
import Navbar from "./components/Narbar"
import Main from "./components/Main"
import Footer from "./components/Footer"
import HowToPlay from "./components/HowToPlay"

export default function Home() {
  return (
    <div className="min-h-[100dvh]">
      <Navbar/>
      <Main/>
      <HowToPlay/>
      <Footer/>
    </div>
  );
}

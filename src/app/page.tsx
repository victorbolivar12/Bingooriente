import Navbar from "./components/Narbar"
import Main from "./components/Main"
import Footer from "./components/Footer"
import HowToPlay from "./components/HowToPlay"
import News from "./components/News"
import Button from "./Seleccionar-Carton/Components/Button"

export default function Home() {
  return (
    <div className="min-h-[100dvh]">
      <Navbar />
      <Main />
      <News/>
      <HowToPlay />
      <Footer />
    </div>
  );
}

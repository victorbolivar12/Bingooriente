import Navbar from "./components/Narbar"
import Main from "./components/Main"
import Footer from "./components/Footer"
import HowToPlay from "./components/HowToPlay"
import PrizeList from "./components/PrizeList"

export default function Home() {
  return (
    <div className="min-h-[100dvh]">
      <Navbar />
      <Main />
      <PrizeList />
      <HowToPlay />
      <Footer />
    </div>
  );
}

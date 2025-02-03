import Flashcards from "./components/Flashcards";
import Hero from "./components/Hero";
import { LogoTicker } from "./components/LogoTicker";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Services from "./components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoTicker />
      <Flashcards />
      <Pricing />
      <Services />
    </>
  );
}

import Flashcards from "./components/Flashcards";
import Hero from "./components/Hero";
import { LogoTicker } from "./components/LogoTicker";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Stats from "./components/Stats";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoTicker />
      <Flashcards />
      <Stats />
      <Services />
    </>
  );
}

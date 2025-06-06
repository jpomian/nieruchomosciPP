import Carousel from "./components/Carousel";
import Flashcards from "./components/Flashcards";
import Hero from "./components/Hero";
import { LogoTicker } from "./components/LogoTicker";
import { MatomoTracker } from "./components/MatomoTracker";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";

export default function Home() {
  return (
    <>
      <MatomoTracker />
      <Navbar />
      <Hero />
      <Flashcards />
      <Pricing />
      <LogoTicker />
      <Carousel />
    </>
  );
}

import Flashcards from "./components/Flashcards";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Flashcards />
      <Services />
    </>
  );
}

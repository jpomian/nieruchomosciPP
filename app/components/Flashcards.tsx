"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Flashcard from "./ui/Flashcard"

type CardType = {
  question: string
  answers: string[]
  type: "W" | "P"
}

export default function Flashcards() {
  const [filter, setFilter] = useState<"W" | "P" | null>(null)
  const [direction, setDirection] = useState<1 | -1>(1)

  const cards: CardType[] = [
    {
      question: "Dla jakich celów przygotowuję operaty szacunkowe?",
      answers: [
        "dla potrzeb zabezpieczenia wierzytelności",
        "dla potrzeb podatkowych i skarbowych",
        "dla potrzeb podziału majątku",
        "dla potrzeb wniesienia nieruchomości jako aport do spółki",
        "dla potrzeb ubezpieczenia nieruchomości",
      ],
      type: "W",
    },
    {
      question: "Na jakich warunkach działam?",
      answers: ["Działam na umowach na wyłączność."],
      type: "P",
    },
    {
      question: "Jakie nieruchomości wyceniam?",
      answers: [
        "Lokale mieszkalne",
        "Domy jednorodzinne",
        "Działki niezabudowane",
        "Nieruchomości komercyjne",
        "Spółdzielcze własnościowe prawa do lokali",
      ],
      type: "W",
    },
    {
      question: "W jakich nieruchomościach się specjalizuję?",
      answers: [
        "Specjalizuję się w sprzedaży mieszkań, w szczególności z północy Poznania (Piątkowo, Naramowice, Winogrady).",
      ],
      type: "P",
    },
    {
      question: "Jaki jest koszt wyceny?",
      answers: ["Zjedź niżej w celu zobaczenia cennika 😏."],
      type: "W",
    },
    {
      question: "Jakie są koszta pośrednictwa?",
      answers: [
        "Od 1,5% wartości nieruchomości.",
      ],
      type: "P",
    },
    {
      question: "W obrębie jakiego obszaru dokonuje wycen?",
      answers: ["Głównie woj. Wielkopolskie, pozostałe lokalizacje ustalane indywidualnie."],
      type: "W",
    },
    {
      question: "Co obejmuje umowa pośrednictwa?",
      answers: [
        "Obejmuje wycenę nieruchomości",
        "Obejmuje sesję fotograficzną",
        "Obejmuje publikacje oferty nieruchomości na portalach ogłoszeniowych",
        "Obejmuje prezentację nieruchomości",
        "Obejmuje przygotowanie dokumentacji",
      ],
      type: "P",
    },
    
  ]

  const filteredCards = filter ? cards.filter((card) => card.type === filter) : cards

  const handleFilter = (newFilter: "W" | "P") => {
    setDirection(newFilter === "W" ? 1 : -1)
    setFilter(newFilter)
  }

  return (
    <div id="faq" className="pb-12">
      <div className="flex flex-col justify-center items-center">
        <h1 className="flex justify-center text-3xl font-bold text-center pt-12 pb-2 px-6">
          Najczęściej zadawane pytania
        </h1>
        <h3 className="text-sm text-gray-400 mb-6">Zadawane przez naszych klientów.</h3>

        <div className="flex justify-center items-center mb-8">
          <p className="text-md text-gray-500">Pytania są skierowane od klientów potrzebujących pomocy <span className="highlight hover:text-sky-400 duration-300 cursor-pointer" onClick={() => handleFilter("W")}>rzeczoznawcy</span> lub <span className="font-bold text-green-500 hover:text-green-300 duration-300 cursor-pointer" onClick={() => handleFilter("P")}>pośrednika nieruchomości</span>.</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-12 max-w-[1000px] mx-auto">
        <AnimatePresence initial={false}>
          {filteredCards.map((card) => (
            <motion.div
              key={card.question}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.3 }}
            >
              <Flashcard question={card.question} answers={card.answers} type={card.type} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes sparkle {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .sparkle {
          background-image: linear-gradient(
            90deg,
            rgba(255,255,255,1) 0%,
            rgba(255,255,255,1) 45%,
            rgba(173,216,230,1) 50%,
            rgba(255,255,255,1) 55%,
            rgba(255,255,255,1) 100%
          );
          background-size: 200% 100%;
          animation: sparkle 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}

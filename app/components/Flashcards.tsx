'use client'

import React, { useState } from 'react'

interface FlashcardProps {
  question: string
  answer: string
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <div
      className={`w-72 h-40 m-4 cursor-pointer transition-all duration-300 flex items-center justify-center p-4 text-center rounded-lg shadow-md ${
        isRevealed ? 'bg-white sparkle' : 'bg-blue-400 hover:bg-blue-600'
      }`}
      onClick={() => setIsRevealed(!isRevealed)}
    >
      <p className="text-lg font-medium">
        {isRevealed ? answer : question}
      </p>
    </div>
  )
}

export default function Flashcards() {
  const cards = [
    { question: "Dla kogo wykonuje zlecenia?", answer: "Dla każdego!" },
    { question: "Ile kosztuje pełna wycena?", answer: "Cena za przeprowadzenie wyceny jest z reguły indywidualna. Skontaktuj się ze mną aby dowiedzieć się więcej." },
    { question: "Jak długo czeka się na przeprowadzenie wyceny?", answer: "W zależności od wielkości nieruchomości i warunków rynkowych. Z reguły około 2 tygodnie." },
  ]

  return (
    <>
    <h1 className='flex justify-center text-3xl font-bold text-center py-4'>Najczęściej zadawane pytania</h1>
    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
      {cards.map((card, index) => (
        <Flashcard key={index} question={card.question} answer={card.answer} />
      ))}
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
    </>
  )
}


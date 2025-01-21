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
        isRevealed ? 'bg-white' : 'bg-blue-400 hover:bg-blue-600'
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
  return (
    <>
      <h1 className='flex justify-center text-3xl font-bold text-center py-4'>Najczęściej zadawane pytania</h1>
      <div className='grid gap-8 items-center'>
      </div>
    </>
  )
}


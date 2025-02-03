"use client"

import type React from "react"
import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FlashcardProps {
  question: string
  answers: string[]
  type: "W" | "P"
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answers, type }) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    if (isRevealed && currentAnswerIndex < answers.length - 1) {
      setCurrentAnswerIndex(currentAnswerIndex + 1)
    }
  }

  const handlePrev = () => {
    if (isRevealed && currentAnswerIndex > 0) {
      setCurrentAnswerIndex(currentAnswerIndex - 1)
    }
  }

  const getCardColor = () => {
    if (isRevealed) return "bg-white"
    return type === "W" ? "bg-blue-400 hover:bg-blue-600" : "bg-green-400 hover:bg-green-600"
  }

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const cardWidth = cardRef.current?.offsetWidth || 0
    const clickX = e.nativeEvent.offsetX

    if (answers.length > 1 && isRevealed) {
      if (clickX < cardWidth * 0.25) {
        handlePrev()
      } else if (clickX > cardWidth * 0.75) {
        handleNext()
      } else {
        setIsRevealed(!isRevealed)
      }
    } else {
      setIsRevealed(!isRevealed)
    }
  }

  return (
    <div className="relative w-96 h-40">
      <div
        ref={cardRef}
        className={`w-full h-full cursor-pointer transition-all duration-300 flex flex-col items-center justify-center p-4 text-center rounded-lg shadow-md ${getCardColor()} ${
          isRevealed ? "sparkle" : ""
        }`}
        onClick={handleCardClick}
      >
        <p className={`text-lg ${isRevealed ? "font-medium" : "font-semibold text-white/95"}`}>
          {isRevealed ? answers[currentAnswerIndex] : question}
        </p>
        {isRevealed && answers.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {answers.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentAnswerIndex ? "bg-blue-500" : "bg-gray-300"}`}
              />
            ))}
          </div>
        )}
      </div>
      {isRevealed && answers.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            disabled={currentAnswerIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            disabled={currentAnswerIndex === answers.length - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  )
}

export default Flashcard


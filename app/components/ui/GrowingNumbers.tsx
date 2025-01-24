'use client';

import type React from "react"
import { useState, useEffect } from "react"

interface GrowingNumberProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
}

export const GrowingNumber: React.FC<GrowingNumberProps> = ({ end, duration = 4000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)
      const currentCount = Math.floor(end * percentage)

      setCount(currentCount)

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span className="text-4xl font-bold text-primary">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}


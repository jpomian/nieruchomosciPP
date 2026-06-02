"use client"

import { useState, useEffect } from "react"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 mx-auto max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="relative overflow-hidden rounded-xl border border-emerald-200 bg-white/90 p-5 shadow-lg">
        {/* Cookie silhouette - clipped within the box */}
        <svg
          className="pointer-events-none absolute -top-6 -right-6 h-28 w-28 opacity-60"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rough-edged cookie silhouette with bite taken out */}
          <path
            d="M50 8c-2 0-3.5 1.2-5 2.5-1.8 1.5-3.2 1-5.5 0.5-2.5-0.5-4.5 0.8-6.5 2.5-1.8 1.5-4 2-6.2 1.5-2.5-0.5-4.8 1-6.5 3-1.5 1.8-3.5 3-5.8 3.2-2.5 0.2-4.2 2-5 4.2-0.8 2-2 3.8-4 5-2.2 1.2-3 3.5-2.8 6 0.2 2.2-0.5 4.2-1.8 6-1.5 2-1.5 4.5-0.5 6.8 1 2 1 4.2 0.2 6.2-1 2.2-0.2 4.8 1.5 6.5 1.5 1.5 2.2 3.5 2 5.8-0.2 2.5 1 4.8 3 6.2 1.8 1.2 3 3 3.5 5.2 0.5 2.5 2.2 4.2 4.5 5 2 0.8 3.8 2.2 5 4 1.2 2 3.5 3 5.8 2.8 2.2-0.2 4.2 0.5 6 1.8 2 1.5 4.5 1.5 6.5 0.2 1.8-1.2 4-1.5 6-0.8 2.5 0.8 5-0.2 6.8-2 1.5-1.5 3.5-2.5 5.5-2.5 2.5 0 4.5-1.5 5.5-3.8 1-2 2.5-3.5 4.5-4.5 2-1 3.2-3.2 3-5.5-0.2-2.2 0.5-4.2 2-5.8 1.5-1.8 1.8-4.2 1-6.5-0.8-2-0.5-4.2 0.5-6 1.2-2 1-4.5-0.5-6.2-1.2-1.5-1.8-3.5-1.5-5.5 0-1.2 0-2.2-0.2-3.2-1.8 0.8-3.8 1.2-6 1.2-7.5 0-13.5-6-13.5-13.5 0-2.2 0.5-4.2 1.4-6-1.2-0.2-2.2-0.2-3.4-0.2-2-0.2-4-1-5.5-2.5-1.5-1.5-3.5-2-5.5-1.8z"
            className="fill-transparent stroke-emerald-200"
            strokeWidth="2"
          />
          {/* Chocolate chips as outlined circles */}
          <circle cx="30" cy="45" r="5" className="fill-emerald-100 stroke-emerald-300" strokeWidth="1.5" />
          <circle cx="45" cy="65" r="4" className="fill-emerald-100 stroke-emerald-300" strokeWidth="1.5" />
          <circle cx="25" cy="70" r="3.5" className="fill-emerald-100 stroke-emerald-300" strokeWidth="1.5" />
          <circle cx="55" cy="50" r="4.5" className="fill-emerald-100 stroke-emerald-300" strokeWidth="1.5" />
          <circle cx="38" cy="35" r="3" className="fill-emerald-100 stroke-emerald-300" strokeWidth="1.5" />
          <circle cx="60" cy="75" r="3" className="fill-emerald-100 stroke-emerald-300" strokeWidth="1.5" />
        </svg>
        <div className="relative z-10 flex flex-col gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-emerald-900">Polityka cookies</h3>
            <p className="text-sm leading-relaxed text-emerald-700">
              Korzystając ze strony wyrażasz zgodę na używanie cookies zgodnie z aktualnymi ustawieniami przeglądarki.
              Czy zgadzasz się na dodatkowe pliki cookies?
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Tak, akceptuję
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 rounded-lg border border-emerald-300 bg-white px-4 py-2.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Nie, odmawiam
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

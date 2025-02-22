"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddOfferForm() {
  const [url, setUrl] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newOffer = {
      url,
      date: new Date().toISOString(),
    }

    try {
      const response = await fetch("/api/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOffer),
      })

      if (response.ok) {
        alert("Dodano nową nieruchomość.")
        router.push("/")
        router.refresh()
      } else {
        alert("Błąd serwera.")
        console.error("Failed to add URL")
      }
    } catch (error) {
      console.error("Error adding URL:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          URL
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Dodaj
      </button>
    </form>
  )
}


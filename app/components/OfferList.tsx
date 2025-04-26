"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

interface Offer {
  id: string
  url: string
}

interface OfferListProps {
  initialOffers: Offer[]
}

export default function OfferList({ initialOffers }: OfferListProps) {
  const [reactOffers, setReactOffers] = useState(initialOffers)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/offers");
        if (!response.ok) throw new Error("Failed to fetch offers");
        const offers = await response.json();

        const offerIDs = offers.map(async (offer: Offer) => {
          return {
            id: offer.id,
            url: offer.url
          }
        })

        const offerData = await Promise.all(offerIDs)
        setReactOffers(offerData)
      } catch {
        console.log('Error occured when fetching offer data.')
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/offers?id=${id}`, { method: "DELETE" })
      if (response.ok) {
        alert("Usunięto nieruchomość.")
        setReactOffers(reactOffers.filter((offer) => offer.id !== id))
      } else {
        alert("Błąd serwera.")
        console.error("Failed to delete offer")
      }
    } catch (error) {
      console.error("Error deleting offer:", error)
    }
  }

  return (
    <div>
      {reactOffers.map((offer) => (
        <div key={offer.id} className="flex items-center justify-between mb-2">
          <Link href={`/nieruchomosc/${offer.id}`}>
            <span>{offer.url}</span>
          </Link>
          <button
            onClick={() => handleDelete(offer.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            Usuń
          </button>
        </div>
      ))}
    </div>
  )
}


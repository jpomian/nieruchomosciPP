import React from 'react'
import { Card } from "@/app/components/ui/card"
import Link from "next/link"
import { Instagram } from "lucide-react"


function ActionCall() {
  return (
        <Card className="my-6 p-6 bg-gray-100 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Dziękujemy!</h2>
        <p className="mb-4">
          Jeśli masz jakiekolwiek pytania lub potrzebujesz dodatkowych
          informacji, prosimy o kontakt za pomocą tego formularza. Udzielam bezpłatnych <span className="highlight">45 minutowych konsultacji</span> przed przeprowadzeniem wyceny.
        </p>
        <p className="mb-2">
          Zapraszamy także do obserwowania naszych social media.
        </p>
        <div className="flex flex-col sm:flex-row gap-8 mt-12">
            <Link
              href="https://www.instagram.com/nieruchomosci_pod_parasolem/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 text-sm font-medium text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Nieruchomości pod Parasolem
            </Link>
          </div>
      </Card>
  )
}

export default ActionCall
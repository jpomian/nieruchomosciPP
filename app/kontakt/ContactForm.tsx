"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Label } from "@/app/components/ui/label"
import { Card } from "@/app/components/ui/card"

import Link from "next/link"
import { Instagram } from "lucide-react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [feedback, setFeedback] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!phone && !email) {
      setError("Proszę podać numer telefonu lub e-mail, abym mogła się z Tobą skontakować!")
      return
    }

    if (!feedback) {
      setError("Napisz proszę w jakiej sprawie się zgłaszasz.")
      return
    }

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, email, feedback }),
    })

    if (response.ok) {
      router.push("/kontakt")
    } else {
      setError("Nie można było wysłać zgłoszenia. Napisz wiadomość bezpośrednio do: elzbieta.pomianowska@wp.pl.")
    }
  }

  return (
    <div className="flex justify-between space-x-12 max-w-4xl mx-auto">
      <form id="formularz" onSubmit={handleSubmit} className="space-y-6 w-1/2">
        <div>
          <Label htmlFor="name">Imię</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Twoje imię" />
        </div>
        <div>
          <Label htmlFor="Telefon">Telefon</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Twój numer telefonu"
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Twój adres e-mail"
          />
        </div>
        <div>
          <Label htmlFor="feedback">Wiadomość</Label>
          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Treść Twojej wiadomości 🏘"
            rows={5}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center items-center">
          <Button className="bg-[#028965] hover:bg-green-600/50 transition duration-300 border border-solid border-amber-400" type="submit">
            Wyślij wiadomość
          </Button>
        </div>
      </form>

      <Card className="w-2/3 p-6 bg-gray-100 flex flex-col items-center">
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
    </div>
  )
}


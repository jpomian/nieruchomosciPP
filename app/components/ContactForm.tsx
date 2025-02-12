"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Label } from "@/app/components/ui/label"

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Imię</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Twoje imię" />
      </div>
      <div>
        <Label htmlFor="Telefon">Phone</Label>
        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Twój numer telefonu" />
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
      <Button className="bg-blue-500" type="submit">Wyślij wiadomość</Button>
    </form>
  )
}


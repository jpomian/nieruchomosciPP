'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createFeedback } from '../../lib/create'


interface FeedbackForm {
  name: string
  phone: string
  email: string
  content: string
}

export default function Form() {
  const [formData, setFormData] = useState<FeedbackForm>({
    name: "",
    phone: "",
    email: "",
    content: ""
  })
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.phone && !formData.email) {
      setError("Proszę podać numer telefonu lub e-mail, abym mogła się z Tobą skontakować!")
      return
    }

    if (!formData.content) {
      setError("Napisz proszę w jakiej sprawie się zgłaszasz.")
      return
    }

    try {
      const response = await createFeedback(formData)

      if (!response?.error) {
        router.push("/kontakt")
      } else {
        throw new Error("Request failed")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">Imię i nazwisko</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block mb-1">Telefon</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="content" className="block mb-1">Wiadomość</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 border rounded min-h-[120px]"
          required
        />
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Wyślij
      </button>
    </form>
  )
}
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "@/app/components/ui/input"

interface Feedback {
  id: string
  name: string
}

export default function FeedbackList({ feedbacks }: { feedbacks: Feedback[] }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    if (response.ok) {
      setIsAuthenticated(true)
    } else {
      alert("Incorrect password")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-8 rounded shadow-md">
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <ul className="space-y-4">
      {feedbacks.map((feedback) => (
        <li key={feedback.id} className="border p-4 rounded">
          <Link href={`/panel/opinie/${feedback.id}`} className="text-blue-500 hover:underline">
            {feedback.name || "Anonymous"} - {new Date(Number.parseInt(feedback.id)).toLocaleString()}
          </Link>
        </li>
      ))}
    </ul>
  )
}


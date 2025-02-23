import fs from "fs/promises"
import path from "path"
import { notFound } from "next/navigation"

interface Feedback {
  id: string
  name: string
  phone?: string
  email?: string
  feedback: string
}


async function getFeedbackById(id: string) {
  const filePath = path.join(process.cwd(), "data", "feedback.json")
  try {
    const fileContent = await fs.readFile(filePath, "utf-8")
    if (fileContent.trim() === "") {
      return null
    }
    const feedbacks = JSON.parse(fileContent)
    return feedbacks.find((feedback: Feedback) => feedback.id === id)
  } catch (error) {
    console.error("Error reading feedback.json:", error)
    return null
  }
}

type paramsType = Promise<{ id: string }>

export default async function FeedbackDetailPage(props: { params: Promise<paramsType> }) {
  const { id } = await props.params
  const feedback = await getFeedbackById(id)

  if (!feedback) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Feedback Details</h1>
      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {feedback.name || "Anonymous"}
        </p>
        <p>
          <strong>Phone:</strong> {feedback.phone || "Not provided"}
        </p>
        <p>
          <strong>Email:</strong> {feedback.email || "Not provided"}
        </p>
        <p>
          <strong>Feedback:</strong> {feedback.feedback}
        </p>
        <p>
          <strong>Submitted at:</strong> {new Date(Number.parseInt(feedback.id)).toLocaleString()}
        </p>
      </div>
    </div>
  )
}


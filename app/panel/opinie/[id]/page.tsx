import fs from "fs/promises"
import path from "path"
import { notFound } from "next/navigation"

async function getFeedbackById(id: string) {
  const filePath = path.join(process.cwd(), "data", "feedback.json")
  try {
    const fileContent = await fs.readFile(filePath, "utf-8")
    const feedbacks = JSON.parse(fileContent)
    return feedbacks.find((feedback: any) => feedback.id === id)
  } catch (error) {
    return null
  }
}

export default async function FeedbackDetailPage({ params }: { params: { id: string } }) {
  const feedback = await getFeedbackById(params.id)

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


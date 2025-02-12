import { getFeedback } from "../../../lib/getFeedback"
import FeedbackList from "./FeedbackList"

export default async function FeedbackPage() {
  const feedbacks = await getFeedback()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Feedback Entries</h1>
      <FeedbackList feedbacks={feedbacks} />
    </div>
  )
}


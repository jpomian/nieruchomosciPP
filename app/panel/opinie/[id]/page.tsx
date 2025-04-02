import { notFound } from "next/navigation"
import { getRedisClient } from "@/lib/db"

interface Feedback {
  id: string
  name: string
  phone?: string
  email?: string
  content: string
  createdAt: string
  status?: string
}

async function getFeedbackById(id: string) {
  try {
    const client = await getRedisClient()
    const key = `feedback:${id}`
    
    // Check if key exists
    const exists = await client.exists(key)
    if (!exists) return null
    
    // Get all fields from the hash
    const feedbackData = await client.hGetAll(key)
    
    return {
      id,
      name: feedbackData.name || "Anonymous",
      phone: feedbackData.phone || undefined,
      email: feedbackData.email || undefined,
      content: feedbackData.content || feedbackData.feedback || "", // Support both 'content' and 'feedback' fields
      createdAt: feedbackData.createdAt || id, // Fallback to id if createdAt missing
      status: feedbackData.status || "new"
    }
  } catch (error) {
    console.error("Error fetching feedback from Redis:", error)
    return null
  }
}

export default async function FeedbackDetailPage({ params }: { params: { id: string } }) {
  const feedback = await getFeedbackById(params.id)

  if (!feedback) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Feedback Details</h1>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            feedback.status === 'new' 
              ? 'bg-amber-100 text-amber-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {feedback.status?.toUpperCase()}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(parseInt(feedback.createdAt)).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Name</h2>
            <p className="text-lg font-medium">{feedback.name}</p>
          </div>
          
          {feedback.phone && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-sm font-medium text-gray-500 mb-1">Phone</h2>
              <p className="text-lg font-medium">{feedback.phone}</p>
            </div>
          )}
        </div>

        {feedback.email && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Email</h2>
            <p className="text-lg font-medium break-all">{feedback.email}</p>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Feedback</h2>
          <p className="whitespace-pre-line">{feedback.content}</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Feedback ID: {feedback.id}
        </p>
      </div>
    </div>
  )
}
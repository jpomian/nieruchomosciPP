import { notFound } from "next/navigation";
import { getRedisClient } from "@/lib/db";
import Link from 'next/link'

async function getFeedbackById(id: string) {
  try {
    const client = await getRedisClient();
    const key = `feedback:${id}`;

    // Check if key exists
    const exists = await client.exists(key);
    if (!exists) return null;

    // Get all fields from the hash
    const feedbackData = await client.hGetAll(key);

    return {
      id,
      name: feedbackData.name || "Anonymous",
      phone: feedbackData.phone || undefined,
      email: feedbackData.email || undefined,
      content: feedbackData.content || feedbackData.feedback || "", // Support both 'content' and 'feedback' fields
      createdAt: feedbackData.createdAt || id, // Fallback to id if createdAt missing
      status: feedbackData.status || "new",
    };
  } catch (error) {
    console.error("Error fetching feedback from Redis:", error);
    return null;
  }
}

type paramsType = Promise<{id: string}>

export default async function FeedbackDetailPage(props: { params: Promise<paramsType> }) {
  const { id } = await props.params
  const feedback = await getFeedbackById(id);

  if (!feedback) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <div className="flex flex-col items-start gap-2">
          <Link href={'/panel/opinie'}>
          <p className="text-gray-400">← Powrót</p>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Szczegóły zgłoszenia
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              feedback.status === "new"
                ? "bg-amber-100 text-amber-800"
                : "bg-green-100 text-green-800"
            }`}
          >
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
            <h2 className="text-sm font-medium text-gray-500 mb-1">Imię</h2>
            <p className="text-lg font-medium">{feedback.name}</p>
          </div>

          {feedback.phone && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-sm font-medium text-gray-500 mb-1">
                Numer telefonu
              </h2>
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
          <h2 className="text-sm font-medium text-gray-500 mb-1">Wiadomość</h2>
          <p className="whitespace-pre-line">{feedback.content}</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">ID zgłoszenia: {feedback.id}</p>
      </div>
    </div>
  );
}

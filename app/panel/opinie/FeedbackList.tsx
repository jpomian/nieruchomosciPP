"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Feedback {
  id: string;
  name: string;
  email: string;
  phone: string;
  content: string;
  createdAt: string;
  status: string;
}

export default function FeedbackList() {
  const [state, setState] = useState<{
    feedbacks: Feedback[];
    loading: boolean;
    error: string | null;
  }>({
    feedbacks: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        // Changed to fetch from API route instead of direct Redis access
        const response = await fetch("/api/feedback");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const feedbacks = await response.json();

        setState({
          feedbacks: feedbacks.sort(
            (a: Feedback, b: Feedback) =>
              parseInt(b.createdAt) - parseInt(a.createdAt)
          ),
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: `Failed to load feedbacks: ${
            err instanceof Error ? err.message : String(err)
          }`,
        }));
      }
    };

    fetchFeedbacks();
  }, []);

  if (state.loading) return <div className="p-4 text-center">Ładowanie...</div>;
  if (state.error)
    return <div className="p-4 text-red-500 text-center">{state.error}</div>;
  if (state.feedbacks.length === 0)
    return <div className="p-4 text-center">Nie znaleziono zgłoszeń</div>;

  return (
    <div className="space-y-4 max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Zgłoszenia klientów</h2>

      {state.feedbacks.map((feedback) => (
        <div
          key={feedback.id}
          className="border p-4 rounded-lg bg-white shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <Link href={`opinie/${feedback.id}`}>
              <h3 className="font-bold text-xl hover:text-gray-500">{feedback.name}</h3>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {new Date(parseInt(feedback.createdAt)).toLocaleString()}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  feedback.status === "new"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {feedback.status}
              </span>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{feedback.content}</p>

          <div className="flex flex-wrap gap-2">
            {feedback.email && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {feedback.email}
              </span>
            )}
            {feedback.phone && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {feedback.phone}
              </span>
            )}
          </div>
        </div>
      ))}
      <Link href={'/'}>
      <p className="flex justify-center my-8 text-lg">Wróć do strony głównej.</p>      
      </Link>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image'
import Logo from '../../assets/logo-transparent.png'
import FeedbackItem from "./FeedbackItem";

interface Feedback {
  id: string;
  name: string;
  email: string;
  phone: string;
  content: string;
  createdAt: string;
  status: "new" | "read"
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
      <div className="flex flex-row gap-4 items-center justify-center">
        <Image
        src={Logo}
        alt="Logo"
        className="h-[2lh] w-auto"
        />
      <h2 className="text-2xl font-bold leading-none">Zgłoszenia klientów</h2>
      </div>
      {state.feedbacks.map((feedback) => (
        <div
          key={feedback.id}
          className="border p-4 rounded-lg bg-white shadow"
        >
          <FeedbackItem
              key={feedback.id}
              id={feedback.id}
              name={feedback.name}
              email={feedback.email}
              phone={feedback.phone}
              content={feedback.content}
              createdAt={feedback.createdAt}
              status={feedback.status}
            />
        </div>
      ))}
      <div className="flex flex-row items-center justify-center gap-2">
        <Link href={'/panel'}>
            <p className="flex justify-center my-8 text-lg hover:text-gray-600">Wróć do panelu admina.</p>      
        </Link>
        <p className="text-lg font-bold mb-1">||</p>
        <Link href={'/'}>
          <p className="flex justify-center my-8 text-lg hover:text-gray-600">Wróć do strony głównej.</p>      
        </Link>
      </div>    
    </div>
  );
}

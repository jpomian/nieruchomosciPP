"use client";

import { useState } from "react";
import Link from "next/link";
import { updateFeedbackStatus, deleteFeedback } from "@/lib/crud-feedback";
import { Trash, MailCheck, MailOpen, Loader2 } from "lucide-react";

interface FeedbackItemProps {
  id: string;
  name: string;
  email: string;
  phone?: string;
  content: string;
  createdAt: string;
  status: "new" | "read";
}

export default function FeedbackItem({
  id,
  name,
  email,
  phone,
  content,
  createdAt,
  status,
}: FeedbackItemProps) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusUpdate = async () => {
    setIsLoading(true);
    setError(null);

    const newStatus = "read";
    setCurrentStatus(newStatus);

    try {
      const result = await updateFeedbackStatus(id, newStatus);

      if (result.error) {
        setError(result.error);
      } else {
        setCurrentStatus(newStatus);
      }
    } catch (err) {
      setError("Failed to update status");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFeedback(id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-2 mb-4">
      <div className="flex justify-between items-center mb-2">
        <Link
          href={`/panel/opinie/${id}`}
          onClick={() => {
            handleStatusUpdate();
          }}
        >
          <h3 className="font-medium hover:text-gray-400 duration-400">
            {name}
          </h3>
        </Link>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            currentStatus === "new"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {!isLoading ? (
            currentStatus === "new" ? (
              <div className="flex flex-row gap-1">
                <MailCheck className="h-3 w-3" />
                Nowa wiadomość
              </div>
            ) : (
              <div className="flex flex-row gap-1">
                <MailOpen className="h-3 w-3" />
                Przeczytano
              </div>
            )
          ) : (
            <div className="flex flex-row gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              Trwa ładowanie...
            </div>
          )}
        </span>
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
        {email && <p>Mail: {email}</p>}
        {phone && <p>Telefon: {phone}</p>}
      </div>

      <p className="text-md mb-4">{content}</p>

      <div className="flex flex-row gap-2 items-center">
        <button
          onClick={() => handleDelete(id)}
          className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
        >
          <Trash size={16} />
          <span>Usuń</span>
        </button>
        <span className="text-sm text-gray-500">
          {new Date(Number.parseInt(createdAt)).toLocaleString()}
        </span>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

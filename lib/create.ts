"use server";

import { getRedisClient } from "./db";
import { redirect } from "next/navigation";

interface Feedback {
  id: string;
  name: string;
  email: string;
  phone?: string;
  content: string;
  createdAt: number;
  status: "new" | "read";
}

interface FeedbackForm {
  name: string;
  phone: string;
  email: string;
  content: string;
}

export async function createFeedback(
  formData: FeedbackForm
): Promise<{ error?: string }> {
  const client = await getRedisClient();

  const name = formData.name.toString() ?? "";
  const email = formData.email.toString() ?? "";
  const phone = formData.phone.toString();
  const content = formData.content.toString() ?? "";

  if (!content) {
    return { error: "Content is required" };
  }

  if (!email && !phone) {
    return { error: "Either email or phone must be provided" };
  }

  const feedback: Feedback = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    content,
    createdAt: Date.now(),
    status: "new",
  };

  const redisFeedback = {
    id: feedback.id,
    name: feedback.name,
    email: feedback.email,
    phone: feedback.phone || "",
    content: feedback.content,
    createdAt: feedback.createdAt.toString(),
    status: feedback.status,
  };

  try {
    await client.hSet(`feedback:${feedback.id}`, redisFeedback);
  } catch (error) {
    console.error("Failed to create feedback:", error);
    return { error: "Failed to submit feedback" };
  }

  redirect("/thank-you");
}

export async function updateFeedbackStatus(
  id: string,
  newStatus: "new" | "read"
): Promise<{ error?: string }> {
  const client = await getRedisClient();

  try {
    const feedback = await client.hGetAll(`feedback:${id}`);
    if (!feedback.id) {
      return { error: "Feedback not found" };
    }

    await client.hSet(`feedback:${id}`, {
      ...feedback,
      status: newStatus,
    });

    return {};
  } catch (error) {
    console.error("Failed to update feedback status:", error);
    return { error: "Failed to update status" };
  }
}
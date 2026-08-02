"use client";

import { useState } from "react";
import { submitForm } from "../../lib/sendMail";
import { useRouter } from "next/navigation";
import { createFeedback } from "../../lib/crud-feedback";

interface FeedbackForm {
  email: string;
  content: string;
}

export default function Form() {
  const [formData, setFormData] = useState<FeedbackForm>({
    email: "",
    content: "",
  });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email) {
      setError("Proszę podać e-mail, abym mogła się z Tobą skontakować!");
      return;
    }

    if (!formData.content) {
      setError("Napisz proszę w jakiej sprawie się zgłaszasz.");
      return;
    }

    setStatus("sending");

    try {
      const response = await createFeedback(formData);

      if (response?.error) {
        throw new Error("Request failed");
      }

      // send the notification email too, if you still want it
      const emailData = new FormData();
      emailData.append("email", formData.email);
      emailData.append("content", formData.content);
      await submitForm(emailData);

      setStatus("ok");
      router.push("/thank-you");
    } catch (err) {
      console.error(err);
      setStatus("err");
      setError("Coś poszło nie tak. Spróbuj ponownie później.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div>
        <label htmlFor="email" className="block mb-1">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="content" className="block mb-1">
          Wiadomość
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 border rounded min-h-[120px]"
        />
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="px-4 py-2 bg-green-700 transition duration-300 text-white rounded hover:bg-green-600/70 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Wysyłanie..." : "Wyślij"}
      </button>
    </form>
  );
}
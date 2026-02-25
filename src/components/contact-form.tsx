"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error || "Failed to send message.");
      }

      form.reset();
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="grid gap-3">
        <label
          htmlFor="name"
          className="text-sm font-medium text-foreground/90"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="h-12 rounded-xl border border-border/40 bg-background/50 px-4 text-foreground outline-none ring-0 transition-all focus:border-accent/50 focus:bg-background/80 focus:ring-2 focus:ring-accent/20 backdrop-blur-sm"
          placeholder="Your name"
          autoComplete="name"
        />
      </div>

      <div className="grid gap-3">
        <label
          htmlFor="email"
          className="text-sm font-medium text-foreground/90"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="h-12 rounded-xl border border-border/40 bg-background/50 px-4 text-foreground outline-none ring-0 transition-all focus:border-accent/50 focus:bg-background/80 focus:ring-2 focus:ring-accent/20 backdrop-blur-sm"
          placeholder="you@email.com"
          autoComplete="email"
        />
      </div>

      <div className="grid gap-3">
        <label
          htmlFor="message"
          className="text-sm font-medium text-foreground/90"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="resize-none rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-foreground outline-none ring-0 transition-all focus:border-accent/50 focus:bg-background/80 focus:ring-2 focus:ring-accent/20 backdrop-blur-sm"
          placeholder="Tell me what you're looking for..."
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-accent to-accent/80 px-6 text-sm font-semibold text-black transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25 disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          <span className="relative z-10">
            {status === "sending" ? "Sending..." : "Send message"}
          </span>
          {status !== "sending" && (
            <svg
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          )}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-accent/80 opacity-0 transition-opacity group-hover:opacity-100" />
        </button>

        <div className="text-sm">
          {status === "sent" && (
            <span className="inline-flex items-center gap-2 text-green-500">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Message sent successfully!
            </span>
          )}
          {status === "error" && (
            <span className="inline-flex items-center gap-2 text-red-500">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </span>
          )}
        </div>
      </div>
    </form>
  );
}

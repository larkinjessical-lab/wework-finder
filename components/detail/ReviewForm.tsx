"use client";

import { useState } from "react";
import { Review } from "@/lib/types";

interface Props {
  locationId: string;
  onReviewAdded: (review: Review) => void;
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className={`text-2xl transition-all ${
            star <= (hovered || value) ? "text-amber scale-110" : "text-white/20"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ReviewForm({ locationId, onReviewAdded }: Props) {
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);

    if (rating === 0) {
      setErrors(["Please select a star rating"]);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locationId, authorName, rating, body }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors ?? [data.error ?? "Something went wrong"]);
      } else {
        onReviewAdded(data.review);
        setAuthorName("");
        setRating(0);
        setBody("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      }
    } catch {
      setErrors(["Network error. Please try again."]);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <h2 className="text-white font-bold text-lg mb-5 border-l-2 border-amber pl-3">
        Write a Review
      </h2>

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4 text-green-400 text-sm">
          ✓ Your review was posted successfully. Thanks for sharing!
        </div>
      )}

      {errors.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
          {errors.map((e, i) => (
            <p key={i} className="text-red-400 text-sm">{e}</p>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-white/10 rounded-xl p-5 space-y-4"
      >
        <div>
          <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
            Your name
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Jane D."
            maxLength={60}
            className="w-full bg-navy border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm
              placeholder:text-white/30 focus:border-amber focus:ring-1 focus:ring-amber/40 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
            Rating
          </label>
          <StarPicker value={rating} onChange={setRating} />
        </div>

        <div>
          <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
            Your review
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What was it like working here? Mention the WiFi speed, seating, noise level, amenities…"
            rows={4}
            maxLength={1000}
            className="w-full bg-navy border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm
              placeholder:text-white/30 focus:border-amber focus:ring-1 focus:ring-amber/40 outline-none transition resize-none"
          />
          <p className="text-white/30 text-xs text-right mt-1">{body.length}/1000</p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-amber hover:bg-amber-dark disabled:opacity-50 disabled:cursor-not-allowed
            text-navy font-semibold rounded-lg px-6 py-2.5 transition-colors text-sm"
        >
          {submitting ? "Posting…" : "Post Review"}
        </button>
      </form>
    </section>
  );
}

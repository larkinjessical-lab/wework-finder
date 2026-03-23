"use client";

import { useEffect, useState } from "react";
import { Review } from "@/lib/types";
import ReviewForm from "./ReviewForm";

interface Props {
  locationId: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? "text-amber" : "text-white/20"}>
          ★
        </span>
      ))}
    </span>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function UserReviewsList({ locationId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/reviews?locationId=${locationId}`)
      .then((r) => r.json())
      .then((d) => {
        setReviews(d.reviews ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locationId]);

  function handleReviewAdded(review: Review) {
    setReviews((prev) => [review, ...prev]);
  }

  return (
    <div className="space-y-8">
      <ReviewForm locationId={locationId} onReviewAdded={handleReviewAdded} />

      <section>
        <h2 className="text-white font-bold text-lg mb-5 border-l-2 border-amber pl-3">
          Member Reviews
          {reviews.length > 0 && (
            <span className="ml-2 text-white/40 font-normal text-base">({reviews.length})</span>
          )}
        </h2>

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-surface border border-white/10 rounded-xl p-4 animate-pulse">
                <div className="h-3 bg-white/10 rounded w-1/4 mb-3" />
                <div className="h-3 bg-white/10 rounded w-full mb-2" />
                <div className="h-3 bg-white/10 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-surface border border-white/10 rounded-xl p-8 text-center">
            <p className="text-3xl mb-2">✍️</p>
            <p className="text-white/50 text-sm">No member reviews yet. Be the first!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="bg-surface border border-white/10 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-white text-sm font-medium">{review.authorName}</p>
                    <StarRating rating={review.rating} />
                  </div>
                  <span className="text-white/30 text-xs">{formatDate(review.createdAt)}</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{review.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

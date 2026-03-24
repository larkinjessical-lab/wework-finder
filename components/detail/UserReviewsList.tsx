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
        <span key={i} className={i <= rating ? "text-ww-green" : "text-ww-border"}>★</span>
      ))}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function UserReviewsList({ locationId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/reviews?locationId=${locationId}`)
      .then((r) => r.json())
      .then((d) => { setReviews(d.reviews ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [locationId]);

  return (
    <div className="space-y-8">
      <ReviewForm locationId={locationId} onReviewAdded={(r) => setReviews((p) => [r, ...p])} />

      <section>
        <h2 className="font-display text-xl text-ww-black mb-5 border-l-2 border-ww-green pl-3">
          Member Reviews
          {reviews.length > 0 && (
            <span className="ml-2 text-ww-gray font-sans font-normal text-base">({reviews.length})</span>
          )}
        </h2>

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-ww-surface border border-ww-border rounded-xl p-4 animate-pulse">
                <div className="h-3 bg-ww-border rounded w-1/4 mb-3" />
                <div className="h-3 bg-ww-border rounded w-full mb-2" />
                <div className="h-3 bg-ww-border rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-ww-surface border border-ww-border rounded-xl p-8 text-center">
            <p className="text-3xl mb-2">✍️</p>
            <p className="text-ww-gray text-sm">No member reviews yet. Be the first!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white border border-ww-border rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-ww-black text-sm font-medium">{review.authorName}</p>
                    <StarRating rating={review.rating} />
                  </div>
                  <span className="text-ww-gray text-xs">{formatDate(review.createdAt)}</span>
                </div>
                <p className="text-ww-gray text-sm leading-relaxed">{review.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

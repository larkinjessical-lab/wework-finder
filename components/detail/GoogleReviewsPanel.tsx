"use client";

import { useEffect, useState } from "react";
import { GooglePlaceData } from "@/lib/types";

interface Props {
  placeId: string;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  return (
    <span className={size === "lg" ? "text-2xl" : "text-base"}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(rating) ? "text-amber" : "text-white/20"}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function GoogleReviewsPanel({ placeId }: Props) {
  const [data, setData] = useState<GooglePlaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/places/${placeId}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [placeId]);

  return (
    <section>
      <h2 className="text-white font-bold text-lg mb-5 border-l-2 border-amber pl-3">
        Google Reviews
      </h2>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface border border-white/10 rounded-xl p-4 animate-pulse">
              <div className="h-3 bg-white/10 rounded w-1/4 mb-3" />
              <div className="h-3 bg-white/10 rounded w-full mb-2" />
              <div className="h-3 bg-white/10 rounded w-3/4" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-surface border border-white/10 rounded-xl p-6 text-center text-white/40 text-sm">
          Could not load Google reviews at this time.
        </div>
      )}

      {data && !loading && (
        <div>
          {/* Overall rating */}
          <div className="bg-surface border border-white/10 rounded-xl p-5 mb-4 flex items-center gap-5">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">{data.rating.toFixed(1)}</p>
              <StarRating rating={data.rating} size="lg" />
              <p className="text-white/40 text-xs mt-1">{data.userRatingCount.toLocaleString()} reviews</p>
            </div>
            <div className="flex-1 border-l border-white/10 pl-5">
              <p className="text-white/60 text-sm">
                Based on Google reviews from verified visitors to this location.
              </p>
              <p className="text-amber text-xs mt-1">Sourced via Google Places API</p>
            </div>
          </div>

          {/* Individual reviews */}
          <div className="space-y-3">
            {data.reviews.map((review, i) => (
              <div key={i} className="bg-surface border border-white/10 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-white text-sm font-medium">{review.authorName}</p>
                    <StarRating rating={review.rating} />
                  </div>
                  <span className="text-white/30 text-xs">{review.relativeTime}</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

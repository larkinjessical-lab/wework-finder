import { getDb } from "@/lib/db";
import { Review } from "@/lib/types";

export async function getReviewsForLocation(locationId: string): Promise<Review[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, "locationId", "authorName", rating, body, "createdAt"
    FROM reviews
    WHERE "locationId" = ${locationId}
    ORDER BY "createdAt" DESC
    LIMIT 50
  `;
  return rows as Review[];
}

export async function createReview(data: {
  locationId: string;
  authorName: string;
  rating: number;
  body: string;
}): Promise<Review> {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO reviews ("locationId", "authorName", rating, body)
    VALUES (${data.locationId}, ${data.authorName}, ${data.rating}, ${data.body})
    RETURNING id, "locationId", "authorName", rating, body, "createdAt"
  `;
  return rows[0] as Review;
}

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

export function validateReview(body: unknown): {
  valid: boolean;
  errors: string[];
  data?: { locationId: string; authorName: string; rating: number; body: string };
} {
  const errors: string[] = [];
  if (typeof body !== "object" || body === null) {
    return { valid: false, errors: ["Invalid request body"] };
  }
  const b = body as Record<string, unknown>;

  const locationId = typeof b.locationId === "string" ? stripHtml(b.locationId) : "";
  const authorName = typeof b.authorName === "string" ? stripHtml(b.authorName) : "";
  const rating = Number(b.rating);
  const reviewBody = typeof b.body === "string" ? stripHtml(b.body) : "";

  if (!locationId) errors.push("locationId is required");
  if (!authorName || authorName.length > 60) errors.push("Name must be 1–60 characters");
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.push("Rating must be 1–5");
  if (reviewBody.length < 10 || reviewBody.length > 1000) errors.push("Review must be 10–1000 characters");

  if (errors.length > 0) return { valid: false, errors };
  return { valid: true, errors: [], data: { locationId, authorName, rating, body: reviewBody } };
}

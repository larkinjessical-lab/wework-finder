import { NextRequest, NextResponse } from "next/server";
import { getReviewsForLocation, createReview, validateReview } from "@/lib/reviews";
import { initDb } from "@/lib/db";
import { getLocation } from "@/lib/locations";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function GET(req: NextRequest) {
  const locationId = req.nextUrl.searchParams.get("locationId");
  if (!locationId) {
    return NextResponse.json({ error: "locationId is required" }, { status: 400 });
  }
  try {
    await initDb();
    const reviews = await getReviewsForLocation(locationId);
    return NextResponse.json({ reviews });
  } catch (err) {
    console.error("GET /api/reviews error:", err);
    return NextResponse.json({ reviews: [] });
  }
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many reviews submitted. Please wait before trying again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validation = validateReview(body);
  if (!validation.valid || !validation.data) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 });
  }

  const location = getLocation(validation.data.locationId);
  if (!location) {
    return NextResponse.json({ errors: ["Location not found"] }, { status: 400 });
  }

  try {
    await initDb();
    const review = await createReview(validation.data);
    return NextResponse.json({ review }, { status: 201 });
  } catch (err) {
    console.error("POST /api/reviews error:", err);
    return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
  }
}

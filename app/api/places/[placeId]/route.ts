import { NextRequest, NextResponse } from "next/server";
import { GooglePlaceData, GoogleReview } from "@/lib/types";

const PLACE_ID_REGEX = /^[A-Za-z0-9_-]{10,}$/;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ placeId: string }> }
) {
  const { placeId } = await params;

  if (!PLACE_ID_REGEX.test(placeId)) {
    return NextResponse.json({ error: "Invalid place ID" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || apiKey === "your_google_places_api_key_here") {
    // Return mock data when no API key is configured
    return NextResponse.json(getMockPlaceData());
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Google Places API error:", res.status, text);
      return NextResponse.json(getMockPlaceData());
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any = await res.json();

    const data: GooglePlaceData = {
      rating: raw.rating ?? 0,
      userRatingCount: raw.userRatingCount ?? 0,
      reviews: (raw.reviews ?? []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (r: any): GoogleReview => ({
          authorName: r.authorAttribution?.displayName ?? "Anonymous",
          rating: r.rating ?? 0,
          text: r.text?.text ?? "",
          relativeTime: r.relativePublishTimeDescription ?? "",
          profilePhotoUrl: r.authorAttribution?.photoUri,
        })
      ),
    };

    return NextResponse.json(data);
  } catch (err) {
    console.error("Places API fetch failed:", err);
    return NextResponse.json(getMockPlaceData());
  }
}

function getMockPlaceData(): GooglePlaceData {
  return {
    rating: 4.2,
    userRatingCount: 87,
    reviews: [
      {
        authorName: "Alex M.",
        rating: 5,
        text: "Great space with fast WiFi and plenty of seating. The community team is super helpful. Definitely recommend for anyone working remotely.",
        relativeTime: "2 weeks ago",
      },
      {
        authorName: "Sarah K.",
        rating: 4,
        text: "Love the vibe here. Coffee is always fresh and the phone booths are a lifesaver for calls. Gets a bit busy around 10–11am but settles down.",
        relativeTime: "1 month ago",
      },
      {
        authorName: "Jordan T.",
        rating: 4,
        text: "Solid WeWork. Clean, professional, well-maintained. Would love more monitor stations but overall a great place to get work done.",
        relativeTime: "1 month ago",
      },
      {
        authorName: "Priya N.",
        rating: 5,
        text: "This is my regular spot. Natural light is amazing, the community events are fun, and I've met some great people here. 10/10.",
        relativeTime: "3 months ago",
      },
      {
        authorName: "Marcus L.",
        rating: 3,
        text: "Good location but can be noisy during peak hours. The phone booths fill up fast. Worth it for the location and WiFi reliability.",
        relativeTime: "3 months ago",
      },
    ],
  };
}

export type AmenityKey =
  | "wifi"
  | "printing"
  | "phone-booths"
  | "conference-rooms"
  | "bike-storage"
  | "showers"
  | "coffee-tea"
  | "rooftop"
  | "parking"
  | "24-7-access"
  | "dog-friendly"
  | "lounge"
  | "standing-desks"
  | "natural-light"
  | "monitors";

export const AMENITY_LABELS: Record<AmenityKey, string> = {
  wifi: "High-Speed WiFi",
  printing: "Printing",
  "phone-booths": "Phone Booths",
  "conference-rooms": "Conference Rooms",
  "bike-storage": "Bike Storage",
  showers: "Showers",
  "coffee-tea": "Coffee & Tea",
  rooftop: "Rooftop",
  parking: "Parking",
  "24-7-access": "24/7 Access",
  "dog-friendly": "Dog Friendly",
  lounge: "Lounge",
  "standing-desks": "Standing Desks",
  "natural-light": "Natural Light",
  monitors: "Monitors",
};

export const AMENITY_ICONS: Record<AmenityKey, string> = {
  wifi: "📶",
  printing: "🖨️",
  "phone-booths": "📞",
  "conference-rooms": "🏛️",
  "bike-storage": "🚲",
  showers: "🚿",
  "coffee-tea": "☕",
  rooftop: "🏙️",
  parking: "🅿️",
  "24-7-access": "🔑",
  "dog-friendly": "🐾",
  lounge: "🛋️",
  "standing-desks": "🖥️",
  "natural-light": "☀️",
  monitors: "🖥️",
};

export interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  amenities: AmenityKey[];
  googlePlaceId: string;
  photos: string[];
  tier: "all-access-basic" | "all-access-plus";
  description: string;
}

export interface Review {
  id: number;
  locationId: string;
  authorName: string;
  rating: number;
  body: string;
  createdAt: string;
}

export interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhotoUrl?: string;
}

export interface GooglePlaceData {
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
}

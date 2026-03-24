import locationsData from "@/data/locations.json";
import { Location, AmenityKey } from "@/lib/types";

export const locations = locationsData as Location[];

export function getLocation(id: string): Location | undefined {
  return locations.find((loc) => loc.id === id);
}

export function filterLocations(
  query: string,
  amenities: AmenityKey[],
  tier?: "all-access-basic" | "all-access-plus"
): Location[] {
  const q = query.toLowerCase().trim();
  return locations.filter((loc) => {
    const matchesQuery =
      !q ||
      loc.city.toLowerCase().includes(q) ||
      loc.state.toLowerCase().includes(q) ||
      loc.name.toLowerCase().includes(q) ||
      loc.address.toLowerCase().includes(q);

    const matchesAmenities =
      amenities.length === 0 ||
      amenities.every((a) => loc.amenities.includes(a));

    const matchesTier = !tier || loc.tier === tier;

    return matchesQuery && matchesAmenities && matchesTier;
  });
}

export function getBasicLocations(): Location[] {
  return locations.filter((l) => l.tier === "all-access-basic");
}

export function getPlusLocations(): Location[] {
  return locations;
}

export function getAllCities(): string[] {
  const cities = locations.map((loc) => loc.city);
  return [...new Set(cities)].sort();
}

export function getAllStates(): string[] {
  const states = locations.map((loc) => loc.state);
  return [...new Set(states)].sort();
}

import locationsData from "@/data/locations.json";
import { Location, AmenityKey } from "@/lib/types";

export const locations = locationsData as Location[];

export function getLocation(id: string): Location | undefined {
  return locations.find((loc) => loc.id === id);
}

export function filterLocations(
  query: string,
  amenities: AmenityKey[]
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

    return matchesQuery && matchesAmenities;
  });
}

export function getAllCities(): string[] {
  const cities = locations.map((loc) => loc.city);
  return [...new Set(cities)].sort();
}

export function getAllStates(): string[] {
  const states = locations.map((loc) => loc.state);
  return [...new Set(states)].sort();
}

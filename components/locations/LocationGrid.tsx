"use client";

import { useState } from "react";
import { Location, AmenityKey, AMENITY_LABELS } from "@/lib/types";
import LocationCard from "./LocationCard";

const FILTERABLE_AMENITIES: AmenityKey[] = [
  "wifi",
  "coffee-tea",
  "phone-booths",
  "monitors",
  "bike-storage",
  "showers",
  "natural-light",
  "rooftop",
  "dog-friendly",
  "24-7-access",
  "standing-desks",
];

interface Props {
  locations: Location[];
  initialCity?: string;
}

export default function LocationGrid({ locations, initialCity = "" }: Props) {
  const [query, setQuery] = useState("");
  const [activeAmenities, setActiveAmenities] = useState<AmenityKey[]>([]);
  const [activeCity, setActiveCity] = useState(initialCity);

  const cities = [...new Set(locations.map((l) => l.city))].sort();

  const q = (activeCity || query).toLowerCase().trim();
  const filtered = locations.filter((loc) => {
    const matchesQuery =
      !q ||
      loc.city.toLowerCase().includes(q) ||
      loc.state.toLowerCase().includes(q) ||
      loc.name.toLowerCase().includes(q) ||
      loc.address.toLowerCase().includes(q);
    const matchesAmenities =
      activeAmenities.length === 0 ||
      activeAmenities.every((a) => loc.amenities.includes(a));
    return matchesQuery && matchesAmenities;
  });

  function toggleAmenity(amenity: AmenityKey) {
    setActiveAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  }

  function selectCity(city: string) {
    setActiveCity(city === activeCity ? "" : city);
    setQuery("");
  }

  return (
    <div>
      {/* Search + Filter */}
      <div className="bg-surface border border-white/10 rounded-xl p-5 mb-8 space-y-4">
        {/* Search input */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search by city, state, or location name…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveCity("");
            }}
            className="w-full bg-navy border border-white/20 rounded-lg pl-9 pr-4 py-2.5 text-white text-sm
              placeholder:text-white/30 focus:border-amber focus:ring-1 focus:ring-amber/40 outline-none transition"
          />
          {(query || activeCity) && (
            <button
              onClick={() => { setQuery(""); setActiveCity(""); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* City pills */}
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">City</p>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => selectCity(city)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  activeCity === city
                    ? "bg-amber text-navy font-semibold border-amber"
                    : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Amenity filter chips */}
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Filter by amenity</p>
          <div className="flex flex-wrap gap-2">
            {FILTERABLE_AMENITIES.map((amenity) => (
              <button
                key={amenity}
                onClick={() => toggleAmenity(amenity)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  activeAmenities.includes(amenity)
                    ? "bg-amber text-navy font-semibold border-amber"
                    : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                }`}
              >
                {AMENITY_LABELS[amenity]}
              </button>
            ))}
            {activeAmenities.length > 0 && (
              <button
                onClick={() => setActiveAmenities([])}
                className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/30 hover:text-white transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-white/40 text-sm mb-5">
        {filtered.length} location{filtered.length !== 1 ? "s" : ""} available
        {activeAmenities.length > 0 && ` · filtered by ${activeAmenities.length} amenity${activeAmenities.length > 1 ? "ies" : ""}`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <p className="text-4xl mb-3">🏢</p>
          <p className="text-lg font-medium text-white/50 mb-1">No locations found</p>
          <p className="text-sm">Try adjusting your search or removing some filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      )}
    </div>
  );
}

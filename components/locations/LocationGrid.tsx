"use client";

import { useState, lazy, Suspense } from "react";
import { Location, AmenityKey, AMENITY_LABELS } from "@/lib/types";
import LocationCard from "./LocationCard";

const MapView = lazy(() => import("./MapView"));

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
  const [view, setView] = useState<"list" | "map">("list");

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
      <div className="bg-ww-surface border border-ww-border rounded-xl p-5 mb-8 space-y-4">
        {/* Search input */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ww-gray text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search by city, state, or location name…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveCity("");
            }}
            className="w-full bg-white border border-ww-border rounded-lg pl-9 pr-4 py-2.5 text-ww-black text-sm
              placeholder:text-ww-gray focus:border-ww-green focus:ring-1 focus:ring-ww-green/30 outline-none transition"
          />
          {(query || activeCity) && (
            <button
              onClick={() => { setQuery(""); setActiveCity(""); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ww-gray hover:text-ww-black text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* City pills */}
        <div>
          <p className="text-ww-gray text-xs uppercase tracking-widest mb-2">City</p>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => selectCity(city)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  activeCity === city
                    ? "bg-ww-green text-white font-semibold border-ww-green"
                    : "bg-white text-ww-gray border-ww-border hover:border-ww-green hover:text-ww-black"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Amenity filter chips */}
        <div>
          <p className="text-ww-gray text-xs uppercase tracking-widest mb-2">Filter by amenity</p>
          <div className="flex flex-wrap gap-2">
            {FILTERABLE_AMENITIES.map((amenity) => (
              <button
                key={amenity}
                onClick={() => toggleAmenity(amenity)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  activeAmenities.includes(amenity)
                    ? "bg-ww-green text-white font-semibold border-ww-green"
                    : "bg-white text-ww-gray border-ww-border hover:border-ww-green hover:text-ww-black"
                }`}
              >
                {AMENITY_LABELS[amenity]}
              </button>
            ))}
            {activeAmenities.length > 0 && (
              <button
                onClick={() => setActiveAmenities([])}
                className="text-xs px-3 py-1 rounded-full border border-ww-border text-ww-gray hover:text-ww-black transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results count + view toggle */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-ww-gray text-sm">
          {filtered.length} location{filtered.length !== 1 ? "s" : ""} available
          {activeAmenities.length > 0 && ` · filtered by ${activeAmenities.length} amenity${activeAmenities.length > 1 ? "ies" : ""}`}
        </p>
        <div className="flex items-center bg-ww-surface border border-ww-border rounded-lg p-1 gap-1">
          <button
            onClick={() => setView("list")}
            className={`text-xs px-3 py-1.5 rounded-md transition-all ${
              view === "list"
                ? "bg-ww-green text-white font-semibold"
                : "text-ww-gray hover:text-ww-black"
            }`}
          >
            ☰ List
          </button>
          <button
            onClick={() => setView("map")}
            className={`text-xs px-3 py-1.5 rounded-md transition-all ${
              view === "map"
                ? "bg-ww-green text-white font-semibold"
                : "text-ww-gray hover:text-ww-black"
            }`}
          >
            🗺 Map
          </button>
        </div>
      </div>

      {/* List or Map */}
      {view === "map" ? (
        <Suspense fallback={
          <div className="rounded-xl border border-ww-border bg-ww-surface flex items-center justify-center" style={{ height: "600px" }}>
            <p className="text-ww-gray text-sm">Loading map…</p>
          </div>
        }>
          <MapView locations={filtered} />
        </Suspense>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">🏢</p>
          <p className="text-lg font-medium text-ww-black mb-1">No locations found</p>
          <p className="text-sm text-ww-gray">Try adjusting your search or removing some filters</p>
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

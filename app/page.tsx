import Link from "next/link";
import { locations } from "@/lib/locations";

const CITIES = [...new Set(locations.map((l) => l.city))].sort();

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="border-b border-ww-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-ww-gray text-sm font-medium mb-4 uppercase tracking-widest">
              All Access Basic · United States
            </p>
            <h1 className="font-display text-5xl sm:text-6xl text-ww-black leading-tight mb-6">
              Find your next<br />WeWork workspace.
            </h1>
            <p className="text-ww-gray text-lg leading-relaxed mb-8 max-w-xl">
              Browse all US locations available to All Access Basic members. Filter by city
              or amenity, read real member reviews, and discover your ideal spot.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/locations"
                className="inline-flex items-center bg-ww-green hover:bg-ww-green-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
              >
                Browse all {locations.length} locations →
              </Link>
              <a
                href="https://www.wework.com/workspace/all-access"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-ww-border hover:border-ww-gray text-ww-gray hover:text-ww-black px-6 py-3 rounded-lg transition-colors text-sm"
              >
                About All Access Basic ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-ww-border bg-ww-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="font-display text-4xl text-ww-black">{locations.length}</p>
              <p className="text-ww-gray text-sm mt-1">Locations</p>
            </div>
            <div className="border-l border-ww-border pl-8">
              <p className="font-display text-4xl text-ww-black">{CITIES.length}</p>
              <p className="text-ww-gray text-sm mt-1">Cities</p>
            </div>
            <div className="border-l border-ww-border pl-8">
              <p className="font-display text-4xl text-ww-black">10</p>
              <p className="text-ww-gray text-sm mt-1">States + DC</p>
            </div>
          </div>
        </div>
      </div>

      {/* City grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-2xl text-ww-black mb-6">Browse by city</h2>
        <div className="flex flex-wrap gap-3">
          {CITIES.map((city) => {
            const count = locations.filter((l) => l.city === city).length;
            return (
              <Link
                key={city}
                href={`/locations?city=${encodeURIComponent(city)}`}
                className="flex items-center gap-2 border border-ww-border hover:border-ww-green
                  bg-white rounded-lg px-4 py-3 transition-all hover:shadow-sm"
              >
                <span className="text-ww-black font-medium text-sm">{city}</span>
                <span className="text-ww-gray text-xs">{count}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

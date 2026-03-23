import Link from "next/link";
import { locations } from "@/lib/locations";

const CITIES = [...new Set(locations.map((l) => l.city))].sort();

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Hero */}
      <div className="max-w-3xl mb-16">
        <p className="text-amber text-sm font-semibold uppercase tracking-widest mb-4">
          All Access Basic · United States
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
          Find your next<br />
          <span className="text-amber">WeWork workspace.</span>
        </h1>
        <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl">
          Browse all US locations available to All Access Basic members. Filter by city
          or amenity, read real member reviews, and discover your ideal spot.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/locations"
            className="inline-flex items-center bg-amber hover:bg-amber-dark text-navy font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Browse all {locations.length} locations →
          </Link>
          <a
            href="https://www.wework.com/workspace/all-access"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center border border-white/20 hover:border-white/40 text-white/70 hover:text-white px-6 py-3 rounded-lg transition-colors text-sm"
          >
            About All Access Basic ↗
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-16 max-w-lg">
        <div className="bg-surface border border-white/10 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-amber">{locations.length}</p>
          <p className="text-white/50 text-xs mt-1">Locations</p>
        </div>
        <div className="bg-surface border border-white/10 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-amber">{CITIES.length}</p>
          <p className="text-white/50 text-xs mt-1">Cities</p>
        </div>
        <div className="bg-surface border border-white/10 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-amber">10</p>
          <p className="text-white/50 text-xs mt-1">States + DC</p>
        </div>
      </div>

      {/* City grid */}
      <div>
        <h2 className="text-white font-semibold text-xl mb-5 border-l-2 border-amber pl-3">
          Browse by city
        </h2>
        <div className="flex flex-wrap gap-3">
          {CITIES.map((city) => {
            const count = locations.filter((l) => l.city === city).length;
            return (
              <Link
                key={city}
                href={`/locations?city=${encodeURIComponent(city)}`}
                className="flex items-center gap-2 bg-surface border border-white/10 hover:border-amber/40
                  rounded-lg px-4 py-3 transition-all hover:shadow-[0_0_16px_rgba(196,147,63,0.1)]"
              >
                <span className="text-white font-medium text-sm">{city}</span>
                <span className="text-white/30 text-xs">{count}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

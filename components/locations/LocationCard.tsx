import Link from "next/link";
import { Location } from "@/lib/types";
import AmenityBadge from "./AmenityBadge";

interface Props {
  location: Location;
}

export default function LocationCard({ location }: Props) {
  const previewAmenities = location.amenities.slice(0, 4);
  const remaining = location.amenities.length - previewAmenities.length;

  return (
    <Link
      href={`/locations/${location.id}`}
      className="group block bg-surface border border-white/10 rounded-xl overflow-hidden
        hover:border-amber/40 hover:shadow-[0_0_24px_rgba(196,147,63,0.12)]
        transition-all duration-200"
    >
      {/* Color band */}
      <div className="h-1 bg-gradient-to-r from-amber to-amber-dark" />

      <div className="p-5">
        {/* City / State */}
        <p className="text-amber text-xs font-semibold tracking-widest uppercase mb-1">
          {location.city}, {location.state}
        </p>

        {/* Name */}
        <h3 className="text-white font-semibold text-base mb-2 group-hover:text-amber transition-colors line-clamp-1">
          {location.name}
        </h3>

        {/* Address */}
        <p className="text-white/40 text-xs mb-4 line-clamp-1">{location.address}</p>

        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
          {location.description}
        </p>

        {/* Amenity badges */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {previewAmenities.map((amenity) => (
            <AmenityBadge key={amenity} amenity={amenity} />
          ))}
          {remaining > 0 && (
            <span className="text-white/40 text-xs px-2 py-0.5 rounded-full border border-white/10">
              +{remaining} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between">
        <span className="text-white/30 text-xs">{location.phone}</span>
        <span className="text-amber text-xs font-medium group-hover:translate-x-0.5 transition-transform">
          View details →
        </span>
      </div>
    </Link>
  );
}

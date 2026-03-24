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
      className="group block bg-white border border-ww-border rounded-xl overflow-hidden
        hover:border-ww-green hover:shadow-md transition-all duration-200"
    >
      <div className="p-5">
        {/* City / State */}
        <p className="text-ww-green text-xs font-semibold tracking-widest uppercase mb-1">
          {location.city}, {location.state}
        </p>

        {/* Name */}
        <h3 className="text-ww-black font-display text-lg mb-2 group-hover:text-ww-green transition-colors line-clamp-1">
          {location.name}
        </h3>

        {/* Address */}
        <p className="text-ww-gray text-xs mb-4 line-clamp-1">{location.address}</p>

        {/* Description */}
        <p className="text-ww-gray text-sm leading-relaxed mb-4 line-clamp-2">
          {location.description}
        </p>

        {/* Amenity badges */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {previewAmenities.map((amenity) => (
            <AmenityBadge key={amenity} amenity={amenity} />
          ))}
          {remaining > 0 && (
            <span className="text-ww-gray text-xs px-2 py-0.5 rounded-full border border-ww-border">
              +{remaining} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-ww-border bg-ww-surface flex items-center justify-between">
        <span className="text-ww-gray text-xs">{location.phone}</span>
        <span className="text-ww-green text-xs font-medium group-hover:translate-x-0.5 transition-transform">
          View details →
        </span>
      </div>
    </Link>
  );
}

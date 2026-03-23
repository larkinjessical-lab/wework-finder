import { AmenityKey, AMENITY_LABELS, AMENITY_ICONS } from "@/lib/types";

interface Props {
  amenity: AmenityKey;
  size?: "sm" | "md";
}

export default function AmenityBadge({ amenity, size = "sm" }: Props) {
  const label = AMENITY_LABELS[amenity];
  const icon = AMENITY_ICONS[amenity];

  if (size === "md") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-navy-muted text-white/80 text-sm px-3 py-1.5 rounded-full border border-white/10">
        <span>{icon}</span>
        <span>{label}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 bg-navy-muted text-white/60 text-xs px-2 py-0.5 rounded-full border border-white/10">
      <span className="text-xs">{icon}</span>
      <span>{label}</span>
    </span>
  );
}

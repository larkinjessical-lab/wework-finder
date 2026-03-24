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
      <span className="inline-flex items-center gap-1.5 bg-ww-surface text-ww-black text-sm px-3 py-1.5 rounded-full border border-ww-border">
        <span>{icon}</span>
        <span>{label}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 bg-ww-surface text-ww-gray text-xs px-2 py-0.5 rounded-full border border-ww-border">
      <span className="text-xs">{icon}</span>
      <span>{label}</span>
    </span>
  );
}

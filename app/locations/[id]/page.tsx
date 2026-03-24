import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocation, getBasicLocations } from "@/lib/locations";
import { AMENITY_LABELS, AMENITY_ICONS } from "@/lib/types";
import GoogleReviewsPanel from "@/components/detail/GoogleReviewsPanel";
import UserReviewsList from "@/components/detail/UserReviewsList";

export async function generateStaticParams() {
  return getBasicLocations().map((loc) => ({ id: loc.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const location = getLocation(id);
  if (!location) return {};
  return {
    title: `${location.name} — WeWork Finder`,
    description: location.description,
  };
}

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
const DAY_LABELS: Record<string, string> = {
  monday: "Mon", tuesday: "Tue", wednesday: "Wed",
  thursday: "Thu", friday: "Fri", saturday: "Sat", sunday: "Sun",
};

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = getLocation(id);
  if (!location) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-ww-gray mb-6">
        <Link href="/locations" className="hover:text-ww-black transition-colors">
          All Locations
        </Link>
        <span>/</span>
        <span className="text-ww-black">{location.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-1 space-y-5">
          {/* Header card */}
          <div className="bg-white border border-ww-border rounded-xl overflow-hidden">
            <div className="h-1 bg-ww-green" />
            <div className="p-6">
              <p className="text-ww-green text-xs font-semibold uppercase tracking-widest mb-2">
                {location.city}, {location.state}
              </p>
              <h1 className="font-display text-2xl text-ww-black mb-3">{location.name}</h1>
              <p className="text-ww-gray text-sm leading-relaxed mb-4">{location.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-ww-gray">📍</span>
                  <span className="text-ww-gray">{location.address}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-ww-gray">📞</span>
                  <a href={`tel:${location.phone}`} className="text-ww-gray hover:text-ww-green transition-colors">
                    {location.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white border border-ww-border rounded-xl p-5">
            <h2 className="font-display text-base text-ww-black mb-4 border-l-2 border-ww-green pl-3">
              Hours
            </h2>
            <div className="space-y-2">
              {DAYS.map((day) => {
                const hours = location.hours[day];
                const isClosed = hours === "Closed";
                return (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-ww-gray">{DAY_LABELS[day]}</span>
                    <span className={isClosed ? "text-ww-border" : "text-ww-black"}>{hours}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white border border-ww-border rounded-xl p-5">
            <h2 className="font-display text-base text-ww-black mb-4 border-l-2 border-ww-green pl-3">
              Amenities
            </h2>
            <div className="space-y-2">
              {location.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-3 text-sm">
                  <span className="text-base w-6 text-center">{AMENITY_ICONS[amenity]}</span>
                  <span className="text-ww-gray">{AMENITY_LABELS[amenity]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All Access Basic badge */}
          <div className="bg-ww-green-light border border-ww-green/30 rounded-xl p-4">
            <p className="text-ww-green text-xs font-semibold uppercase tracking-widest mb-1">
              ✓ All Access Basic
            </p>
            <p className="text-ww-gray text-sm">
              This location is included in your All Access Basic membership.
              Drop in during open hours — no reservation required for hot desks.
            </p>
          </div>
        </div>

        {/* Right column — reviews */}
        <div className="lg:col-span-2 space-y-8">
          <GoogleReviewsPanel placeId={location.googlePlaceId} />
          <UserReviewsList locationId={location.id} />
        </div>
      </div>
    </div>
  );
}

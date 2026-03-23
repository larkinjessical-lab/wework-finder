import { locations } from "@/lib/locations";
import LocationGrid from "@/components/locations/LocationGrid";

export const metadata = {
  title: "All Locations — WeWork Finder",
  description: "Browse all US WeWork locations available to All Access Basic members.",
};

export default async function LocationsPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const { city } = await searchParams;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-amber text-xs font-semibold uppercase tracking-widest mb-2">
          All Access Basic · United States
        </p>
        <h1 className="text-white font-bold text-3xl">All Locations</h1>
        <p className="text-white/50 text-sm mt-1">
          {locations.length} locations across the US available to your membership
        </p>
      </div>
      <LocationGrid locations={locations} initialCity={city ?? ""} />
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-32 text-center">
      <p className="text-5xl mb-4">🏢</p>
      <h1 className="text-white font-bold text-2xl mb-2">Location not found</h1>
      <p className="text-white/50 mb-6">
        That location doesn&apos;t exist or isn&apos;t available on All Access Basic.
      </p>
      <Link
        href="/locations"
        className="inline-flex items-center bg-amber hover:bg-amber-dark text-navy font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
      >
        ← Browse all locations
      </Link>
    </div>
  );
}

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-amber rounded-sm flex items-center justify-center text-navy font-black text-sm">
            WW
          </div>
          <div>
            <span className="text-white font-semibold text-sm tracking-wide">WeWork Finder</span>
            <span className="ml-2 text-xs text-amber font-medium uppercase tracking-widest">
              All Access Basic
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/locations"
            className="text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            All Locations
          </Link>
          <a
            href="https://www.wework.com/workspace/all-access"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/50 hover:text-amber transition-colors"
          >
            About All Access ↗
          </a>
        </nav>
      </div>
    </header>
  );
}

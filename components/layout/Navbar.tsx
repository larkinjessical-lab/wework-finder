import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-ww-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="font-display text-xl text-ww-black tracking-tight">wework</span>
          <span className="text-xs text-ww-gray border border-ww-border rounded-full px-2 py-0.5 font-sans">
            All Access Basic
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/locations"
            className="text-ww-gray hover:text-ww-black text-sm font-medium transition-colors"
          >
            All Locations
          </Link>
          <a
            href="https://www.wework.com/workspace/all-access"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold bg-ww-green hover:bg-ww-green-dark text-white px-4 py-2 rounded-lg transition-colors"
          >
            About All Access
          </a>
        </nav>
      </div>
    </header>
  );
}

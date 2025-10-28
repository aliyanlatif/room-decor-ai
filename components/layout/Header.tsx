import Link from "next/link";
import { NAV_LINKS } from "@/constants";

export default function Header() {
  return (
    <header className="container mx-auto px-4 py-6 pt-8 max-w-7xl">
      <nav className="flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-gray-200 transition-colors"
        >
          AI Room Decor
        </Link>
        <div className="flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-gray-200 transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

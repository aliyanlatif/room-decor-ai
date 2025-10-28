/**
 * Header Navigation Component
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo/Title on the left */}
          <Link
            href="/"
            className="text-2xl font-bold text-white drop-shadow-lg"
          >
            AI Room Decor
          </Link>

          {/* Navigation links on the right */}
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

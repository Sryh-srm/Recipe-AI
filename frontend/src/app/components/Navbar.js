"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "@/app/components/LogoIcon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Search",    href: "/search"    },
    { label: "Assistant", href: "/assistant" },
    { label: "Features",  href: "/#features" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0f14]/80 backdrop-blur-lg border-b border-white/[0.06] shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          id="navbar-logo"
          className="flex items-center gap-2.5 group"
          aria-label="Recipe AI home"
        >
          {/* Icon */}
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] shadow-lg shadow-[#7C3AED]/30 group-hover:shadow-[#7C3AED]/50 transition-shadow duration-300">
            <LogoIcon />
          </span>
          <span className="text-xl font-bold tracking-tight text-white">
            Recipe{" "}
            <span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === '/#features' && false); // hash matching handled separately if needed
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`text-sm font-medium transition-colors duration-200 relative pb-1 ${
                    isActive ? "text-[#A855F7]" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 rounded-t-full bg-[#A855F7]" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            id="nav-signin"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
          >
            Sign in
          </a>
          <a
            href="/search"
            id="nav-get-started"
            className="text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white shadow-md shadow-[#7C3AED]/25 hover:shadow-[#7C3AED]/45 hover:scale-105 transition-all duration-200"
          >
            Get started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          id="navbar-menu-toggle"
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-0.5 bg-slate-300 rounded transition-all duration-300 ${
                i === 0 ? "w-5" : i === 1 ? "w-4" : "w-3"
              }`}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-5 bg-[#0d0f14]/95 backdrop-blur-lg border-b border-white/[0.06]">
          <ul className="flex flex-col gap-4 pt-2" role="list">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`block text-sm font-medium transition-colors ${
                      isActive ? "text-[#A855F7]" : "text-slate-300 hover:text-white"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href="#"
            className="mt-5 flex items-center justify-center w-full py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white text-sm font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Get started
          </a>
        </div>
      )}
    </header>
  );
}

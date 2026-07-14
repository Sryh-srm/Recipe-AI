"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
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
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow duration-300">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 text-white"
              aria-hidden="true"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7z"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z"
                fill="currentColor"
                opacity="0.7"
              />
            </svg>
          </span>
          <span className="text-xl font-bold tracking-tight text-white">
            Recipe{" "}
            <span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
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
            className="text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/45 hover:scale-105 transition-all duration-200"
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
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="mt-5 flex items-center justify-center w-full py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Get started
          </a>
        </div>
      )}
    </header>
  );
}

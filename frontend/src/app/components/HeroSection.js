"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SUGGESTIONS = [
  "Quick 30-minute pasta",
  "High-protein vegan bowl",
  "Gluten-free chocolate cake",
  "Spicy Thai green curry",
  "Mediterranean salad",
];

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const navigateToSearch = (q) => {
    if (!q?.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigateToSearch(query);
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16 text-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ── Badge ── */}
      <div className="animate-fade-up delay-100 mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#7C3AED]/20 text-sm font-medium text-[#A855F7]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A855F7] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C3AED]" />
        </span>
        Powered by vector embeddings &amp; LLMs
      </div>

      {/* ── Heading ── */}
      <h1
        id="hero-heading"
        className="animate-fade-up delay-200 max-w-3xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white"
      >
        Cook smarter with{" "}
        <span className="gradient-text">AI-powered</span>{" "}
        recipe search
      </h1>

      {/* ── Tagline ── */}
      <p className="animate-fade-up delay-300 mt-4 sm:mt-6 max-w-xl text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed">
        Find recipes using AI-powered semantic search. Describe what you're
        craving in plain English — Recipe AI understands intent, not just
        keywords.
      </p>

      {/* ── Search Bar ── */}
      <form
        onSubmit={handleSubmit}
        className="animate-fade-up delay-400 mt-10 w-full max-w-2xl"
        role="search"
        aria-label="Recipe search"
      >
        <div className="relative flex items-center glass-card gradient-border rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
          {/* Search icon */}
          <div className="pl-5 pr-3 flex-shrink-0">
            <svg
              className="w-5 h-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </div>

          <input
            id="hero-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={'e.g. "Creamy pasta with mushrooms under 30 min"'}
            className="flex-1 py-3 sm:py-4 pr-4 bg-transparent text-white placeholder-slate-500 text-sm sm:text-base outline-none"
            aria-label="Search for recipes"
            autoComplete="off"
          />

          <button
            id="hero-search-btn"
            type="submit"
            className="btn-glow m-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white text-sm font-semibold shadow-lg shadow-[#7C3AED]/30 hover:shadow-[#7C3AED]/50 hover:scale-105 transition-all duration-200 flex-shrink-0"
            aria-label="Search recipes"
          >
            Search
          </button>
        </div>
      </form>

      {/* ── Suggestion Pills ── */}
      <div className="animate-fade-up delay-500 mt-5 flex flex-wrap justify-center gap-2.5">
        <span className="text-xs text-slate-500 self-center mr-1">Try:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            id={`suggestion-${s.toLowerCase().replace(/\s+/g, "-")}`}
            type="button"
            onClick={() => navigateToSearch(s)}
            className="text-xs px-3.5 py-1.5 rounded-full glass-card border border-white/[0.08] text-slate-400 hover:text-white hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 transition-all duration-200 cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>

      {/* ── Social Proof / Tech Strip ── */}
      <div className="animate-fade-up delay-600 mt-10 flex flex-col items-center gap-2 text-xs text-slate-500">
        <span className="uppercase tracking-widest text-[10px] font-semibold text-slate-600">Powered by</span>
        <p className="flex flex-wrap justify-center gap-1.5 sm:gap-3 px-4 leading-relaxed max-w-2xl">
          <span>Elasticsearch</span> &bull; <span>Hybrid Search</span> &bull; <span>BM25</span> &bull; <span>Dense Vectors</span> &bull; <span>Reciprocal Rank Fusion</span> &bull; <span>Gemini</span> &bull; <span>Groq</span> &bull; <span>FastAPI</span> &bull; <span>Next.js</span>
        </p>
      </div>

      {/* ── Scroll cue ── */}
      <div className="animate-fade-up delay-700 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
        <span className="text-[10px] uppercase tracking-widest text-slate-400">
          Scroll
        </span>
        <svg
          className="w-4 h-4 text-slate-400 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

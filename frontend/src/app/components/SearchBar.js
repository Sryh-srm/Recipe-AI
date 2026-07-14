"use client";

import { useState, useRef, useEffect, useId } from "react";
import { useAutocomplete } from "@/hooks/useAutocomplete";

const SEARCH_MODES = [
  {
    id: "hybrid",
    label: "Hybrid",
    description: "BM25 + Vector (best results)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: "vector",
    label: "Semantic",
    description: "Vector similarity search",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
      </svg>
    ),
  },
  {
    id: "keyword",
    label: "Keyword",
    description: "BM25 fuzzy keyword search",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75H10a.75.75 0 010 1.5H2.75A.75.75 0 012 15.25z" clipRule="evenodd" />
      </svg>
    ),
  },
];

/**
 * Search bar with:
 * - Debounced autocomplete dropdown
 * - Search mode toggle (Hybrid / Vector / Keyword)
 * - Keyboard navigation for suggestions
 *
 * @param {{ searchMode: string, onModeChange: (m:string)=>void, onSearch: (q:string)=>void, isLoading: boolean }} props
 */
export default function SearchBar({ searchMode, onModeChange, onSearch, isLoading }) {
  const [inputValue, setInputValue]     = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex]   = useState(-1);
  const inputRef    = useRef(null);
  const dropdownRef = useRef(null);
  const listboxId   = useId();

  const { suggestions, isLoading: acLoading, clearSuggestions } = useAutocomplete(inputValue);

  const hasSuggestions = suggestions.length > 0 && showDropdown;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (
        !inputRef.current?.contains(e.target) &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSubmit(e) {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    setShowDropdown(false);
    clearSuggestions();
    setActiveIndex(-1);
    onSearch(inputValue.trim());
  }

  function selectSuggestion(value) {
    setInputValue(value);
    setShowDropdown(false);
    clearSuggestions();
    setActiveIndex(-1);
    onSearch(value);
  }

  function handleKeyDown(e) {
    if (!hasSuggestions) {
      if (e.key === "Enter") handleSubmit();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) selectSuggestion(suggestions[activeIndex]);
      else handleSubmit();
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div className="w-full space-y-3">
      {/* ── Mode selector ── */}
      <div
        className="flex items-center gap-2 p-1 rounded-xl glass-card border border-white/[0.07] w-fit mx-auto"
        role="group"
        aria-label="Search mode"
      >
        {SEARCH_MODES.map((mode) => {
          const active = searchMode === mode.id;
          return (
            <button
              key={mode.id}
              id={`mode-btn-${mode.id}`}
              type="button"
              onClick={() => onModeChange(mode.id)}
              aria-pressed={active}
              title={mode.description}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {mode.icon}
              {mode.label}
            </button>
          );
        })}
      </div>

      {/* ── Search input ── */}
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Recipe search"
        className="relative"
      >
        <div className="relative flex items-center glass-card gradient-border rounded-2xl shadow-2xl shadow-black/40 overflow-visible">
          {/* Search icon */}
          <div className="pl-5 pr-3 flex-shrink-0 pointer-events-none">
            {acLoading ? (
              <svg className="w-5 h-5 text-orange-400 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            )}
          </div>

          <input
            ref={inputRef}
            id="search-input"
            type="search"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowDropdown(true);
              setActiveIndex(-1);
            }}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            onKeyDown={handleKeyDown}
            placeholder='Try "creamy pasta", "high-protein vegan bowl"…'
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls={hasSuggestions ? listboxId : undefined}
            aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
            className="flex-1 py-4 pr-4 bg-transparent text-white placeholder-slate-500 text-base outline-none"
          />

          <button
            id="search-submit-btn"
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            aria-label="Search recipes"
            className="btn-glow m-1.5 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-200 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Searching…
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>

        {/* ── Autocomplete dropdown ── */}
        {hasSuggestions && (
          <ul
            id={listboxId}
            ref={dropdownRef}
            role="listbox"
            aria-label="Autocomplete suggestions"
            className="absolute top-full left-0 right-0 mt-2 z-50 glass-card border border-white/[0.1] rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {suggestions.map((s, i) => (
              <li
                key={s}
                id={`suggestion-${i}`}
                role="option"
                aria-selected={activeIndex === i}
                onMouseDown={(e) => { e.preventDefault(); selectSuggestion(s); }}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex items-center gap-3 px-5 py-3 text-sm cursor-pointer transition-colors duration-150 ${
                  activeIndex === i
                    ? "bg-orange-500/10 text-white"
                    : "text-slate-300 hover:bg-white/[0.04]"
                }`}
              >
                <svg className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

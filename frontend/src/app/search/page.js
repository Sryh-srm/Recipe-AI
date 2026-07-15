"use client";

import { useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SearchBar from "@/app/components/SearchBar";
import RecipeCard from "@/app/components/RecipeCard";
import {
  SearchLoadingState,
  SearchErrorState,
  SearchEmptyState,
  SearchInitialState,
} from "@/app/components/SearchStates";
import { useRecipeSearch } from "@/hooks/useRecipeSearch";

// Mode label mapping for the results header
const MODE_LABELS = {
  hybrid:  "Hybrid Search",
  vector:  "Semantic Search",
  keyword: "Keyword Search",
};

const MODE_DESCRIPTIONS = {
  hybrid:  "BM25 + Vector (Reciprocal Rank Fusion)",
  vector:  "Dense embedding similarity",
  keyword: "BM25 fuzzy multi-field matching",
};

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageInner />
    </Suspense>
  );
}

function SearchPageInner() {
  const searchParams = useSearchParams();
  const {
    results,
    isLoading,
    error,
    hasSearched,
    lastQuery,
    searchMode,
    setSearchMode,
    search,
    reset,
  } = useRecipeSearch();

  // Auto-search from URL query param (?q=...)
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) search(q, { mode: "hybrid" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback(
    (query) => search(query, { mode: searchMode }),
    [search, searchMode]
  );

  const handleModeChange = useCallback(
    (mode) => {
      setSearchMode(mode);
      // Re-run if there's already a query
      if (lastQuery) search(lastQuery, { mode });
    },
    [setSearchMode, lastQuery, search]
  );

  const handleRetry = useCallback(
    () => search(lastQuery, { mode: searchMode }),
    [search, lastQuery, searchMode]
  );

  return (
    <>
      {/* Ambient orbs */}
      <div aria-hidden="true">
        <div className="orb orb-purple-primary" style={{ opacity: 0.3 }} />
        <div className="orb orb-purple-secondary"   style={{ opacity: 0.2 }} />
      </div>

      <Navbar />

      <main id="main-content" className="relative z-10 flex-1 flex flex-col">
        {/* ── Page Header ── */}
        <section className="pt-24 sm:pt-28 pb-8 sm:pb-10 px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            Find your next{" "}
            <span className="gradient-text">recipe</span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Search across thousands of recipes using keyword, semantic, or
            hybrid AI-powered search.
          </p>
        </section>

        {/* ── Search Bar ── */}
        <section className="px-4 sm:px-6 pb-4 max-w-3xl mx-auto w-full" aria-label="Recipe search controls">
          <SearchBar
            searchMode={searchMode}
            onModeChange={handleModeChange}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </section>

        {/* ── Results area ── */}
        <section className="flex-1 px-4 sm:px-6 pb-12 sm:pb-16 max-w-7xl mx-auto w-full">
          {/* Results header */}
          {hasSearched && !isLoading && !error && results.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div>
                <p className="text-white font-semibold">
                  {results.length} recipe{results.length !== 1 ? "s" : ""} for{" "}
                  <span className="gradient-text">&ldquo;{lastQuery}&rdquo;</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {MODE_LABELS[searchMode]} · {MODE_DESCRIPTIONS[searchMode]}
                </p>
              </div>
              <button
                id="clear-results-btn"
                onClick={reset}
                className="self-start sm:self-auto text-xs text-slate-500 hover:text-white border border-white/[0.07] hover:border-white/20 px-3 py-1.5 rounded-full transition-all duration-200"
                aria-label="Clear search results"
              >
                Clear results
              </button>
            </div>
          )}

          {/* State rendering */}
          {isLoading ? (
            <SearchLoadingState count={6} />
          ) : error ? (
            <SearchErrorState message={error} onRetry={lastQuery ? handleRetry : undefined} />
          ) : hasSearched && results.length === 0 ? (
            <SearchEmptyState query={lastQuery} />
          ) : !hasSearched ? (
            <SearchInitialState />
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
              role="list"
              aria-label="Recipe search results"
            >
              {results.map((recipe, idx) => (
                <div 
                  key={`${recipe.recipe_name}-${idx}`} 
                  role="listitem"
                  className="animate-fade-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <RecipeCard
                    recipe={recipe}
                    highlightMode={searchMode === "keyword"}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

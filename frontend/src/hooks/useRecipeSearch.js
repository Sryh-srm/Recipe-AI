"use client";

import { useState, useCallback, useRef } from "react";
import { keywordSearch, vectorSearch, hybridSearch } from "@/lib/api";

/** @typedef {"keyword" | "vector" | "hybrid"} SearchMode */

const SEARCH_FNS = {
  keyword: keywordSearch,
  vector:  vectorSearch,
  hybrid:  hybridSearch,
};

/**
 * Manages search state: mode, results, loading, error.
 * Cancels in-flight requests when a new search is triggered.
 */
export function useRecipeSearch() {
  const [results, setResults]   = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]       = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery]     = useState("");
  const [searchMode, setSearchMode]   = useState(/** @type {SearchMode} */ ("hybrid"));
  const abortRef = useRef(null);

  const search = useCallback(
    async (query, { mode = searchMode, cuisine, rating, size = 10 } = {}) => {
      if (!query?.trim()) return;

      // Cancel in-flight
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsLoading(true);
      setError(null);
      setHasSearched(true);
      setLastQuery(query.trim());

      try {
        const fn = SEARCH_FNS[mode] ?? SEARCH_FNS.hybrid;
        const data = await fn({ query: query.trim(), cuisine, rating, size });
        if (!controller.signal.aborted) {
          setResults(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err?.message ?? "An unexpected error occurred.");
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    },
    [searchMode]
  );

  const reset = useCallback(() => {
    if (abortRef.current) abortRef.current.abort();
    setResults([]);
    setError(null);
    setHasSearched(false);
    setLastQuery("");
    setIsLoading(false);
  }, []);

  return {
    results,
    isLoading,
    error,
    hasSearched,
    lastQuery,
    searchMode,
    setSearchMode,
    search,
    reset,
  };
}

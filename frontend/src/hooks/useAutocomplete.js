"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getAutocomplete } from "@/lib/api";

/**
 * Debounced autocomplete hook.
 * Returns { suggestions, isLoading } for a given query string.
 *
 * @param {string} query - raw input value
 * @param {number} [delay=300] - debounce delay in ms
 */
export function useAutocomplete(query, delay = 300) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Clear previous timer
    clearTimeout(timerRef.current);

    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    timerRef.current = setTimeout(async () => {
      // Cancel any in-flight request
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const results = await getAutocomplete(query.trim());
        if (!controller.signal.aborted) {
          setSuggestions(Array.isArray(results) ? results : []);
        }
      } catch {
        if (!controller.signal.aborted) setSuggestions([]);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [query, delay]);

  const clearSuggestions = useCallback(() => setSuggestions([]), []);

  return { suggestions, isLoading, clearSuggestions };
}

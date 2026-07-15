/** Skeleton shimmer card shown while search results are loading */
export function RecipeCardSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-pulse" aria-hidden="true">
      {/* Image placeholder */}
      <div className="h-44 bg-white/[0.04]" />
      <div className="p-5 flex flex-col gap-3">
        {/* Title */}
        <div className="h-4 bg-white/[0.06] rounded-full w-3/4" />
        <div className="h-3 bg-white/[0.04] rounded-full w-1/2" />
        {/* Meta */}
        <div className="flex gap-2">
          <div className="h-3 bg-white/[0.04] rounded-full w-16" />
          <div className="h-3 bg-white/[0.04] rounded-full w-12" />
        </div>
        {/* Pills */}
        <div className="flex flex-wrap gap-1.5">
          {[60, 80, 50, 70].map((w) => (
            <div key={w} className="h-5 bg-white/[0.04] rounded-full" style={{ width: `${w}px` }} />
          ))}
        </div>
        {/* Footer */}
        <div className="mt-2 pt-3 border-t border-white/[0.04] h-3 bg-white/[0.04] rounded-full w-20" />
      </div>
    </div>
  );
}

/** Grid of skeleton cards */
export function SearchLoadingState({ count = 6 }) {
  return (
    <section aria-live="polite" aria-busy="true" aria-label="Loading recipes">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: count }, (_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

/**
 * Error state with optional retry callback
 * @param {{ message: string, onRetry?: ()=>void }} props
 */
export function SearchErrorState({ message, onRetry }) {
  return (
    <section
      className="flex flex-col items-center justify-center py-24 text-center"
      aria-live="assertive"
      aria-label="Search error"
    >
      <div className="mb-5 flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20">
        <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-white mb-2">Something went wrong</h2>
      <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-6">
        {message || "We couldn't connect to the backend. Make sure the API server is running on port 8000."}
      </p>
      {onRetry && (
        <button
          id="error-retry-btn"
          onClick={onRetry}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white text-sm font-semibold hover:scale-105 transition-transform duration-200"
        >
          Try again
        </button>
      )}
    </section>
  );
}

/**
 * Empty results state
 * @param {{ query: string }} props
 */
export function SearchEmptyState({ query }) {
  return (
    <section
      className="flex flex-col items-center justify-center py-24 text-center"
      aria-live="polite"
      aria-label="No results found"
    >
      <div className="mb-5 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.07]">
        <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-white mb-2">No recipes found</h2>
      <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
        We couldn&apos;t find any recipes matching{" "}
        <span className="text-white font-medium">&ldquo;{query}&rdquo;</span>.
        Try different keywords or switch to Hybrid or Semantic search.
      </p>
    </section>
  );
}

/**
 * Initial prompt state (before first search)
 */
export function SearchInitialState() {
  return (
    <section
      className="flex flex-col items-center justify-center py-24 text-center"
      aria-label="Search prompt"
    >
      <div className="mb-5 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#8B5CF6]/20 border border-[#7C3AED]/20">
        <svg className="w-8 h-8 text-[#A855F7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-white mb-2">Search for a recipe</h2>
      <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
        Type anything — ingredients, dish names, cuisines, or describe what you&apos;re
        craving. Our AI will find the best matches.
      </p>
    </section>
  );
}

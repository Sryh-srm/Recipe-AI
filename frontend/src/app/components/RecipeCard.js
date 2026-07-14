/**
 * RecipeCard — renders a single recipe from the API response.
 *
 * Handles all optional fields gracefully (img_src, rating, highlights, etc.)
 *
 * @param {{ recipe: import('@/lib/api').Recipe, highlightMode?: boolean }} props
 */
export default function RecipeCard({ recipe, highlightMode = false }) {
  const {
    recipe_name,
    cuisine_path,
    rating,
    prep_time,
    cook_time,
    total_time,
    servings,
    ingredients,
    img_src,
    url,
    score,
    highlight,
  } = recipe;

  // Format rating stars (out of 5)
  const ratingNum  = parseFloat(rating) || 0;
  const fullStars  = Math.floor(ratingNum);
  const hasHalf    = ratingNum - fullStars >= 0.5;

  // Truncate long ingredient strings
  const ingredientPreview = ingredients
    ? ingredients.split(/[,;]/).slice(0, 6).map((s) => s.trim()).filter(Boolean)
    : [];

  // Pick the first highlighted snippet or truncated ingredient text
  const highlightSnippet =
    highlight?.ingredients?.[0] ||
    highlight?.directions?.[0] ||
    null;

  return (
    <article
      className="group relative glass-card rounded-2xl overflow-hidden flex flex-col
                 hover:border-white/[0.14] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50
                 transition-all duration-300"
      aria-label={`Recipe: ${recipe_name}`}
    >
      {/* ── Image / placeholder ── */}
      <div className="relative h-44 flex-shrink-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10 overflow-hidden">
        {img_src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img_src}
            alt={recipe_name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        {/* Fallback icon — shown when no image or image fails to load */}
        <div
          className={`absolute inset-0 flex items-center justify-center ${img_src ? "hidden" : "flex"}`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 64 64" fill="none" className="w-20 h-20 opacity-20">
            <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8z" fill="url(#ci)" />
            <path d="M22 28c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z" fill="white" opacity=".3" />
            <path d="M26 44h12v4H26z" fill="white" opacity=".3" />
            <defs>
              <linearGradient id="ci" x1="8" y1="8" x2="56" y2="56">
                <stop stopColor="#f97316" /><stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Score badge */}
        {score != null && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-bold text-orange-300 border border-orange-500/20">
            {score.toFixed(2)}
          </div>
        )}

        {/* Cuisine pill */}
        {cuisine_path && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-medium text-slate-200 border border-white/10 truncate max-w-[60%]">
            {cuisine_path.split(">").pop()?.trim() || cuisine_path}
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 gap-3 p-5">
        {/* Title */}
        <h3
          className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-orange-300 transition-colors duration-200"
          title={recipe_name}
        >
          {recipe_name}
        </h3>

        {/* Rating */}
        {ratingNum > 0 && (
          <div className="flex items-center gap-1.5" aria-label={`Rating: ${ratingNum} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => {
              const filled = i < fullStars;
              const half   = !filled && i === fullStars && hasHalf;
              return (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${filled || half ? "text-orange-400" : "text-slate-600"}`}
                  fill={filled ? "currentColor" : half ? "url(#half)" : "none"}
                  stroke="currentColor"
                  strokeWidth={filled || half ? 0 : 1.5}
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  {half && (
                    <defs>
                      <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  )}
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              );
            })}
            <span className="text-xs text-slate-400 ml-0.5">{ratingNum.toFixed(1)}</span>
          </div>
        )}

        {/* Meta row: time + servings */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          {(prep_time || cook_time || total_time) && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
              </svg>
              {total_time || cook_time || prep_time}
            </span>
          )}
          {servings && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
              </svg>
              {servings}
            </span>
          )}
        </div>

        {/* Highlight snippet (from keyword search) */}
        {highlightMode && highlightSnippet ? (
          <p
            className="text-xs text-slate-400 leading-relaxed line-clamp-3 [&_em]:text-orange-300 [&_em]:not-italic [&_em]:font-semibold"
            dangerouslySetInnerHTML={{ __html: highlightSnippet }}
          />
        ) : ingredientPreview.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {ingredientPreview.map((ing) => (
              <span
                key={ing}
                className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-slate-400 truncate max-w-[140px]"
              >
                {ing}
              </span>
            ))}
            {ingredients.split(/[,;]/).length > 6 && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-slate-500">
                +{ingredients.split(/[,;]/).length - 6} more
              </span>
            )}
          </div>
        ) : null}

        {/* Footer: View Recipe link */}
        <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-center justify-between">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              id={`recipe-link-${encodeURIComponent(recipe_name)}`}
              className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition-colors duration-200"
              aria-label={`View full recipe for ${recipe_name}`}
            >
              View recipe
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 010-1.06L9.44 5.5H5.75a.75.75 0 010-1.5h5.5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0V6.56l-5.22 5.22a.75.75 0 01-1.06 0z" clipRule="evenodd" />
              </svg>
            </a>
          ) : (
            <span className="text-xs text-slate-600">No link available</span>
          )}
        </div>
      </div>

      {/* Hover glow underline */}
      <div
        className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-2xl bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />
    </article>
  );
}

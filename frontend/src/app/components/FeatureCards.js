const FEATURES = [
  {
    id: "feature-semantic-search",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="url(#g1)" strokeWidth="2" />
        <path d="M16.5 16.5L21 21" stroke="url(#g1)" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 11h6M11 8v6" stroke="url(#g1)" strokeWidth="1.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f97316" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "Semantic Search",
    description: `Our embedding engine understands the meaning behind your query — so searching "light summer dinner" finds exactly that, not just keyword matches.`,
    badge: "Core Feature",
    badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    highlights: ["Vector embeddings", "Natural language", "Instant results"],
    href: "/search",
  },
  {
    id: "feature-ai-assistant",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <rect x="3" y="6" width="18" height="13" rx="3" stroke="url(#g2)" strokeWidth="2" />
        <path d="M8 10h8M8 14h5" stroke="url(#g2)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 6V4.5A1.5 1.5 0 0 1 8.5 3h7A1.5 1.5 0 0 1 17 4.5V6" stroke="url(#g2)" strokeWidth="1.5" />
        <defs>
          <linearGradient id="g2" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "AI Recipe Assistant",
    description:
      "Ask follow-up questions, request substitutions, scale servings, or get step-by-step guidance — your personal sous-chef is always one message away.",
    badge: "Powered by LLM",
    badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    highlights: ["Ingredient swaps", "Serving scaler", "Step guidance"],
    href: "/assistant",
  },
  {
    id: "feature-recommendations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 12 5.09 5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          stroke="url(#g3)"
          strokeWidth="2"
          fill="none"
        />
        <path d="M8 10l2.5 2.5L16 8" stroke="url(#g3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="g3" x1="2" y1="5" x2="22" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f97316" />
            <stop offset="1" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "Personalized Recommendations",
    description:
      "The more you cook, the smarter it gets. Recipe AI learns your dietary preferences, favourite cuisines, and cooking style to surface meals you'll love.",
    badge: "Adaptive AI",
    badgeColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    highlights: ["Dietary filters", "Taste profile", "Weekly suggestions"],
    href: "/search",
  },
];

export default function FeatureCards() {
  return (
    <section
      id="features"
      className="relative z-10 py-24 px-6"
      aria-labelledby="features-heading"
    >
      {/* Section header */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-400 mb-3">
          What we offer
        </p>
        <h2
          id="features-heading"
          className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight"
        >
          Everything you need to{" "}
          <span className="gradient-text">cook confidently</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
          Three powerful capabilities working together to make every meal
          discovery effortless and enjoyable.
        </p>
      </div>

      {/* Cards grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((feature, idx) => (
          <article
            key={feature.id}
            id={feature.id}
            className="group relative glass-card rounded-2xl p-7 flex flex-col gap-5 cursor-default
                       hover:border-white/[0.14] hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40
                       transition-all duration-300"
            style={{ animationDelay: `${(idx + 1) * 120}ms` }}
            aria-labelledby={`${feature.id}-title`}
          >
            {/* Top row: icon + badge */}
            <div className="flex items-start justify-between">
              {/* Icon container */}
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/[0.05] border border-white/[0.07] group-hover:bg-white/[0.08] transition-colors duration-300">
                {feature.icon}
              </div>
              {/* Badge */}
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full border ${feature.badgeColor}`}
              >
                {feature.badge}
              </span>
            </div>

            {/* Title */}
            <h3
              id={`${feature.id}-title`}
              className="text-xl font-bold text-white transition-all duration-300"
            >
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-400 leading-relaxed flex-1">
              {feature.description}
            </p>

            {/* Highlight pills */}
            <ul className="flex flex-wrap gap-2" aria-label={`${feature.title} highlights`}>
              {feature.highlights.map((h) => (
                <li
                  key={h}
                  className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-slate-400"
                >
                  {h}
                </li>
              ))}
            </ul>

            {/* Learn more link */}
            <a
              href={feature.href}
              id={`${feature.id}-learn-more`}
              className="text-sm font-medium text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition-colors duration-200 group/link"
              aria-label={`Learn more about ${feature.title}`}
            >
              {feature.id === "feature-ai-assistant" ? "Try it now" : "Learn more"}
              <svg
                className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform duration-200"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06L7.28 12.78a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06z" />
              </svg>
            </a>

            {/* Hover gradient glow underline */}
            <div
              className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-2xl bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
          </article>
        ))}
      </div>
    </section>
  );
}

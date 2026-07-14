/**
 * ChatSuggestions — horizontal row of example prompt chips.
 *
 * Shown in the empty state before first message and collapsed once chat starts.
 * Each chip fires onSelect(text) which is wired to sendMessage in the page.
 *
 * @param {{ onSelect: (text: string) => void }} props
 */

const SUGGESTIONS = [
  {
    icon: "🍗",
    label: "I have chicken and rice",
    prompt: "I have chicken and rice. What can I cook?",
  },
  {
    icon: "💪",
    label: "High-protein breakfast",
    prompt: "Suggest a high-protein breakfast recipe.",
  },
  {
    icon: "⏱️",
    label: "Under 20 minutes",
    prompt: "What can I cook in under 20 minutes?",
  },
  {
    icon: "🥗",
    label: "Healthy vegetarian",
    prompt: "Give me a healthy vegetarian dinner idea.",
  },
  {
    icon: "🍝",
    label: "Comforting pasta",
    prompt: "I want something creamy and comforting with pasta.",
  },
  {
    icon: "🎂",
    label: "Easy dessert",
    prompt: "What's an easy dessert I can make at home?",
  },
];

export default function ChatSuggestions({ onSelect }) {
  return (
    <section aria-label="Example prompts" className="w-full px-4 pb-2">
      <p className="text-xs text-slate-500 text-center mb-3 uppercase tracking-widest font-medium">
        Try asking…
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            id={`suggestion-chip-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
            type="button"
            onClick={() => onSelect(s.prompt)}
            className="chip-shimmer glass-card rounded-xl px-4 py-3 text-left border border-white/[0.07]
                       hover:border-orange-500/30 transition-all duration-200 group"
            aria-label={`Ask: ${s.prompt}`}
          >
            <span className="text-lg leading-none block mb-1.5">{s.icon}</span>
            <span className="text-xs text-slate-400 group-hover:text-white transition-colors duration-200 leading-snug line-clamp-2">
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

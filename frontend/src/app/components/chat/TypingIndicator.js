/**
 * TypingIndicator — animated three-dot bounce shown while the AI is thinking.
 * Visually matches the AI bubble style so it feels like a real in-progress message.
 */
export default function TypingIndicator() {
  return (
    <div
      className="flex items-end gap-3 msg-ai"
      role="status"
      aria-label="AI is typing"
      aria-live="polite"
    >
      {/* AI Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg shadow-orange-500/30 ai-avatar-pulse">
        <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4" aria-hidden="true">
          <path d="M10 2C6.13 2 3 5.13 3 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26C15.81 13.47 17 11.38 17 9c0-3.87-3.13-7-7-7z" />
        </svg>
      </div>

      {/* Bubble */}
      <div className="glass-card rounded-2xl rounded-bl-sm px-5 py-3.5 flex items-center gap-1.5 text-orange-400">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="sr-only">AI is generating a response…</span>
      </div>
    </div>
  );
}

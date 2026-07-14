/**
 * ChatInput — textarea + send button docked at the bottom of the chat.
 *
 * Features:
 * - Auto-growing textarea (up to 6 lines)
 * - Submit on Enter, newline on Shift+Enter
 * - Disabled + spinner while AI is loading
 * - Character count hint when over 200 chars
 *
 * @param {{ onSend: (text:string)=>void, isLoading: boolean }} props
 */

"use client";

import { useState, useRef, useEffect } from "react";

const MAX_CHARS = 500;

export default function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  function handleSubmit(e) {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isLoading || trimmed.length > MAX_CHARS) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const charCount  = value.length;
  const overLimit  = charCount > MAX_CHARS;
  const canSubmit  = value.trim().length > 0 && !isLoading && !overLimit;

  return (
    <div className="border-t border-white/[0.06] bg-[#0d0f14]/80 backdrop-blur-lg px-4 py-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto"
        role="form"
        aria-label="Chat input"
      >
        {/* Input wrapper */}
        <div
          className={`relative flex items-end gap-3 glass-card rounded-2xl px-4 py-3 transition-all duration-200
            ${overLimit ? "border-red-500/40" : "gradient-border focus-within:shadow-lg focus-within:shadow-orange-500/10"}`}
        >
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            id="chat-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything — ingredients, cravings, time constraints…"
            rows={1}
            disabled={isLoading}
            maxLength={MAX_CHARS + 20}
            aria-label="Chat message input"
            aria-describedby="chat-input-hint"
            className="flex-1 resize-none bg-transparent text-white text-sm placeholder-slate-500 outline-none leading-relaxed disabled:opacity-50 min-h-[24px] max-h-[160px] py-0.5"
          />

          {/* Send button */}
          <button
            id="chat-send-btn"
            type="submit"
            disabled={!canSubmit}
            aria-label="Send message"
            className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 self-end
              ${canSubmit
                ? "bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-md shadow-orange-500/30 hover:scale-110 hover:shadow-orange-500/50"
                : "bg-white/[0.06] text-slate-600 cursor-not-allowed"
              }`}
          >
            {isLoading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
            )}
          </button>
        </div>

        {/* Footer hints */}
        <div
          id="chat-input-hint"
          className="flex items-center justify-between mt-2 px-1"
        >
          <p className="text-[11px] text-slate-600">
            <kbd className="font-mono">Enter</kbd> to send ·{" "}
            <kbd className="font-mono">Shift+Enter</kbd> for new line
          </p>
          {charCount > 200 && (
            <p className={`text-[11px] tabular-nums ${overLimit ? "text-red-400" : "text-slate-500"}`}>
              {charCount}/{MAX_CHARS}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

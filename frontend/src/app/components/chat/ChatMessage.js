/**
 * ChatMessage — renders a single message bubble.
 *
 * User messages:  right-aligned, gradient background
 * AI messages:    left-aligned, glass card, markdown-rendered content,
 *                 collapsible source recipes panel, provider/model badge
 * Error messages: left-aligned, red-tinted error state with retry
 *
 * We render AI markdown ourselves (no external lib dependency) using a
 * lightweight regex-based converter that handles the subset produced by Gemini/Groq:
 * **bold**, *italic*, # headings, - lists, 1. numbered lists, `code`, ---
 *
 * @param {{ message: object, onRetry?: ()=>void }} props
 */

"use client";

import { useState, memo } from "react";

// ─── Lightweight markdown → HTML ─────────────────────────────────────────────
function markdownToHtml(md) {
  if (!md) return "";
  let html = md
    // Escape raw HTML first (safety)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Headings
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm,  "<h2>$1</h2>")
    .replace(/^# (.+)$/gm,   "<h1>$1</h1>")
    // Bold / italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g,     "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g,         "<em>$1</em>")
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Horizontal rule
    .replace(/^---+$/gm, "<hr />")
    // Numbered list items
    .replace(/^\d+\.\s+(.+)$/gm, "<li>$1</li>")
    // Bullet list items
    .replace(/^[-*]\s+(.+)$/gm, "<li>$1</li>");

  // Wrap consecutive <li> in <ul> or <ol> (simplistic, good enough for RAG output)
  html = html.replace(/(<li>.*<\/li>\n?)+/gs, (match) => {
    const isNumbered = /^\d/.test(match);
    return isNumbered ? `<ol>${match}</ol>` : `<ul>${match}</ul>`;
  });

  // Paragraphs: lines not already wrapped in a block tag
  const blockTags = /^<(h[123]|ul|ol|li|hr)/;
  const lines = html.split("\n");
  const out = [];
  let inPara = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inPara) { out.push("</p>"); inPara = false; }
      continue;
    }
    if (blockTags.test(trimmed)) {
      if (inPara) { out.push("</p>"); inPara = false; }
      out.push(trimmed);
    } else {
      if (!inPara) { out.push("<p>"); inPara = true; }
      else out.push(" ");
      out.push(trimmed);
    }
  }
  if (inPara) out.push("</p>");
  return out.join("");
}

// ─── Source Recipe mini card ──────────────────────────────────────────────────
function SourceRecipeCard({ recipe, index }) {
  const rating = parseFloat(recipe.rating) || 0;

  return (
    <a
      href={recipe.url || "#"}
      target={recipe.url ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="source-card flex items-start gap-3 no-underline group"
      id={`source-recipe-${index}`}
      aria-label={`Source recipe: ${recipe.recipe_name}`}
    >
      {/* Index badge */}
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center text-white text-[10px] font-bold shadow-sm mt-0.5">
        {index}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-200 leading-snug truncate group-hover:text-[#A855F7] transition-colors">
          {recipe.recipe_name}
        </p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          {recipe.cuisine_path && (
            <span className="text-[10px] text-slate-500 truncate max-w-[120px]">
              {recipe.cuisine_path.split(">").pop()?.trim()}
            </span>
          )}
          {recipe.total_time && (
            <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
              </svg>
              {recipe.total_time}
            </span>
          )}
          {rating > 0 && (
            <span className="text-[10px] text-[#A855F7] flex items-center gap-0.5">
              <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      {recipe.url && (
        <svg className="flex-shrink-0 w-3 h-3 text-slate-600 group-hover:text-[#A855F7] transition-colors mt-1" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 010-1.06L9.44 5.5H5.75a.75.75 0 010-1.5h5.5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0V6.56l-5.22 5.22a.75.75 0 01-1.06 0z" clipRule="evenodd" />
        </svg>
      )}
    </a>
  );
}

// ─── Main ChatMessage component ───────────────────────────────────────────────
const ChatMessage = memo(function ChatMessage({ message, onRetry }) {
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const isUser      = message.role === "user";
  const isError     = Boolean(message.error);
  const hasContent  = Boolean(message.content);
  const hasSources  = message.meta?.retrieved_recipes?.length > 0;
  const htmlContent = hasContent ? markdownToHtml(message.content) : "";

  // ── User bubble ──────────────────────────────────────────────────────────
  if (isUser) {
    return (
      <div className="flex items-end justify-end gap-2 sm:gap-3 msg-user" role="listitem">
        <div className="max-w-[88%] sm:max-w-[75%] flex flex-col items-end gap-1">
          <div
            className="bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-lg shadow-[#7C3AED]/20"
            aria-label={`You said: ${message.content}`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>
          <span className="text-[10px] text-slate-600 pr-1">{message.ts}</span>
        </div>

        {/* User avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center self-end" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-300">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    );
  }

  // ── Error bubble ─────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="flex items-end gap-2 sm:gap-3 msg-ai" role="listitem">
        {/* AI avatar – error state */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center self-end" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-400">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>

        <div className="max-w-[88%] sm:max-w-[65%] flex flex-col gap-1">
          <div className="glass-card border-red-500/20 rounded-2xl rounded-bl-sm px-4 py-3.5" role="alert" aria-live="assertive">
            <p className="text-sm font-semibold text-red-400 mb-1">Connection error</p>
            <p className="text-xs text-slate-400 leading-relaxed">{message.error}</p>
            {onRetry && (
              <button
                id={`retry-btn-${message.id}`}
                onClick={onRetry}
                className="mt-3 text-xs font-semibold text-[#A855F7] hover:text-[#8B5CF6] flex items-center gap-1.5 transition-colors"
              >
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                </svg>
                Try again
              </button>
            )}
          </div>
          <span className="text-[10px] text-slate-600 pl-1">{message.ts}</span>
        </div>
      </div>
    );
  }

  // ── AI assistant bubble ──────────────────────────────────────────────────
  return (
    <div className="flex items-end gap-2 sm:gap-3 msg-ai" role="listitem">
      {/* AI Avatar */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#7C3AED]/30 self-end"
        aria-hidden="true"
      >
        <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
          <path d="M10 2C6.13 2 3 5.13 3 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26C15.81 13.47 17 11.38 17 9c0-3.87-3.13-7-7-7z" />
        </svg>
      </div>

      <div className="max-w-[92%] sm:max-w-[85%] flex flex-col gap-1.5 min-w-0">
        {/* Main bubble */}
        <div className="glass-card rounded-2xl rounded-bl-sm overflow-hidden">
          {/* Provider badge */}
          {message.meta?.provider && (
            <div className="flex items-center justify-between px-3 sm:px-4 pt-2.5 sm:pt-3 pb-2 border-b border-white/[0.05]">
              <div className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-green-400 shadow-sm shadow-green-400/50" aria-hidden="true" />
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                  Recipe AI · {message.meta.provider}
                  {message.meta.model ? ` / ${message.meta.model.split("-").slice(0, 2).join("-")}` : ""}
                </span>
              </div>
              {message.meta.recipe_count > 0 && (
                <span className="text-[10px] text-slate-600">
                  {message.meta.recipe_count} recipe{message.meta.recipe_count !== 1 ? "s" : ""} found
                </span>
              )}
            </div>
          )}

          {/* Markdown content */}
          <div
            className="prose-chat px-3 sm:px-4 py-3 sm:py-4 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            aria-label="AI response"
          />

          {/* Source recipes accordion */}
          {hasSources && (
            <div className="border-t border-white/[0.05]">
              <button
                id={`sources-toggle-${message.id}`}
                type="button"
                onClick={() => setSourcesOpen((o) => !o)}
                className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 text-xs font-medium text-slate-500 hover:text-white transition-colors duration-200 group"
                aria-expanded={sourcesOpen}
                aria-controls={`sources-panel-${message.id}`}
              >
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#A855F7]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75H10a.75.75 0 010 1.5H2.75A.75.75 0 012 15.25z" clipRule="evenodd" />
                  </svg>
                  {message.meta.recipe_count} source recipe{message.meta.recipe_count !== 1 ? "s" : ""} retrieved
                </span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${sourcesOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {sourcesOpen && (
                <div
                  id={`sources-panel-${message.id}`}
                  className="px-3 sm:px-4 pb-3 sm:pb-4 flex flex-col gap-2"
                  role="list"
                  aria-label="Source recipes"
                >
                  {message.meta.retrieved_recipes.map((recipe, i) => (
                    <SourceRecipeCard key={recipe.recipe_name + i} recipe={recipe} index={i + 1} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <span className="text-[10px] text-slate-600 pl-1">{message.ts}</span>
      </div>
    </div>
  );
});

export default ChatMessage;

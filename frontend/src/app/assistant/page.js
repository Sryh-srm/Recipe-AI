"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/app/components/Navbar";
import LogoIcon from "@/app/components/LogoIcon";
import ChatMessage from "@/app/components/chat/ChatMessage";
import ChatInput from "@/app/components/chat/ChatInput";
import ChatSuggestions from "@/app/components/chat/ChatSuggestions";
import TypingIndicator from "@/app/components/chat/TypingIndicator";
import { useChat } from "@/hooks/useChat";
import "./chat.css";

// ─── Empty / Welcome screen ────────────────────────────────────────────────────
function WelcomeScreen({ onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 pt-16 pb-6 gap-8 text-center">
      {/* Hero icon */}
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center shadow-2xl shadow-[#7C3AED]/30">
          <LogoIcon className="w-10 h-10" />
        </div>
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] opacity-20 blur-xl scale-150" aria-hidden="true" />
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Recipe <span className="gradient-text">Assistant</span>
        </h1>
        <p className="text-slate-400 text-base max-w-md leading-relaxed">
          Tell me what ingredients you have, what you&apos;re craving, or any
          dietary needs — I&apos;ll find the perfect recipe for you.
        </p>
      </div>

      {/* Capability pills */}
      <div className="flex flex-wrap justify-center gap-2.5">
        {[
          { icon: "🔍", text: "Semantic search" },
          { icon: "🤖", text: "Gemini / Groq AI" },
          { icon: "📚", text: "Real recipe database" },
          { icon: "⚡", text: "Instant answers" },
        ].map(({ icon, text }) => (
          <span
            key={text}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full glass-card border border-white/[0.07] text-slate-400"
          >
            <span>{icon}</span>
            {text}
          </span>
        ))}
      </div>

      {/* Suggestions */}
      <div className="w-full max-w-2xl">
        <ChatSuggestions onSelect={onSelect} />
      </div>
    </div>
  );
}

// ─── Main assistant page ───────────────────────────────────────────────────────
export default function AssistantPage() {
  const { messages, isLoading, sendMessage, clearChat, retryLast } = useChat();
  const bottomRef = useRef(null);
  const hasMessages = messages.length > 0;

  // Auto-scroll to newest message
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isLoading]);

  return (
    <>
      {/* Ambient orbs — subtle for chat context */}
      <div aria-hidden="true">
        <div className="orb orb-purple-primary" style={{ opacity: 0.18 }} />
        <div className="orb orb-purple-secondary"   style={{ opacity: 0.12 }} />
      </div>

      <Navbar />

      {/* Full-height chat shell */}
      <div className="relative z-10 flex flex-col h-screen pt-[64px]">

        {/* ── Top bar (only when chat has started) ── */}
        {hasMessages && (
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.06] bg-[#0d0f14]/70 backdrop-blur-md flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2 w-2 rounded-full bg-green-400 shadow-sm shadow-green-400/60" aria-hidden="true" />
              <span className="text-xs font-medium text-slate-400">
                AI Recipe Assistant
              </span>
              <span className="text-[10px] text-slate-600">·</span>
              <span className="text-[10px] text-slate-600">
                {messages.filter((m) => m.role === "user").length} message{messages.filter((m) => m.role === "user").length !== 1 ? "s" : ""}
              </span>
            </div>
            <button
              id="clear-chat-btn"
              onClick={clearChat}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white border border-white/[0.06] hover:border-white/20 px-3 py-1.5 rounded-full transition-all duration-200"
              aria-label="Clear chat history"
            >
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
              </svg>
              Clear chat
            </button>
          </div>
        )}

        {/* ── Message list ── */}
        <main
          id="chat-messages"
          className="flex-1 overflow-y-auto"
          aria-label="Chat conversation"
          aria-live="polite"
        >
          {!hasMessages ? (
            <WelcomeScreen onSelect={sendMessage} />
          ) : (
            <div className="max-w-4xl mx-auto w-full px-4 py-6 flex flex-col gap-5">
              {/* Render all messages */}
              <ol className="flex flex-col gap-5 list-none p-0 m-0" aria-label="Chat messages">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    onRetry={msg.error ? retryLast : undefined}
                  />
                ))}
              </ol>

              {/* Typing indicator */}
              {isLoading && (
                <div className="pl-11">
                  <TypingIndicator />
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={bottomRef} aria-hidden="true" />
            </div>
          )}
        </main>

        {/* ── Chat input docked at bottom ── */}
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </div>
    </>
  );
}

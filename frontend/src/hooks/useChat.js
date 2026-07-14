/**
 * Chat state manager hook.
 *
 * Maintains the message thread and calls GET /rag for each user message.
 * Exposes abort-safe loading, per-message error, and a clear function.
 *
 * Message shape:
 *   { id, role: "user"|"assistant", content, meta?, error?, ts }
 *
 * Assistant message meta: { provider, model, recipe_count, retrieved_recipes }
 */

"use client";

import { useState, useRef, useCallback } from "react";
import { getRagResponse } from "@/lib/api";

/** @returns {string} compact timestamp label */
function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

let _id = 0;
const uid = () => `msg-${++_id}`;

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(null);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text?.trim();
    if (!trimmed || isLoading) return;

    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    // Append user bubble immediately
    const userMsg = { id: uid(), role: "user", content: trimmed, ts: nowLabel() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const data = await getRagResponse(trimmed);

      if (controller.signal.aborted) return;

      const assistantMsg = {
        id:      uid(),
        role:    "assistant",
        content: data.recommendation ?? "No recommendation returned.",
        meta: {
          provider:          data.provider,
          model:             data.model,
          recipe_count:      data.recipe_count,
          retrieved_recipes: data.retrieved_recipes ?? [],
        },
        ts: nowLabel(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      if (controller.signal.aborted) return;

      const errorMsg = {
        id:      uid(),
        role:    "assistant",
        content: null,
        error:   err?.message ?? "Something went wrong. Is the backend running?",
        ts:      nowLabel(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
    }
  }, [isLoading]);

  const clearChat = useCallback(() => {
    if (abortRef.current) abortRef.current.abort();
    setMessages([]);
    setIsLoading(false);
  }, []);

  const retryLast = useCallback(() => {
    // Find last user message and re-send
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    // Remove from last user msg onwards (the user msg + the failed AI reply)
    setMessages((prev) => {
      const idx = prev.findIndex((m) => m.id === lastUser.id);
      return prev.slice(0, idx);
    });
    sendMessage(lastUser.content);
  }, [messages, sendMessage]);

  return { messages, isLoading, sendMessage, clearChat, retryLast };
}

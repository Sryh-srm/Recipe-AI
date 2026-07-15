/**
 * Centralized API configuration and service layer for Recipe AI.
 *
 * BASE_URL is the only place you need to change when deploying.
 * In a GitHub Codespace, set NEXT_PUBLIC_API_URL in your environment
 * variables (e.g. https://<codespace-name>-8000.preview.app.github.dev).
 * Falls back to localhost for local development.
 */

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://stunning-succotash-jjqj5j74v6jqcqw9p-8000.app.github.dev";

// ─── Generic fetch wrapper ────────────────────────────────────────────────────

/**
 * @param {string} path  - endpoint path (e.g. "/search")
 * @param {Record<string,string|number|boolean>} params - query params
 * @param {RequestInit} [options] - fetch options
 * @returns {Promise<unknown>} parsed JSON
 */
async function apiFetch(path, params = {}, options = {}) {
  const url = new URL(`${BASE_URL}${path}`);

  Object.entries(params).forEach(([key, val]) => {
    if (val !== null && val !== undefined && val !== "") {
      url.searchParams.set(key, String(val));
    }
  });

  const res = await fetch(url.toString(), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(`API ${res.status}: ${text}`);
  }

  return res.json();
}

// ─── Health ───────────────────────────────────────────────────────────────────

/** GET / — returns { message: string } */
export const getHealth = () => apiFetch("/");

/** GET /elastic — check Elasticsearch connection */
export const getElasticStatus = () => apiFetch("/elastic");

// ─── Index management ────────────────────────────────────────────────────────

/** GET /create_index */
export const createIndex = () => apiFetch("/create_index");

/** GET /ingest */
export const ingestData = () => apiFetch("/ingest");

/** GET /count */
export const getCount = () => apiFetch("/count");

// ─── Search ───────────────────────────────────────────────────────────────────

/**
 * BM25 Keyword Search — GET /search
 * @param {object} p
 * @param {string}  p.query
 * @param {string}  [p.cuisine]
 * @param {number}  [p.rating]
 * @param {number}  [p.size=10]
 * @returns {Promise<Recipe[]>}
 */
export const keywordSearch = ({ query, cuisine, rating, size = 10 }) =>
  apiFetch("/search", { query, cuisine, rating, size });

/**
 * Semantic Vector Search — GET /vector_search
 * @param {object} p
 * @param {string} p.query
 * @param {number} [p.size=10]
 * @returns {Promise<Recipe[]>}
 */
export const vectorSearch = ({ query, size = 10 }) =>
  apiFetch("/vector_search", { query, size });

/**
 * Hybrid Search (BM25 + Vector, RRF) — GET /hybrid_search
 * @param {object} p
 * @param {string} p.query
 * @param {number} [p.size=10]
 * @returns {Promise<Recipe[]>}
 */
export const hybridSearch = ({ query, size = 10 }) =>
  apiFetch("/hybrid_search", { query, size });

// ─── Autocomplete ─────────────────────────────────────────────────────────────

/**
 * Search-as-you-type autocomplete — GET /autocomplete
 * @param {string} query
 * @returns {Promise<string[]>}
 */
export const getAutocomplete = (query) =>
  apiFetch("/autocomplete", { query });

// ─── AI / RAG ────────────────────────────────────────────────────────────────

/**
 * RAG pipeline (Hybrid Search + Gemini/Groq) — GET /rag
 * @param {string} query
 * @returns {Promise<RagResponse>}
 */
export const getRagResponse = (query) => apiFetch("/rag", { query });

/**
 * Direct Gemini generation — GET /generate
 * @param {string} prompt
 * @returns {Promise<{ response: string }>}
 */
export const generateWithGemini = (prompt) =>
  apiFetch("/generate", { prompt });

/**
 * Groq health-check generation — GET /groq
 * @returns {Promise<{ response: string }>}
 */
export const testGroq = () => apiFetch("/groq");

// ─── JSDoc types ─────────────────────────────────────────────────────────────

/**
 * @typedef {object} Recipe
 * @property {string}  recipe_name
 * @property {string}  ingredients
 * @property {string}  directions
 * @property {string}  nutrition
 * @property {string}  cuisine_path
 * @property {string}  prep_time
 * @property {string}  cook_time
 * @property {string}  total_time
 * @property {string}  servings
 * @property {number}  rating
 * @property {string}  url
 * @property {string}  img_src
 * @property {number}  score
 * @property {object}  [highlight]
 */

/**
 * @typedef {object} RagResponse
 * @property {string}   user_query
 * @property {string}   provider
 * @property {string}   model
 * @property {number}   recipe_count
 * @property {string}   recommendation
 * @property {Recipe[]} retrieved_recipes
 */

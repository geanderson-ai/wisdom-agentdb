const defaultBaseUrl = "http://127.0.0.1:8000";

export type MemoryScope = "session" | "project" | "user" | "agent" | "workspace";

export interface CreateMemoryInput {
  text: string;
  scope: MemoryScope;
  user_id?: string;
  agent_id?: string;
  session_id?: string;
  project_id?: string;
  workspace_id?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface SearchInput {
  query: string;
  scope?: MemoryScope;
  top_k?: number;
  filters?: Record<string, unknown>;
}

export interface MemoryItem {
  memory_id: string;
  text: string;
  scope: MemoryScope;
  user_id?: string | null;
  agent_id?: string | null;
  session_id?: string | null;
  project_id?: string | null;
  workspace_id?: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface SearchResult {
  memory_id: string;
  score: number;
  snippet: string;
  citations: string[];
}

export interface SearchResponse {
  results: SearchResult[];
}

async function request<T>(baseUrl: string, path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { "content-type": "application/json" },
    ...options,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(typeof body === "string" ? body : JSON.stringify(body));
  }

  return body as T;
}

export function createClient({ baseUrl = defaultBaseUrl } = {}) {
  return {
    health: () => request<{ status: string }>(baseUrl, "/health"),
    createMemory: (payload: CreateMemoryInput) =>
      request<{ memory_id: string; status: string }>(baseUrl, "/v1/memory", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    searchMemory: (payload: SearchInput) =>
      request<SearchResponse>(baseUrl, "/v1/search", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    getMemory: (memoryId: string) => request<MemoryItem>(baseUrl, `/v1/memory/${memoryId}`),
    deleteMemory: (memoryId: string) =>
      request<void>(baseUrl, `/v1/memory/${memoryId}`, { method: "DELETE" }),
  };
}

export const wisdomAgentDb = createClient();


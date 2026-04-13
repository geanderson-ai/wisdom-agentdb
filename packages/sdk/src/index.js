const defaultBaseUrl = "http://127.0.0.1:8000";

async function request(baseUrl, path, options = {}) {
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

  return body;
}

export function createClient({ baseUrl = defaultBaseUrl } = {}) {
  return {
    health: () => request(baseUrl, "/health"),
    createMemory: (payload) =>
      request(baseUrl, "/v1/memory", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    searchMemory: (payload) =>
      request(baseUrl, "/v1/search", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    getMemory: (memoryId) => request(baseUrl, `/v1/memory/${memoryId}`),
    deleteMemory: (memoryId) =>
      request(baseUrl, `/v1/memory/${memoryId}`, { method: "DELETE" }),
  };
}

export const wisdomAgentDb = createClient();


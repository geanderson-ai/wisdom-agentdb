# API Contract

## Goal

Expose the memory engine through a stable contract that clients can use without knowing storage internals.

## Core endpoints

### `POST /v1/memory`

Create a memory item.

Request:

```json
{
  "text": "Remember that the project uses AGENTS.md for repo rules",
  "scope": "project",
  "project_id": "prj_101",
  "session_id": "ses_789",
  "tags": ["decision"]
}
```

Response:

```json
{
  "memory_id": "mem_123",
  "status": "accepted"
}
```

### `POST /v1/search`

Search semantic and structured memory.

Request:

```json
{
  "query": "project rules",
  "scope": "project",
  "top_k": 5
}
```

Response:

```json
{
  "results": [
    {
      "memory_id": "mem_123",
      "score": 0.94,
      "snippet": "Use AGENTS.md for project rules",
      "citations": ["cit_1"]
    }
  ]
}
```

### `GET /v1/memory/{memory_id}`

Fetch a single memory item and its provenance.

### `PATCH /v1/memory/{memory_id}`

Update mutable fields such as tags, importance, or policy annotations.

### `DELETE /v1/memory/{memory_id}`

Delete or tombstone a memory item under policy rules.

### `POST /v1/graph/query`

Query facts, entities, and relations.

### `POST /v1/export`

Export memory into a portable artifact.

### `POST /v1/import`

Import portable memory into a workspace or project.

## Client expectations

- All writes return an accepted or failed status.
- Long jobs should be handled asynchronously.
- Search must support filters and scope.
- Response objects must include provenance where possible.

## Error model

- `400` validation error
- `401` unauthorized
- `403` policy blocked
- `404` not found
- `409` conflict or duplicate
- `429` rate limited
- `500` unexpected server failure


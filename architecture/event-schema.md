# Event Schema

## Purpose

Use one canonical memory event model across all clients and workers.

## Base envelope

```json
{
  "event_id": "evt_01J...",
  "event_type": "memory.ingested",
  "timestamp": "2026-04-12T20:00:00Z",
  "user_id": "usr_123",
  "agent_id": "agt_456",
  "session_id": "ses_789",
  "project_id": "prj_101",
  "workspace_id": "wsp_202",
  "source": "cli",
  "scope": "project",
  "payload": {},
  "tags": ["private", "decision"],
  "trace": {
    "source_id": "src_abc",
    "citation_id": "cit_def"
  }
}
```

## Common fields

- `event_id`: unique event identifier
- `event_type`: semantic event name
- `timestamp`: creation time
- `user_id`: owner scope
- `agent_id`: producing agent
- `session_id`: episodic scope
- `project_id`: project scope
- `workspace_id`: workspace scope
- `source`: client or integration source
- `scope`: memory scope
- `payload`: event-specific content
- `tags`: privacy and classification labels
- `trace`: source and citation metadata

## Event types

- `memory.ingested`
- `memory.normalized`
- `memory.summarized`
- `memory.embedded`
- `memory.graph_updated`
- `memory.recalled`
- `memory.exported`
- `memory.deleted`
- `policy.applied`
- `job.started`
- `job.completed`
- `job.failed`

## Payload examples

### Ingested memory

```json
{
  "text": "Use AGENTS.md for project instructions",
  "content_type": "note",
  "importance": "medium"
}
```

### Graph update

```json
{
  "entities": ["AGENTS.md", "project rules"],
  "relations": [
    {
      "from": "AGENTS.md",
      "type": "defines",
      "to": "project rules"
    }
  ]
}
```

### Recall request

```json
{
  "query": "project memory rules",
  "top_k": 10,
  "filters": {
    "scope": "project"
  }
}
```

## Rules

- Events must be immutable after write.
- Processing must be idempotent.
- Raw payloads must remain traceable.
- Private tags must be enforced before reinjection.
- All derived artifacts must keep lineage back to the source event.


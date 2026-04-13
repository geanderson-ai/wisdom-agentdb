# Stack Overview

## Summary

The platform should be a two-language system:

- Python for the memory engine and workers
- TypeScript for clients, SDKs, CLI, and UI

The goal is to reuse benchmark strengths without turning the product into a patchwork of unrelated services.

## Layers

### 1. Client layer

- CLI
- Web app
- SDK
- Plugins

### 2. API layer

- Auth
- Validation
- Request routing
- Rate limiting

### 3. Memory engine

- Ingestion
- Normalization
- Summarization
- Embedding generation
- Entity and relation extraction
- Retrieval and ranking

### 4. Storage layer

- Postgres for metadata, sessions, audit, policies
- Vector DB for semantic memory
- Graph DB for facts and relations
- Object storage for raw inputs and exports

### 5. Worker layer

- Async ingestion
- Background summarization
- Graph updates
- Reindexing
- Exports
- Webhooks and automations

## Borrowed strengths

- Mem0 for memory API and semantic recall
- Zep for temporal facts and graph behavior
- Letta for stateful agent memory blocks
- claude-mem for capture and compression
- Autohand for project memory and skills
- Khoj for ingestion and automation patterns

## Our responsibilities

- Canonical schema
- Policy engine
- Orchestration
- Product UX
- Error handling and retries
- Observability

## Recommended runtime shape

```text
TS clients -> Python API -> queue/worker -> stores
```

That keeps the data plane simple and the product surfaces flexible.


# System Design Document

## Overview

This system is a memory stack for agents. It accepts events and documents, extracts useful memory, stores it by scope, and serves it back through semantic and structured retrieval.

## Service boundaries

### 1. Ingestion service

- Accepts messages, docs, and events.
- Validates payloads.
- Writes raw items to object storage.

### 2. Memory processor

- Normalizes text and metadata.
- Classifies memory type.
- Extracts entities, facts, and relations.
- Generates summaries and embeddings.

### 3. Retrieval service

- Runs semantic search.
- Filters by scope and policy.
- Re-ranks results.
- Builds response context.

### 4. Graph service

- Manages entities and relations.
- Tracks temporal changes.
- Supports fact invalidation.

### 5. Policy service

- Handles privacy tags.
- Applies retention rules.
- Controls export and deletion.

### 6. Worker service

- Runs background tasks.
- Handles embeddings, summarization, and graph updates.

## Event model

- `memory.ingested`
- `memory.normalized`
- `memory.embedded`
- `memory.summarized`
- `memory.graph_updated`
- `memory.recalled`
- `memory.exported`
- `memory.deleted`

## Data flow

1. Client sends a memory event.
2. API writes raw payload and metadata.
3. Worker normalizes and enriches the item.
4. Embeddings and facts are generated.
5. Retrieval indexes are updated.
6. Client later recalls the memory by query or scope.

## API surfaces

- `POST /memory`
- `GET /memory/{id}`
- `PATCH /memory/{id}`
- `DELETE /memory/{id}`
- `POST /search`
- `POST /graph/query`
- `POST /export`
- `POST /import`

## Storage choices

- Postgres for sessions, metadata, audit, and policies.
- Vector DB for semantic retrieval.
- Graph DB for facts and relations.
- Object store for raw artifacts and exports.

## Failure handling

- Retry background jobs.
- Keep raw event payloads so processing can be replayed.
- Make all write paths idempotent.
- Never drop source provenance.


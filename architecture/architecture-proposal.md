# Architecture Proposal

## Goal

Build a memory platform for agents that can:

- remember across sessions
- persist user and project context
- recover relevant memories semantically
- keep facts and relationships over time
- expose a clean API for CLI, SDK, and web clients

## Core principle

- Python owns the data plane.
- TypeScript owns the experience plane.
- Memory is modeled as artifacts, not hidden state.

## High-level layout

```text
clients (TypeScript)
  -> API gateway
  -> memory core (Python)
  -> stores and workers
```

## Major components

### API gateway

- Auth
- rate limiting
- request validation
- OpenAPI contract

### Memory core

- ingest events
- normalize content
- classify memory type
- extract entities and facts
- generate embeddings
- rank and retrieve context
- apply privacy and retention rules

### Workers

- async ingestion
- embedding generation
- summarization
- graph updates
- exports and backups

### Stores

- relational store for metadata and sessions
- vector store for semantic recall
- graph store for entities and facts
- object store for raw documents and attachments

### Client surfaces

- CLI
- web UI
- SDK
- plugin integrations

## Design rules

- KISS: keep the core model small.
- DRY: one memory schema, multiple clients.
- YAGNI: avoid adding retrieval modes before they are needed.
- Event-driven where possible.
- Async for ingestion, indexing, and summarization.

## Recommended stack

- Python: FastAPI, worker runtime, retrieval services
- TypeScript: CLI, web app, SDK, plugins
- Postgres: metadata, sessions, audit trail
- Vector DB: semantic search
- Graph DB: facts and relationships
- Object storage: source documents and exports

## Why this split works

- Python handles the heavy memory logic well.
- TypeScript gives strong UX and integration ergonomics.
- The storage layer stays replaceable.
- The contract between layers is explicit.


# Architecture Overview

## Summary

Wisdom AgentDB is a memory platform for agents.
It is designed as a layered system rather than a single database:

- ingestion and normalization
- semantic retrieval
- graph facts and temporal relations
- session and project scope
- policy and privacy controls
- export and import

## Core engine

- Python for ingestion, extraction, retrieval, and workers
- async background jobs for summarization and indexing
- explicit events for every memory write and derived artifact

## Client layer

- TypeScript CLI
- TypeScript SDK
- TypeScript web app
- plugin integrations

## Storage layer

- Postgres for metadata, sessions, policies, and audit
- vector store for semantic recall
- graph store for facts and relations
- object storage for raw inputs and exports

## Design reference points

- Mem0 for memory API and semantic memory
- Zep for facts, summaries, and temporal behavior
- Letta for stateful agents and memory blocks
- claude-mem for session capture and reinjection
- Autohand for project-local instructions and skills
- Khoj for ingestion, chat, and automations

## Main rule

- Borrow capabilities where the benchmark is already strong.
- Build the orchestration, schema, and policy layer ourselves.


# Product Requirements Document

## Product summary

The product is a memory database and runtime for agents. It stores session context, project knowledge, user preferences, and structured facts that can be recalled later.

## Problem statement

Current agent systems lose useful context across sessions. Users repeat instructions, re-explain projects, and lose decisions that should have remained available.

## Goals

- Persist memory across sessions.
- Separate user, project, and session scope.
- Support semantic recall and structured retrieval.
- Keep a full audit trail.
- Support self-hosting.

## Non-goals

- No consumer social features.
- No generic note app.
- No full knowledge wiki editor in v1.
- No opaque memory with no traceability.

## Personas

- Individual developer using a coding agent.
- Team maintaining a shared project memory.
- Power user who wants searchable long-term context.
- Admin who needs privacy and retention controls.

## Core use cases

- Save and recall a decision made during a session.
- Retrieve relevant memory in a new session.
- Store project-specific instructions.
- Search past facts by meaning, not exact keyword.
- Export or delete memory data.

## Functional requirements

- Create, read, update, delete memory items.
- Attach scope: user, project, session, agent.
- Store citations and source links.
- Generate summaries and embeddings asynchronously.
- Support graph facts and relationships.
- Allow privacy flags and exclusions.
- Allow import/export.

## Non-functional requirements

- Low-latency recall.
- Async processing for heavy jobs.
- Auditability for all writes.
- Tenant and scope isolation.
- Self-hostable deployment.
- Replaceable storage backends.

## Success metrics

- Recall latency under target threshold.
- High retrieval relevance.
- Low manual re-explanation rate.
- High retention of useful memories.
- Low storage noise after compaction.


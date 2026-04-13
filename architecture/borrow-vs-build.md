# Build vs Borrow Matrix

## Objective

Reuse as much as possible from the benchmark systems while keeping a single product architecture on top.

## Principle

- Borrow capabilities where the benchmark is already strong.
- Build the orchestration, contracts, and product-specific policy layer ourselves.
- Do not copy UIs or runtimes wholesale unless they become the product.

## Matrix

| Area | Borrow from | Reuse strategy | Build ourselves |
| --- | --- | --- | --- |
| Memory API | Mem0 | Use as the primary memory layer API and CRUD surface | Product-specific endpoints, auth, tenancy, and conventions |
| Semantic recall | Mem0, Khoj | Reuse search, embeddings, reranking, and context assembly patterns | Final scoring policy and memory priority rules |
| Graph memory | Mem0, Zep | Reuse entity graph concepts and relationship retrieval | Our canonical schema and graph traversal rules |
| Temporal facts | Zep | Reuse time-aware fact modeling and invalidation patterns | Our event model and retention policy |
| Session capture | claude-mem, Autohand | Reuse capture, compression, and session persistence patterns | Our event ingestion contract and replay pipeline |
| Agent state | Letta | Reuse stateful agent patterns and memory blocks | Our agent lifecycle and state policies |
| Project memory | Autohand | Reuse `AGENTS.md`-style repo-local instructions and skills | Our project policy schema and inheritance rules |
| Document ingestion | Khoj | Reuse multi-source ingestion, sync, and indexing patterns | Our ingestion adapters and normalization rules |
| Automations | Khoj, Autohand | Reuse scheduled tasks and workflow hooks | Our job orchestration and product actions |
| Privacy controls | claude-mem, Autohand | Reuse scoped privacy flags and exclusion patterns | Our policy engine, retention, and deletion semantics |
| Citations and traceability | claude-mem, Khoj | Reuse source IDs and linked references | Our citation format and audit trail API |
| Context compaction | claude-mem, Autohand | Reuse summarization and compaction heuristics | Our compaction thresholds and memory ranking policy |
| UI patterns | Khoj, Letta | Reuse agent-centric and search-centric UX ideas | Our brand, flows, and interaction model |
| Orchestration | None directly | Borrow ideas, not implementation | Our event bus, worker topology, and domain services |
| Storage layout | Mem0, Zep, Letta | Borrow the separation of concerns | Our unified storage contracts and schemas |

## What to borrow first

1. Mem0 for the core memory API and semantic retrieval.
2. Zep for graph facts and temporal behavior.
3. Letta for stateful agent memory blocks.
4. claude-mem for capture, compression, and reinjection.
5. Autohand for repo-local instructions and skills.
6. Khoj for ingestion and automation patterns.

## What to build first

- Unified memory event schema
- Scope model: user, project, session, agent, workspace
- Policy layer for privacy and retention
- Retrieval ranking rules
- Export/import contract
- Worker orchestration and retries

## Suggested implementation order

1. Define the canonical event and memory schema.
2. Wrap Mem0 as the initial memory API.
3. Add Zep-style temporal facts on top.
4. Add Letta-style agent state blocks.
5. Add session capture and compaction.
6. Add project memory and skill loading.
7. Add ingestion adapters and automations.

## Decision rule

- If a benchmark already has the capability and it fits the contract, reuse it.
- If the capability touches product identity, orchestration, or schema ownership, build it ourselves.
- If the capability is a thin adapter or protocol bridge, keep it as a wrapper around the borrowed engine.


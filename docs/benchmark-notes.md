# Benchmark Notes

## What we learned

### Mem0

- Best fit for the memory API and semantic retrieval layer.
- Strong in graph memory and production-ready memory operations.
- Good reference for treating memory as a service.

### Zep

- Best fit for temporal facts, summaries, and relationship-aware recall.
- Good reference for time-stamped memory and chat-history context.

### Letta

- Best fit for stateful agents and persistent memory blocks.
- Good reference for memory that lives with the agent state.

### claude-mem

- Best fit for capture, compression, citations, and reinjection.
- Good reference for turning session activity into reusable memory.

### Autohand

- Best fit for repo-local instructions, skills, and project memory.
- Good reference for workspace-scoped rules and context compaction.

### Khoj

- Best fit for document ingestion, semantic search, and automations.
- Good reference for a second-brain style knowledge layer.

## Reuse strategy

- Use Mem0 for the base memory engine.
- Add Zep-style temporal facts where time matters.
- Add Letta-style stateful blocks where agent state matters.
- Add claude-mem-style capture and compression for sessions.
- Add Autohand-style project instructions and skills.
- Add Khoj-style ingestion and automations for documents and research.

## Why this composition works

- It keeps one canonical product contract.
- It avoids reimplementing proven patterns from scratch.
- It lets us swap infrastructure under the hood while preserving the API.


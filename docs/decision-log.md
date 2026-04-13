# Decision Log

## 2026-04-12

### Decision: Use Python for the core engine

Reason:

- best fit for workers, ingestion, extraction, and retrieval
- aligns with the benchmark ecosystem we analyzed

### Decision: Use TypeScript for clients and SDKs

Reason:

- best fit for CLI, web UI, and integrations
- keeps the experience layer separate from memory logic

### Decision: Reuse benchmarks selectively

Reason:

- maximize reuse without making the product a patchwork
- keep orchestration, schema, and policy under our control

### Decision: Model memory as layered artifacts

Reason:

- session memory
- project memory
- semantic memory
- graph memory
- agent state

### Decision: Make memory auditable

Reason:

- every item should have provenance, scope, and policy metadata
- private and deletable memories must remain explicit


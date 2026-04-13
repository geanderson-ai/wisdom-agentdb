# ERD

## Entities

- `User`
- `Agent`
- `Workspace`
- `Project`
- `Session`
- `MemoryItem`
- `MemoryChunk`
- `Entity`
- `Fact`
- `Relation`
- `Citation`
- `SourceDocument`
- `Embedding`
- `Policy`
- `Job`
- `Event`
- `ExportArtifact`

## Relationships

```mermaid
erDiagram
    USER ||--o{ WORKSPACE : owns
    WORKSPACE ||--o{ PROJECT : contains
    PROJECT ||--o{ SESSION : has
    AGENT ||--o{ SESSION : runs
    SESSION ||--o{ EVENT : emits
    SESSION ||--o{ MEMORY_ITEM : creates
    MEMORY_ITEM ||--o{ MEMORY_CHUNK : splits_into
    MEMORY_ITEM ||--o{ CITATION : references
    MEMORY_ITEM ||--o{ EMBEDDING : indexed_as
    SOURCE_DOCUMENT ||--o{ MEMORY_ITEM : source_for
    MEMORY_ITEM ||--o{ ENTITY : extracts
    ENTITY ||--o{ FACT : participates_in
    FACT ||--o{ RELATION : linked_by
    PROJECT ||--o{ POLICY : governed_by
    PROJECT ||--o{ JOB : schedules
    JOB ||--o{ EVENT : produces
    EXPORT_ARTIFACT ||--o{ MEMORY_ITEM : packages
```

## Notes

- `Session` is the primary episodic scope.
- `MemoryItem` is the canonical stored memory unit.
- `MemoryChunk` is the searchable fragment used for retrieval.
- `Entity`, `Fact`, and `Relation` represent the graph layer.
- `Policy` controls privacy, retention, and export rules.
- `ExportArtifact` allows portable memory exchange.


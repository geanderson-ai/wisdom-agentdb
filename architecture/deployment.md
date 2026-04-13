# Deployment

## Local development

- Python API runs as the core service.
- TypeScript clients talk to the Python API.
- Postgres stores metadata and audit data.
- A vector backend stores semantic memory.
- A graph backend stores relationships and temporal facts.
- A worker process handles background jobs.

## Suggested dev layout

```text
apps/api        # Python API
apps/worker     # Python jobs and pipelines
apps/cli        # TypeScript CLI
apps/web        # TypeScript web UI
packages/sdk    # TypeScript SDK
```

## Production layout

### Single-node start

- API container
- Worker container
- Postgres
- Vector DB
- Graph DB
- Object store

### Scaled layout

- API replicas behind a load balancer
- Worker pool for async processing
- Managed Postgres if available
- Managed object storage if available
- Separate vector and graph services if needed

## Environment variables

- `DATABASE_URL`
- `VECTOR_DB_URL`
- `GRAPH_DB_URL`
- `OBJECT_STORE_URL`
- `REDIS_URL`
- `OPENAI_API_KEY` or other model keys
- `AUTH_SECRET`
- `RETENTION_DAYS`
- `DEFAULT_SCOPE`

## Operational concerns

- Backpressure for heavy ingest workloads
- Retries for failed embedding and summarization jobs
- Dead-letter queue for unrecoverable events
- Audit logs for every write and delete
- Backup and restore for all stores

## Deployment rule

- Keep clients stateless.
- Keep memory state in the backend.
- Keep long-running jobs in workers.
- Keep storage replaceable.


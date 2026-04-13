from __future__ import annotations

from fastapi import FastAPI, HTTPException, status

from .models import (
    MemoryCreateRequest,
    MemoryCreateResponse,
    SearchHit,
    SearchRequest,
    SearchResponse,
)
from .store import MemoryStore


def create_app() -> FastAPI:
    app = FastAPI(title="Wisdom AgentDB", version="0.1.0")
    store = MemoryStore()

    @app.get("/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    @app.post(
        "/v1/memory",
        response_model=MemoryCreateResponse,
        status_code=status.HTTP_202_ACCEPTED,
    )
    def create_memory(payload: MemoryCreateRequest) -> MemoryCreateResponse:
        record = store.add(**payload.model_dump())
        return MemoryCreateResponse(memory_id=record.memory_id)

    @app.get("/v1/memory/{memory_id}")
    def get_memory(memory_id: str) -> dict:
        record = store.get(memory_id)
        if record is None:
            raise HTTPException(status_code=404, detail="Memory item not found")
        return record.model_dump()

    @app.delete("/v1/memory/{memory_id}", status_code=status.HTTP_204_NO_CONTENT)
    def delete_memory(memory_id: str) -> None:
        deleted = store.delete(memory_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Memory item not found")

    @app.post("/v1/search", response_model=SearchResponse)
    def search(payload: SearchRequest) -> SearchResponse:
        matches = [
            SearchHit(
                memory_id=item.memory_id,
                score=1.0,
                snippet=item.text[:240],
                citations=[f"src:{item.memory_id}"],
            )
            for item in store.search(
                query=payload.query,
                scope=payload.scope,
                top_k=payload.top_k,
            )
        ]
        return SearchResponse(results=matches)

    return app


app = create_app()

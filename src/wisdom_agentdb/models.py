from __future__ import annotations

from datetime import datetime, timezone
from enum import StrEnum
from typing import Any

from pydantic import BaseModel, Field


class MemoryScope(StrEnum):
    session = "session"
    project = "project"
    user = "user"
    agent = "agent"
    workspace = "workspace"


class MemoryCreateRequest(BaseModel):
    text: str = Field(min_length=1)
    scope: MemoryScope
    user_id: str | None = None
    agent_id: str | None = None
    session_id: str | None = None
    project_id: str | None = None
    workspace_id: str | None = None
    tags: list[str] = Field(default_factory=list)
    metadata: dict[str, Any] = Field(default_factory=dict)


class MemoryCreateResponse(BaseModel):
    memory_id: str
    status: str = "accepted"


class SearchRequest(BaseModel):
    query: str = Field(min_length=1)
    scope: MemoryScope | None = None
    top_k: int = Field(default=5, ge=1, le=50)
    filters: dict[str, Any] = Field(default_factory=dict)


class SearchHit(BaseModel):
    memory_id: str
    score: float
    snippet: str
    citations: list[str] = Field(default_factory=list)


class SearchResponse(BaseModel):
    results: list[SearchHit]


class MemoryRecord(BaseModel):
    memory_id: str
    text: str
    scope: MemoryScope
    user_id: str | None = None
    agent_id: str | None = None
    session_id: str | None = None
    project_id: str | None = None
    workspace_id: str | None = None
    tags: list[str] = Field(default_factory=list)
    metadata: dict[str, Any] = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


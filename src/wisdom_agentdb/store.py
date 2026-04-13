from __future__ import annotations

from collections.abc import Iterable
from dataclasses import dataclass, field
from typing import Any
from uuid import uuid4

from .models import MemoryRecord, MemoryScope


@dataclass
class MemoryStore:
    _items: dict[str, MemoryRecord] = field(default_factory=dict)

    def add(self, **kwargs: Any) -> MemoryRecord:
        record = MemoryRecord(memory_id=f"mem_{uuid4().hex[:12]}", **kwargs)
        self._items[record.memory_id] = record
        return record

    def get(self, memory_id: str) -> MemoryRecord | None:
        return self._items.get(memory_id)

    def delete(self, memory_id: str) -> bool:
        return self._items.pop(memory_id, None) is not None

    def search(
        self,
        query: str,
        scope: MemoryScope | None = None,
        top_k: int = 5,
    ) -> Iterable[MemoryRecord]:
        query_terms = {term.lower() for term in query.split() if term}
        scored: list[tuple[float, MemoryRecord]] = []
        for item in self._items.values():
            if scope is not None and item.scope != scope:
                continue

            haystack = " ".join(
                [item.text, " ".join(item.tags), " ".join(item.metadata.keys())]
            ).lower()
            overlap = sum(1 for term in query_terms if term in haystack)
            score = overlap / max(len(query_terms), 1)
            if score > 0:
                scored.append((score, item))

        scored.sort(key=lambda pair: pair[0], reverse=True)
        return [item for _, item in scored[:top_k]]

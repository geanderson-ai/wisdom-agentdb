from fastapi.testclient import TestClient

from wisdom_agentdb.app import app


def test_create_search_and_delete_memory() -> None:
    client = TestClient(app)

    create_response = client.post(
        "/v1/memory",
        json={
            "text": "Use AGENTS.md for project rules",
            "scope": "project",
            "project_id": "prj_1",
            "tags": ["decision"],
        },
    )
    assert create_response.status_code == 202
    memory_id = create_response.json()["memory_id"]

    search_response = client.post(
        "/v1/search",
        json={"query": "project rules", "scope": "project", "top_k": 5},
    )
    assert search_response.status_code == 200
    assert search_response.json()["results"][0]["memory_id"] == memory_id

    delete_response = client.delete(f"/v1/memory/{memory_id}")
    assert delete_response.status_code == 204

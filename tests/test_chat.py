import pytest
from unittest.mock import AsyncMock, patch

from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.fixture
def anyio_backend():
    return "asyncio"


@pytest.mark.anyio
async def test_health_check():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


@pytest.mark.anyio
async def test_opening_message():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/opening-message")
    assert response.status_code == 200
    data = response.json()
    assert "content" in data
    assert "HPLC" in data["content"]


@pytest.mark.anyio
async def test_chat_endpoint():
    mock_result = {
        "content": "Test response about HPLC analysis.",
        "model": "claude-sonnet-4-20250514",
        "usage": {"input_tokens": 10, "output_tokens": 20},
    }

    with patch("app.routers.chat.chat", new_callable=AsyncMock, return_value=mock_result):
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            response = await client.post(
                "/api/chat",
                json={
                    "messages": [
                        {"role": "user", "content": "What is HPLC?"}
                    ]
                },
            )
    assert response.status_code == 200
    data = response.json()
    assert data["content"] == "Test response about HPLC analysis."
    assert data["model"] == "claude-sonnet-4-20250514"


@pytest.mark.anyio
async def test_chat_stream_endpoint():
    async def mock_stream(*args, **kwargs):
        for chunk in ["Hello", " from", " HPLC", " analyst"]:
            yield chunk

    with patch("app.routers.chat.chat_stream", side_effect=mock_stream):
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            response = await client.post(
                "/api/chat/stream",
                json={
                    "messages": [
                        {"role": "user", "content": "Tell me about impurity profiling."}
                    ]
                },
            )
    assert response.status_code == 200
    assert "text/event-stream" in response.headers["content-type"]
    body = response.text
    assert "Hello" in body
    assert "[DONE]" in body

import json

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.models.schemas import ChatMessage, ChatRequest, ChatResponse
from app.services.claude import OPENING_MESSAGE, chat, chat_stream

router = APIRouter()


@router.get("/health")
async def health_check():
    return {"status": "ok"}


@router.get("/opening-message")
async def opening_message():
    return {"content": OPENING_MESSAGE}


@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    messages = [{"role": m.role, "content": m.content} for m in request.messages]

    try:
        result = await chat(messages, model=request.model)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return ChatResponse(**result)


@router.post("/chat/stream")
async def chat_stream_endpoint(request: ChatRequest):
    messages = [{"role": m.role, "content": m.content} for m in request.messages]

    async def event_generator():
        try:
            async for chunk in chat_stream(messages, model=request.model):
                data = json.dumps({"content": chunk})
                yield f"data: {data}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            error_data = json.dumps({"error": str(e)})
            yield f"data: {error_data}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )

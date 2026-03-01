import asyncio
from collections.abc import AsyncGenerator
from pathlib import Path

import anthropic

from app.config import settings

SYSTEM_PROMPT_PATH = Path(__file__).parent.parent / "prompts" / "system.md"

OPENING_MESSAGE = (
    "HPLC Analyst ready. Agilent 1290 / LC-MS expert, GLP/cGMP.\n\n"
    "- **Impurity profiling** \u2013 identification, quantification, ICH thresholds\n"
    "- **Method dev & validation** \u2013 HPLC/UPLC/LC-MS optimization\n"
    "- **Stability studies** \u2013 degradation, forced stress, trending\n"
    "- **Instrument troubleshooting** \u2013 pressure, baseline, sensitivity\n"
    "- **Regulatory** \u2013 USP, ICH, 21 CFR Part 11\n\n"
    "What's the issue or question?"
)


def get_system_prompt() -> str:
    """Load system prompt from disk each time (no cache) so edits take effect immediately."""
    return SYSTEM_PROMPT_PATH.read_text(encoding="utf-8")


_client: anthropic.AsyncAnthropic | None = None


def get_client() -> anthropic.AsyncAnthropic:
    global _client
    if _client is None:
        _client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)
    return _client


async def chat_stream(
    messages: list[dict],
    model: str | None = None,
) -> AsyncGenerator[str, None]:
    """Stream a chat response from Claude, yielding text chunks."""
    client = get_client()
    model = model or settings.model_name

    max_retries = 3
    for attempt in range(max_retries):
        try:
            async with client.messages.stream(
                model=model,
                max_tokens=settings.max_tokens,
                system=get_system_prompt(),
                messages=messages,
            ) as stream:
                async for text in stream.text_stream:
                    yield text
            return
        except anthropic.RateLimitError:
            if attempt < max_retries - 1:
                await asyncio.sleep(2 ** (attempt + 1))
            else:
                raise


async def chat(
    messages: list[dict],
    model: str | None = None,
) -> dict:
    """Send a chat request and return the full response."""
    client = get_client()
    model = model or settings.model_name

    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = await client.messages.create(
                model=model,
                max_tokens=settings.max_tokens,
                system=get_system_prompt(),
                messages=messages,
            )
            return {
                "content": response.content[0].text,
                "model": response.model,
                "usage": {
                    "input_tokens": response.usage.input_tokens,
                    "output_tokens": response.usage.output_tokens,
                },
            }
        except anthropic.RateLimitError:
            if attempt < max_retries - 1:
                await asyncio.sleep(2 ** (attempt + 1))
            else:
                raise

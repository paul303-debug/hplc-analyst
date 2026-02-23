import asyncio
from collections.abc import AsyncGenerator
from pathlib import Path

import anthropic

from app.config import settings

SYSTEM_PROMPT_PATH = Path(__file__).parent.parent / "prompts" / "system.md"

OPENING_MESSAGE = (
    "Welcome! I'm your pharmaceutical analytical chemistry expert specializing in "
    "Agilent 1290 Infinity II systems and drug purity testing. I support everything "
    "from IND-phase method development through NDA submissions, all within GLP/cGMP "
    "frameworks.\n\n"
    "I can help you with:\n"
    "- **Impurity profiling** \u2013 Identifying and characterizing organic, inorganic, "
    "or elemental impurities\n"
    "- **Method development & validation** \u2013 Optimizing HPLC/UPLC/LC-MS methods for "
    "pharmaceutical analysis\n"
    "- **Stability studies** \u2013 Interpreting degradation data and forced degradation "
    "results\n"
    "- **Instrument troubleshooting** \u2013 Resolving Agilent 1290/LC-MS performance "
    "issues\n"
    "- **Regulatory compliance** \u2013 Ensuring USP, ICH, and GMP requirements are met\n\n"
    "What can I assist you with today? Please share details about your analysis, any "
    "issues you're experiencing, or questions about your method or instrument."
)


def _load_system_prompt() -> str:
    return SYSTEM_PROMPT_PATH.read_text(encoding="utf-8")


_system_prompt: str | None = None


def get_system_prompt() -> str:
    global _system_prompt
    if _system_prompt is None:
        _system_prompt = _load_system_prompt()
    return _system_prompt


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

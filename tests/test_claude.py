from pathlib import Path

from app.services.claude import get_system_prompt, OPENING_MESSAGE


def test_system_prompt_loads():
    prompt = get_system_prompt()
    assert isinstance(prompt, str)
    assert len(prompt) > 100
    assert "Agilent" in prompt
    assert "HPLC" in prompt
    assert "ICH" in prompt


def test_system_prompt_file_exists():
    prompt_path = Path(__file__).parent.parent / "app" / "prompts" / "system.md"
    assert prompt_path.exists()
    assert prompt_path.stat().st_size > 0


def test_opening_message_content():
    assert "HPLC" in OPENING_MESSAGE
    assert "Impurity profiling" in OPENING_MESSAGE
    assert "Method development" in OPENING_MESSAGE
    assert "Instrument troubleshooting" in OPENING_MESSAGE

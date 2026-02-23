from pathlib import Path

from pydantic_settings import BaseSettings

_env_file = Path(__file__).parent.parent / ".env"


class Settings(BaseSettings):
    anthropic_api_key: str
    model_name: str = "claude-sonnet-4-20250514"
    max_tokens: int = 8192

    model_config = {
        "env_file": str(_env_file) if _env_file.is_file() else None,
        "env_file_encoding": "utf-8",
    }


settings = Settings()

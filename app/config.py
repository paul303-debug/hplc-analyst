from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    anthropic_api_key: str
    model_name: str = "claude-sonnet-4-20250514"
    max_tokens: int = 8192

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()

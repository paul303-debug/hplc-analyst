# HPLC Analyst

AI-powered pharmaceutical HPLC analysis assistant built with FastAPI and Claude API.

A specialized chat interface for analytical chemists working with Agilent 1290 Infinity II LC systems and Triple Quadrupole LC/MS platforms. Provides expert guidance on impurity profiling, method development/validation, stability testing, instrument troubleshooting, and regulatory compliance within GLP/cGMP environments.

## Setup

### Prerequisites
- Python 3.11+
- [uv](https://docs.astral.sh/uv/) (recommended) or pip
- An [Anthropic API key](https://console.anthropic.com/)

### Install

```bash
# Clone the repo
git clone https://github.com/paul303-debug/hplc-analyst.git
cd hplc-analyst

# Install dependencies with uv
uv sync

# Or with pip
pip install -e ".[dev]"
```

### Configure

```bash
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

### Run

```bash
uv run uvicorn app.main:app --reload
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | GET | Health check |
| `/api/opening-message` | GET | Get the assistant's opening message |
| `/api/chat` | POST | Send a message (full response) |
| `/api/chat/stream` | POST | Send a message (SSE streaming) |

## Project Structure

```
hplc-analyst/
├── app/
│   ├── main.py              # FastAPI app
│   ├── config.py             # Settings (.env loading)
│   ├── routers/chat.py       # Chat endpoints
│   ├── services/claude.py    # Anthropic SDK wrapper
│   ├── models/schemas.py     # Pydantic models
│   └── prompts/system.md     # HPLC expert system prompt
├── static/                   # Chat UI (HTML + JS + CSS)
├── tests/                    # Test suite
├── pyproject.toml
└── .env.example
```

## Testing

```bash
uv run pytest
```

## License

MIT

# 05. Models & Providers

## 🎯 Objective
Connect providers, choose models, use reasoning variants, and configure local and custom providers.

## 📋 Connect and choose

```text
/connect     # connect a provider (API key or OAuth)
/models      # choose a model for the session
```

The model choice applies to the **current session** and does not rewrite the configuration. You can also choose it for a single command:

```bash
opencode run --model anthropic/claude-sonnet-4-5 "Refactor parseToken"
```

## 📋 Default model

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5"
}
```

The catalog comes from [models.dev](https://models.dev). A model already selected in the session takes precedence over the default.

### Model reference

```
provider/model
provider/model#variant
openrouter/anthropic/claude-sonnet-4.5#high
```

- The provider ends at the first `/`
- The model may contain `/`, but not `#`
- The variant follows `#`

## 🧠 Variants (reasoning effort)

```bash
opencode run --model openai/gpt-5.2#high "Review this plan"
```

Common names: `low`, `high`, `max` — but not every model offers them all. You can define variants:

```jsonc
{
  "providers": {
    "openai": {
      "models": {
        "gpt-5.2": {
          "variants": [
            { "id": "fast", "settings": { "reasoningEffort": "low" } },
            { "id": "deep", "settings": { "reasoningEffort": "high", "reasoningSummary": "auto" } }
          ]
        }
      }
    }
  }
}
```

## 🏠 Local models (Ollama, LM Studio, vLLM)

OpenCode automatically discovers local models at the default addresses:

```jsonc
{
  "model": "ollama/gemma3:4b"
}
```

For another host/port, point the OpenAI-compatible `baseURL`:

```jsonc
{
  "providers": {
    "ollama": { "settings": { "baseURL": "http://127.0.0.1:5678/v1", "apiKey": "{env:OLLAMA_API_KEY}" } }
  }
}
```

## 🧩 Custom provider (OpenAI-compatible)

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "local/coder",
  "providers": {
    "local": {
      "name": "Local server",
      "package": "@opencode/ai/providers/openai-compatible",
      "settings": { "baseURL": "http://127.0.0.1:1234/v1" },
      "models": {
        "coder": { "modelID": "name-on-server", "limit": { "context": 32768, "output": 8192 } }
      }
    }
  }
}
```

Provider fields: `name`, `env`, `package`, `canonical`, `settings`, `headers`, `body`, `models`. Model fields: `modelID`, `name`, `capabilities`, `cost`, `limit`, `variants`, `disabled`.

## ☁️ Cloud providers (summary)

| Provider | Main configuration |
|----------|--------------------|
| **Azure** | `settings.resourceName` + `az login` or API key |
| **Amazon Bedrock** | `settings.profile` + `settings.region` (AWS credential chain) |
| **Google Vertex** | `gcloud auth application-default login` + `settings.project`/`location` |
| **OpenRouter** | `OPENROUTER_API_KEY` or `/connect`; models `openrouter/...` |
| **GitHub Copilot** | `/connect` → device OAuth |

## ❓ Hands-on challenge

1. Connect a provider with `/connect` and list models with `opencode models`
2. Run the same prompt with `#low` and `#high` and compare quality vs latency
3. Configure a local OpenAI-compatible provider (Ollama/LM Studio) and select a model
4. Check cost with `opencode stats --cost` after testing

## 📚 Official source

- [Models](https://opencode.ai/v2/docs/models/) · [Providers](https://opencode.ai/v2/docs/providers/) · [CLI providers](https://opencode.ai/v2/docs/cli/providers/)

---

**Next step:** [Module 02 — Customizing the Agent](../../modulo-02-intermediario/README.md) 🇧🇷 · [Back to module](README.md)
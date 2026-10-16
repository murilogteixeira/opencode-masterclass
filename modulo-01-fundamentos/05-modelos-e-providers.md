# 05. Modelos e Providers

## 🎯 Objetivo
Conectar provedores, escolher modelos, usar variantes de raciocínio e configurar providers locais e customizados.

## 📋 Conectar e escolher

```text
/connect     # conecta um provedor (API key ou OAuth)
/models      # escolhe um modelo para a sessão
```

A escolha de modelo vale para a **sessão atual** e não reescreve a configuração. Também dá para escolher num único comando:

```bash
opencode run --model anthropic/claude-sonnet-4-5 "Refatore parseToken"
```

## 📋 Modelo padrão

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5"
}
```

O catálogo vem do [models.dev](https://models.dev). Um modelo já selecionado na sessão tem precedência sobre o padrão.

### Referência de modelo

```
provider/model
provider/model#variant
openrouter/anthropic/claude-sonnet-4.5#high
```

- O provider termina no primeiro `/`
- O modelo pode conter `/`, mas não `#`
- A variante vem após `#`

## 🧠 Variantes (esforço de raciocínio)

```bash
opencode run --model openai/gpt-5.2#high "Revise este plano"
```

Nomes comuns: `low`, `high`, `max` — mas nem todo modelo oferece todos. Você pode definir variantes:

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

## 🏠 Modelos locais (Ollama, LM Studio, vLLM)

O OpenCode descobre automaticamente modelos locais nos endereços padrão:

```jsonc
{
  "model": "ollama/gemma3:4b"
}
```

Para outro host/porta, aponte o `baseURL` OpenAI-compatível:

```jsonc
{
  "providers": {
    "ollama": { "settings": { "baseURL": "http://127.0.0.1:5678/v1", "apiKey": "{env:OLLAMA_API_KEY}" } }
  }
}
```

## 🧩 Provider customizado (OpenAI-compatível)

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "local/coder",
  "providers": {
    "local": {
      "name": "Servidor local",
      "package": "@opencode/ai/providers/openai-compatible",
      "settings": { "baseURL": "http://127.0.0.1:1234/v1" },
      "models": {
        "coder": { "modelID": "nome-no-servidor", "limit": { "context": 32768, "output": 8192 } }
      }
    }
  }
}
```

Campos do provider: `name`, `env`, `package`, `canonical`, `settings`, `headers`, `body`, `models`. Para modelos: `modelID`, `name`, `capabilities`, `cost`, `limit`, `variants`, `disabled`.

## ☁️ Providers em nuvem (resumo)

| Provider | Configuração principal |
|----------|------------------------|
| **Azure** | `settings.resourceName` + `az login` ou API key |
| **Amazon Bedrock** | `settings.profile` + `settings.region` (credential chain da AWS) |
| **Google Vertex** | `gcloud auth application-default login` + `settings.project`/`location` |
| **OpenRouter** | `OPENROUTER_API_KEY` ou `/connect`; modelos `openrouter/...` |
| **GitHub Copilot** | `/connect` → device OAuth |

## ❓ Desafio prático

1. Conecte um provider com `/connect` e liste modelos com `opencode models`
2. Rode o mesmo prompt com `#low` e `#high` e compare qualidade x latência
3. Configure um provider OpenAI-compatível local (Ollama/LM Studio) e selecione um modelo
4. Veja o custo com `opencode stats --cost` após os testes

## 📚 Fonte oficial

- [Models](https://opencode.ai/v2/docs/models/) · [Providers](https://opencode.ai/v2/docs/providers/) · [CLI providers](https://opencode.ai/v2/docs/cli/providers/)

---

**Próximo passo:** [Módulo 02 — Intermediário](../modulo-02-intermediario/README.md) · [Voltar ao módulo](README.md)
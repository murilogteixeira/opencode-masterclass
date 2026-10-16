# 04. Busca web (Websearch)

## 🎯 Objetivo
Habilitar e controlar a busca na web para que o agente leia resultados atuais e cite fontes.

## 📋 Como funciona

```text
Encontre o último release do Bun e resuma as mudanças.
```

Na primeira busca, o OpenCode pede permissão e a escolha de provider; ele lembra a escolha para as próximas sessões.

## 🌐 Providers incluídos

| Provider | ID | Variável de ambiente |
|----------|----|----------------------|
| Exa | `exa` | `EXA_API_KEY` |
| Firecrawl | `firecrawl` | `FIRECRAWL_API_KEY` |
| Parallel | `parallel` | `PARALLEL_API_KEY` |
| Tavily | `tavily` | `TAVILY_API_KEY` |
| TinyFish | `tinyfish` | `TINYFISH_API_KEY` (opcional) |

Conecte via `/connect` ou exporte a variável antes de iniciar:

```bash
TAVILY_API_KEY=sua-chave opencode
```

## ⚙️ Escolher o provider

```jsonc
{
  "websearch": { "provider": "tavily" }
}
```

Use `"random"` para escolher um disponível automaticamente. Cada sessão mantém o provider até sofrer rate limit (HTTP 429) — então tenta outro e coloca o primeiro em cooldown (`Retry-After` ou 60s).

## 🔐 Permissões e desabilitar

```jsonc
{
  "permissions": [
    { "action": "websearch", "resource": "*", "effect": "ask" }
  ]
}
```

Para remover a ferramenta por completo:

```jsonc
{ "websearch": false }
```

## ❓ Desafio prático

1. Configure um provider com `/connect` e faça uma busca que cite fontes
2. Force `ask` na permissão `websearch` e confirme o prompt
3. Configure `"provider": "random"` e simule o fallback de rate limit
4. Desabilite a busca com `"websearch": false` e confirme que a ferramenta some

## 📚 Fonte oficial

- [Websearch](https://opencode.ai/v2/docs/websearch/)

---

**Próximo passo:** [Aula 05 — Contexto: referências e anexos](05-contexto-referencias-e-anexos.md) · [Voltar ao módulo](README.md)
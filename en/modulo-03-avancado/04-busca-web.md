# 04. Web search (Websearch)

## 🎯 Objective
Enable and control web search so the agent reads current results and cites sources.

## 📋 How it works

```text
Find the latest Bun release and summarize the changes.
```

On the first search, OpenCode asks for permission and a provider choice; it remembers the choice for later sessions.

## 🌐 Built-in providers

| Provider | ID | Environment variable |
|----------|----|----------------------|
| Exa | `exa` | `EXA_API_KEY` |
| Firecrawl | `firecrawl` | `FIRECRAWL_API_KEY` |
| Parallel | `parallel` | `PARALLEL_API_KEY` |
| Tavily | `tavily` | `TAVILY_API_KEY` |
| TinyFish | `tinyfish` | `TINYFISH_API_KEY` (optional) |

Connect with `/connect` or export the variable before starting:

```bash
TAVILY_API_KEY=your-key opencode
```

## ⚙️ Choosing the provider

```jsonc
{
  "websearch": { "provider": "tavily" }
}
```

Use `"random"` to pick an available one automatically. Each session keeps its provider until it is rate limited (HTTP 429) — then it tries another and puts the first in cooldown (`Retry-After`, or 60s).

## 🔐 Permissions and disabling

```jsonc
{
  "permissions": [
    { "action": "websearch", "resource": "*", "effect": "ask" }
  ]
}
```

To remove the tool entirely:

```jsonc
{ "websearch": false }
```

## ❓ Hands-on challenge

1. Configure a provider with `/connect` and run a search that cites sources
2. Force `ask` on the `websearch` permission and confirm the prompt
3. Set `"provider": "random"` and simulate the rate-limit fallback
4. Disable search with `"websearch": false` and confirm the tool disappears

## 📚 Official source

- [Websearch](https://opencode.ai/v2/docs/websearch/)

---

**Next step:** [Lesson 05 — Context: references and attachments](05-contexto-referencias-e-anexos.md) · [Back to module](README.md)
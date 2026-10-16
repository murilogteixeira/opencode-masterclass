# 06. MCP servers

## 🎯 Objetivo
Conectar o OpenCode a serviços externos via **Model Context Protocol (MCP)** — bancos de dados, documentação, APIs, ferramentas corporativas.

## 📋 O que é MCP

Um MCP server expõe **ferramentas** que o agente pode chamar. As ferramentas aparecem com a ação `<server>_<tool>`. Por padrão, o agente as alcança via `execute` (Code Mode); com `codemode: false` no servidor, elas são listadas diretamente.

## 🛠️ Configurar via CLI (preferido)

```bash
# servidor remoto (OAuth por padrão)
opencode mcp add context7 --url https://mcp.context7.com/mcp

# servidor local, no config global
opencode mcp add everything --global -- npx -y @modelcontextprotocol/server-everything

# com variável de ambiente
opencode mcp add everything --env LOG_LEVEL=debug -- npx -y @modelcontextprotocol/server-everything

# com header de auth
opencode mcp add context7 --url https://mcp.context7.com/mcp --header CONTEXT7_API_KEY=secret

# listar / autenticar / deslogar
opencode mcp list
opencode mcp auth sentry
opencode mcp logout sentry
```

> Servidores remotos usam **OAuth** por padrão. Se o `mcp list` indicar autenticação pendente, use `/mcps` na TUI para entrar. Nunca escreva um segredo literal — use `{env:VAR}`.

## ⚙️ Configuração por arquivo

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "playwright": {
        "type": "local",
        "command": ["bunx", "@playwright/mcp"]
      },
      "sentry": {
        "type": "remote",
        "url": "https://mcp.sentry.dev/mcp"
      }
    }
  }
}
```

A V2 agrupa servidores em `mcp.servers`, usa `disabled` (inverso de `enabled`) e separa timeouts: `timeout.catalog` e `timeout.execution`.

## 🔐 Permissões e policies

```jsonc
{
  "policies": [
    { "action": "integration.use", "resource": "mcp:*", "effect": "deny" },
    { "action": "integration.use", "resource": "mcp:github", "effect": "allow" }
  ]
}
```

Ferramentas de MCP respeitam a ação `<server>_<tool>` e podem ser negadas por policy: `{ "action": "tool.use", "resource": "github_delete_repository:*", "effect": "deny" }`.

## ✅ Verificação

```bash
opencode mcp list      # estado e conexão
```

Na TUI, `/mcps` mostra e permite conectar/deslogar servidores.

## ❓ Desafio prático

1. Adicione um MCP server local com `opencode mcp add` e confirme em `opencode mcp list`
2. Adicione um remoto com OAuth e autentique por `/mcps`
3. Negue temporariamente todos os MCP por policy e veja que as ferramentas somem
4. Peça ao agente para usar uma ferramenta do servidor e observe a chamada

## 📚 Fonte oficial

- [MCP servers](https://opencode.ai/v2/docs/mcp-servers/) · [CLI commands — mcp](https://opencode.ai/v2/docs/cli/commands/)

---

**Próximo passo:** [Aula 07 — APIs externas e dados](07-apis-e-dados.md) · [Voltar ao módulo](README.md)
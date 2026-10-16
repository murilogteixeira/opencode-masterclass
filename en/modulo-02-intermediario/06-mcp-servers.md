# 06. MCP servers

## 🎯 Objective
Connect OpenCode to external services via the **Model Context Protocol (MCP)** — databases, documentation, APIs, corporate tools.

## 📋 What is MCP

An MCP server exposes **tools** the agent can call. The tools appear with the action `<server>_<tool>`. By default the agent reaches them through `execute` (Code Mode); with `codemode: false` on the server, they are listed directly.

## 🛠️ Configure via CLI (preferred)

```bash
# remote server (OAuth by default)
opencode mcp add context7 --url https://mcp.context7.com/mcp

# local server, in the global config
opencode mcp add everything --global -- npx -y @modelcontextprotocol/server-everything

# with an environment variable
opencode mcp add everything --env LOG_LEVEL=debug -- npx -y @modelcontextprotocol/server-everything

# with an auth header
opencode mcp add context7 --url https://mcp.context7.com/mcp --header CONTEXT7_API_KEY=secret

# list / authenticate / log out
opencode mcp list
opencode mcp auth sentry
opencode mcp logout sentry
```

> Remote servers use **OAuth** by default. If `mcp list` reports pending authentication, use `/mcps` in the TUI to sign in. Never write a literal secret — use `{env:VAR}`.

## ⚙️ File configuration

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

V2 groups servers under `mcp.servers`, uses `disabled` (the inverse of `enabled`) and separates timeouts: `timeout.catalog` and `timeout.execution`.

## 🔐 Permissions and policies

```jsonc
{
  "policies": [
    { "action": "integration.use", "resource": "mcp:*", "effect": "deny" },
    { "action": "integration.use", "resource": "mcp:github", "effect": "allow" }
  ]
}
```

MCP tools honor the `<server>_<tool>` action and can be denied by policy: `{ "action": "tool.use", "resource": "github_delete_repository:*", "effect": "deny" }`.

## ✅ Verification

```bash
opencode mcp list      # state and connection
```

In the TUI, `/mcps` shows and lets you connect/log out servers.

## ❓ Hands-on challenge

1. Add a local MCP server with `opencode mcp add` and confirm it in `opencode mcp list`
2. Add a remote one with OAuth and authenticate via `/mcps`
3. Temporarily deny all MCP by policy and see the tools disappear
4. Ask the agent to use a server tool and watch the call

## 📚 Official source

- [MCP servers](https://opencode.ai/v2/docs/mcp-servers/) · [CLI commands — mcp](https://opencode.ai/v2/docs/cli/commands/)

---

**Next step:** [Lesson 07 — External APIs & data](07-apis-e-dados.md) · [Back to module](README.md)
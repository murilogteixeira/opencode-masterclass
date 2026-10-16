# 03. Permissions & Policies

## 🎯 Objective
Control what the agent can do with **permissions** (per agent, with ask/deny) and **policies** (binary, never ask, only restrict).

## 🧩 Permissions vs Policies

| | Permissions (`permissions`) | Policies (`policies`) |
|---|---|---|
| Effects | `allow`, `ask`, `deny` | `allow`, `deny` (never asks) |
| Scope | Rules per action/tool | Can remove a provider/MCP/skill/plugin |
| Role | Decides the agent's flow | Tightens what permissions would allow |

## 📋 Permissions — ordered rules

```jsonc
{
  "permissions": [
    { "action": "shell", "resource": "git push *", "effect": "ask" },
    { "action": "read", "resource": ".env*", "effect": "deny" }
  ]
}
```

- **The last matching rule wins** → broad rules first, exceptions after
- `*` matches zero or more characters; `?` matches one

### Common actions

| Action | Covers |
|--------|--------|
| `shell` | Shell commands |
| `edit` | Edit/create/patch |
| `read`, `glob`, `grep` | Local discovery |
| `subagent` | Child agents |
| `webfetch`, `websearch` | Web tools |
| `skill` | Loading skills |
| `external_directory` | Access outside the project/worktree |

> ⚠️ In V2, `external_directory` is **allowed by default** (unlike V1). To require approval: `{ "action": "external_directory", "resource": "*", "effect": "ask" }`.

### Per agent

The same rules can live under `agents.<id>.permissions` to apply to a single agent.

## 🛡️ Policies — binary restriction

```jsonc
{
  "policies": [
    { "action": "provider.use", "resource": "*", "effect": "deny" },
    { "action": "provider.use", "resource": "anthropic", "effect": "allow" },
    { "action": "tool.use", "resource": "shell:git push *", "effect": "deny" },
    { "action": "integration.use", "resource": "mcp:*", "effect": "deny" }
  ]
}
```

| Action | Resource | Removes |
|--------|----------|---------|
| `provider.use` | Provider ID | Provider (disappears from the catalog, even with credentials) |
| `tool.use` | `<action>:<value>` | A specific permission check |
| `integration.use` | `mcp:<name>`, `skill:<id>`, `plugin:<pkg>` | An integration |

### Precedence (policies invert the normal rule)

**Broader** configuration is evaluated last, overriding specific rules:

1. Connected Console (highest authority)
2. macOS managed preferences
3. System (`/etc/opencode`)
4. Global (`~/.config/opencode`)
5. Direct `opencode.json`
6. `.opencode/opencode.json` (lowest)

In other words: a repository **cannot** re-enable a provider you denied globally.

```jsonc title="~/.config/opencode/opencode.jsonc"
{ "policies": [{ "action": "provider.use", "resource": "openai", "effect": "deny" }] }
```

## ❓ Hands-on challenge

1. Force `ask` on `git push *` and check that the push asks for approval
2. Deny reading `.env*` and confirm the agent cannot read it
3. Create a policy that denies `shell:*` for a review agent and allows only `shell:git status *`
4. Deny a provider via policy and see it disappear from `/models`

## 📚 Official source

- [Permissions](https://opencode.ai/v2/docs/permissions/) · [Policies](https://opencode.ai/v2/docs/policies/)

---

**Next step:** [Lesson 04 — Tools](04-ferramentas.md) · [Back to module](README.md)
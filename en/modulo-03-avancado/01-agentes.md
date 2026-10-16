# 01. Creating Custom Agents

## 🎯 Objective
Create custom agents in OpenCode — Markdown files with frontmatter that combine a system prompt, model, mode and permissions.

## 📋 How an agent is defined

An OpenCode agent combines:
- **System prompt** — the body of the Markdown file
- **Preferred model** — `provider/model` with an optional variant (`#high`)
- **Mode** — `primary`, `subagent` or `all`
- **Permissions** — ordered rules of `allow` / `ask` / `deny`
- **Display details** — `description`, `color`, `hidden`

### Discovery locations

```text
~/.config/opencode/agents/<name>.md   # global (all projects)
.opencode/agents/<name>.md            # project
```

Nested paths become part of the ID: `.opencode/agents/team/reviewer.md` → agent `team/reviewer`.

## 🧪 Example: read-only reviewer agent

```md title=".opencode/agents/reviewer.md"
---
description: Reviews changes for correctness and regressions
mode: subagent
model: anthropic/claude-sonnet-4-5#high
permissions:
  - action: edit
    resource: "*"
    effect: deny
  - action: shell
    resource: "*"
    effect: deny
---

Review the current changes. List findings in severity order with file and line references.
```

Use it:

```text
Use the reviewer subagent to review my current changes.
```

Or in automation:

```bash
opencode run --agent reviewer "Review the current changes"
```

## 🧭 Available modes

| Mode | Behavior |
|------|----------|
| `primary` | Main agent for the session (default for new custom agents) |
| `subagent` | Runs only in a child session, via the `subagent` tool |
| `all` | Serves both cases |

## 🛡️ Permissions

Ordered rules — **the last matching rule wins**, so broad rules come before exceptions:

```jsonc
{
  "agents": {
    "reviewer": {
      "permissions": [
        { "action": "*", "resource": "*", "effect": "deny" },
        { "action": "read", "resource": "src/**", "effect": "allow" },
      ],
    },
  },
}
```

Common actions: `shell`, `edit`, `subagent`, `read`, `glob`, `grep`, `webfetch`, `websearch`, `skill`.

## ⚠️ Legacy fields — do not use

Do not use `temperature`, `top_p`, `prompt`, `permission`, `tools`, `disable` or `maxSteps` in V2 agents. To configure temperature, prefer `request.body` on the agent or the provider/model settings.

## ❓ Hands-on challenge

1. Create `.opencode/agents/reviewer-en.md` in one of your projects, in the format above
2. Set `mode: subagent` and deny `edit` and `shell`
3. In the body, write a system prompt that asks for a review in English
4. Run `opencode run --agent reviewer-en "Review the last commit"` and observe the restrictions

> Ready-made example in [`exemplos/agents/revisor.md`](../../modulo-03-avancado/exemplos/agents/revisor.md) — copy it into your test project's `.opencode/agents/`.

## 📚 Official source

- [Agents guide](https://opencode.ai/v2/docs/agents/)
- [Permissions](https://opencode.ai/v2/docs/permissions/)

---

**Next step:** [Lesson 02 — Plugins](02-plugins.md) · [Back to module](README.md)
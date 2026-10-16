# 🧾 OpenCode Cheat Sheet

A quick reference of the most used OpenCode (V2) commands, configuration and snippets. Based on the [official documentation](https://opencode.ai/v2/docs/).

---

## 📦 Installation

```bash
curl -fsSL https://opencode.ai/v2/install | bash      # native binary
npm install -g @opencode/cli                          # npm
brew install anomalyco/tap/opencode-v2                # Homebrew (macOS/Linux)
mise use -g opencode                                  # mise (>= 2026.10.9)
```

## 🖥️ Interfaces

| Command | What it does |
|---------|--------------|
| `opencode` | Full-screen TUI |
| `opencode mini` | Minimal interface |
| `opencode run "prompt"` | Headless (scripts/CI) |
| `opencode serve` | API/web server |
| `opencode pair` | Pairing links (browser/app) |
| `opencode acp` | ACP server (editors) |

## ⌨️ TUI — essential shortcuts

| Action | Shortcut |
|--------|----------|
| Command palette | `Ctrl+P` |
| Switch model | `Ctrl+X` → `M` |
| Switch agent | `Ctrl+X` → `A` / `Shift+Tab` |
| New session | `Ctrl+X` → `N` |
| List sessions | `Ctrl+X` → `L` |
| Undo / Redo | `Ctrl+X` → `U` / `Ctrl+X` → `R` |
| Attach file | `@file` (e.g. `@src/auth.ts#20-45`) |
| Shell mode | `!command` |
| External editor | `Ctrl+X` → `E` |
| Leader key | `Ctrl+X` (default) |

## 🤖 `opencode run` (headless)

```bash
opencode run --model anthropic/claude-sonnet-4-5 "Refactor parseToken"
opencode run --continue "Now handle the expired case"
opencode run --format json "List the TODOs" | jq
opencode run --file src/server.ts "Review for bugs"
opencode run --agent build "Fix the failing test"
opencode run --standalone "Review the diff"          # private server (CI)
```

## 🧰 CLI

```bash
opencode auth login                       # connect a provider
opencode auth list                        # saved credentials
opencode models                           # available models
opencode mcp add context7 --url https://mcp.context7.com/mcp
opencode mcp list
opencode plugin add opencode-acme-plugin@1.2.0
opencode session list --format json
opencode stats --cost                      # cost and tokens
opencode service status                    # background service health
opencode reload                            # reload config without restarting
opencode upgrade
opencode debug paths | opencode debug config
```

## ⚙️ Configuration (`opencode.jsonc`)

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "permissions": [
    { "action": "shell", "resource": "git push *", "effect": "ask" },
    { "action": "read", "resource": ".env*", "effect": "deny" }
  ],
  "policies": [{ "action": "provider.use", "resource": "*", "effect": "deny" }],
  "instructions": ["CONTRIBUTING.md"],
  "formatter": true
}
```

Locations: `/etc/opencode` · `~/.config/opencode/opencode.json(c)` · `<project>/opencode.json(c)` · `<project>/.opencode/opencode.json(c)`
Secrets: `{env:VAR}` and `{file:path}`. **Terminal preferences** live in `~/.config/opencode/cli.json` (theme, keybinds, tabs).

## 🧑‍💻 Custom agent (`.opencode/agents/<name>.md`)

```md
---
description: Reviews changes (read-only)
mode: subagent
model: anthropic/claude-sonnet-4-5#high
permissions:
  - action: edit
    resource: "*"
    effect: deny
---

Review the changes. List findings by severity.
```

## ⚡ Commands (`.opencode/commands/<name>.md`)

```md
---
description: Reviews the diff
agent: plan
---

Review $ARGUMENTS. Use the diff:

!`git diff --stat && git diff`
```

## 🧠 Skills (`.opencode/skills/<id>/SKILL.md`)

```md
---
name: Git Release
description: Prepares release notes and version bumps
---

1. Read `references/policy.md`.
2. Summarize the changes since the last tag.
```

## 🔌 MCP servers

```jsonc
{ "mcp": { "servers": { "playwright": { "type": "local", "command": ["bunx", "@playwright/mcp"] } } } }
```

## 🛡️ Permissions and Policies

- **Permissions** decide `allow` / `ask` / `deny` — the **last matching rule wins** (broad first, exceptions last)
- **Policies** are binary (`allow`/`deny`), never ask, and only restrict (provider, tool, mcp/skill/plugin)
- Common actions: `shell`, `edit`, `read`, `glob`, `grep`, `subagent`, `webfetch`, `websearch`, `skill`, `external_directory`

## 🚀 CI (GitHub Actions)

```yaml
- run: npm install --global @opencode/cli
- run: opencode run --standalone --model anthropic/claude-sonnet-4-5 "Review this PR"
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

## 🌐 API

```bash
opencode api get /api/info
opencode api session.list --param limit=10
opencode api session.create --data '{"title":"New session"}'
```

## 🔧 Troubleshooting

```bash
opencode service status            # service healthy?
opencode api get /api/info         # health check
opencode --standalone              # isolate from the shared service
# logs: ~/.local/share/opencode/log/opencode.log
OPENCODE_LOG_LEVEL=DEBUG opencode run "case"
```

---

📚 References: [Config](https://opencode.ai/v2/docs/config/) · [CLI](https://opencode.ai/v2/docs/cli/) · [Agents](https://opencode.ai/v2/docs/agents/) · [Commands](https://opencode.ai/v2/docs/commands/) · [Skills](https://opencode.ai/v2/docs/skills/) · [Plugins](https://opencode.ai/v2/docs/plugins/) · [Permissions](https://opencode.ai/v2/docs/permissions/) · [Policies](https://opencode.ai/v2/docs/policies/)
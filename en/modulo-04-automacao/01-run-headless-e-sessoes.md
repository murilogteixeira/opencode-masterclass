# 01. `opencode run` and session management

## 🎯 Objective
Use OpenCode without an interface: run prompts, choose a model/agent, get JSON output and manage sessions from the CLI.

## 📋 `opencode run` — headless

```bash
# direct answer in the terminal
opencode run "Explain this repository"

# choose the model (without changing the default)
opencode run --model anthropic/claude-sonnet-4-5 "Refactor parseToken"

# continue the last session
opencode run --continue "Now handle the expired token case"

# JSON output (newline-delimited) for scripts
opencode run --format json "List the TODO comments"

# attach files to the prompt
opencode run --file src/server.ts --file src/client.ts "Review this for bugs"

# run with a specific agent
opencode run --agent build "Fix the failing test"

# private server (CI, isolation)
opencode run --standalone "Review the diff"
```

## 🖥️ Other non-graphical interfaces

| Command | What it does |
|---------|--------------|
| `opencode` | Full-screen TUI |
| `opencode mini` | Minimalist interactive interface (`--continue`, `--model`, `--prompt`) |
| `opencode serve` | API/web server |
| `opencode pair` | Pairing links (browser/app) with QR |
| `opencode acp` | ACP server for editors |

## 🗂️ Sessions

```bash
opencode session list
opencode session list --max-count 20 --format json
opencode session export ses_4f2a1c
opencode session export ses_4f2a1c --sanitize      # removes sensitive data
opencode session import session.json --directory ~/code/projeto
opencode session delete ses_9c1b08                 # also removes child sessions
```

## 📊 Statistics

```bash
opencode stats              # usage statistics
opencode stats --days 7
opencode stats --models
opencode stats --cost
opencode stats --json
```

## 🔧 Maintenance

```bash
opencode service status      # background service status
opencode reload              # reloads config without restarting the server
opencode upgrade             # updates OpenCode
opencode uninstall --dry-run # previews the removal
opencode debug paths         # paths (db, config, log…)
```

## ❓ Hands-on challenge

1. Run `opencode run --format json "List the TODOs" | jq` in your project
2. Chain two calls with `--continue`
3. Export a session with `--sanitize` and inspect the JSON
4. Measure the cost of a task with `opencode stats --cost`

## 📚 Official source

- [CLI commands](https://opencode.ai/v2/docs/cli/commands/) · [CLI](https://opencode.ai/v2/docs/cli/)

---

**Next step:** [Lesson 02 — CI/CD](02-ci-cd.md) · [Back to module](README.md)

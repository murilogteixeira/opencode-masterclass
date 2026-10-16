# 🧭 Study path

How to go through the **OpenCode Masterclass** with the best results.

## Prerequisites

| Level | You need |
|-------|----------|
| All | A terminal (Linux, macOS or WSL2) and command-line basics |
| Modules 2–3 | A Git project to practice with; Node.js is useful for plugins |
| Modules 4–6 | CI/CD basics, Git/GitHub, and (for the SDK) TypeScript/Node |
| Provider | An account with a model provider **or** a local Ollama/LM Studio |

## Suggested order

```text
M01 Fundamentals ─► M02 Customization ─► M03 Extensions
        │                                      │
        └───────────────┬──────────────────────┘
                        ▼
                 M04 Automation ─► M05 Integration ─► M06 Operations
                                        │
                                        ▼
                              Capstone projects
```

1. **M01 — Fundamentals** (5 lessons): install, master the TUI, configure and connect models. *Do not skip.*
2. **M02 — Customization** (7 lessons): instructions, commands, permissions/policies, tools, skills, MCP and APIs.
3. **M03 — Extensions** (5 lessons): agents, plugins (use + create + RPC), web search and external context.
4. **M04 — Automation** (3 lessons): headless `run`, sessions and CI/CD with GitHub Actions.
5. **M05 — Integration** (4 lessons): HTTP API, JS client, SDK/Effect/Cloudflare and ACP/Web/remote.
6. **M06 — Operations** (5 lessons): diagnostics, context/cost, enterprise Console and V1→V2 migration.
7. **Capstone projects** (3): PR reviewer, optimization and deploy.

## Suggested pace

| Profile | Pace | Duration |
|---------|------|----------|
| Dedicated beginner | 1–2 lessons/day | ~3 weeks |
| Practitioner | 1 module/week | ~7 weeks |
| Quick review | Tracks 02 → 05 skipping examples | ~1 week |

> **Golden rule:** do each lesson's **hands-on challenge** and commit once per lesson. Learning OpenCode is learning by doing.

## Checkpoints

- [ ] **Milestone 1 (end of M01):** `opencode run` answers and you connected a model
- [ ] **Milestone 2 (end of M02):** you have `AGENTS.md`, a slash command and a skill in your project
- [ ] **Milestone 3 (end of M03):** you created a read-only agent and a simple plugin
- [ ] **Milestone 4 (end of M04):** a PR gets an automatic review in CI
- [ ] **Milestone 5 (end of M05):** a script uses the JS client or the SDK
- [ ] **Milestone 6 (end of M06):** you can diagnose cost, context and problems
- [ ] **Capstone:** an automatic PR reviewer in production

## If you already know OpenCode

Jump straight to what interests you:

- Just want commands → [`CHEATSHEET.md`](../CHEATSHEET.md)
- Automation/CI → [Module 04](../modulo-04-automacao/README.md)
- Build plugins/SDK → [Module 03](../modulo-03-avancado/README.md) and [Module 05](../modulo-05-integracao/README.md)
- Enterprise/Console → [Module 06](../modulo-06-operacao/README.md)
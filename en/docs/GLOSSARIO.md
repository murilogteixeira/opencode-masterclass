# 📖 Glossary

Terms used throughout the **OpenCode Masterclass**. Based on the [official documentation](https://opencode.ai/v2/docs/).

## Core concepts

| Term | Meaning |
|------|---------|
| **OpenCode** | Open source AI coding agent. Runs in TUI, desktop and web. |
| **Agent** | Assistant profile with a system prompt, model, mode and permissions. Can be `primary` or `subagent`. |
| **TUI** | Full-screen terminal interface (`opencode`). |
| **Mini** | Minimal interactive interface (`opencode mini`). |
| **Headless** | Execution without an interface (`opencode run`), for scripts and CI. |
| **Session** | A conversation with the agent; keeps history and can have subagents (children). |
| **Background service** | Shared server that owns sessions, config, plugins and tool execution. |

## Configuration

| Term | Meaning |
|------|---------|
| **`opencode.json(c)`** | Server/project configuration (model, agents, permissions…). |
| **`cli.json`** | Terminal **client-only** configuration (theme, keybinds…). |
| **`AGENTS.md`** | Project instructions file, loaded automatically. |
| **Instructions** | Extra files/globs (`instructions`) besides `AGENTS.md`. |

## Customization

| Term | Meaning |
|------|---------|
| **Command** | Reusable prompt as `/name` (`.opencode/commands/`). |
| **Skill** | On-demand instructions for a task (`.opencode/skills/`). |
| **Tool** | Built-in tool (`read`, `grep`, `edit`, `shell`, `subagent`…). |
| **Permission** | Per-agent rule with effect `allow` / `ask` / `deny`. |
| **Policy** | Binary rule (`allow`/`deny`), never asks; only restricts. |
| **Provider** | Source of models (Anthropic, OpenAI, Ollama, custom…). |
| **Model** | Identified by `provider/model` (+ variant `#high`). |
| **Variant** | Named option of a model (e.g. reasoning effort). |

## Extensions and integration

| Term | Meaning |
|------|---------|
| **Plugin** | Code that adds tools, hooks, transforms and RPC. |
| **Hook** | Intercepts operations (prompt, model calls, HTTP…). |
| **Transform** | Synchronous edit of a domain's state (agents, models…). |
| **MCP** | Model Context Protocol — connects the agent to external services. |
| **Reference** | Named access to directories/repos outside the project. |
| **Attachment** | File attached to a prompt. |
| **ACP** | Agent Client Protocol — editor integration. |
| **SDK** | `@opencode/sdk` — hosts OpenCode in-process. |
| **Client** | `@opencode/client` — connects to an OpenCode over the network. |

## Operations

| Term | Meaning |
|------|---------|
| **Compaction** | Context compaction (local or provider-native). |
| **Snapshot** | Before/after capture per step; enables `/undo`/`/redo`. |
| **Warming** | Periodic requests to keep provider caches warm. |
| **Worktree** | Isolated copy of the repo for parallel/risky work. |
| **Console** | Enterprise service: workspaces, budgets, policies, Go. |
| **Go / Go Plus** | Subscriptions ($10/$40 per month) for open source models. |

## Course levels

- 🟢 **Beginner** — Module 01
- 🔵 **Intermediate** — Module 02
- 🟠 **Advanced** — Modules 03 and 04
- 🟣 **Specialist** — Modules 05, 06 and Capstone projects
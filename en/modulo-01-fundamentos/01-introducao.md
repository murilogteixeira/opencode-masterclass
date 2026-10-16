# 01. Introduction to OpenCode

## 🎯 Objective
Understand what OpenCode is, which interfaces and components it offers, and how the course is organized.

## 📋 What is OpenCode?

OpenCode is an **open source AI coding agent**, available as:

| Interface | How to use | Description |
|-----------|-----------|-------------|
| **TUI** (terminal) | `opencode` | Full-screen terminal interface — the main one for daily use |
| **Mini** | `opencode mini` | Minimal interactive interface, in the terminal |
| **Desktop** | Desktop app | Graphical application with a visual editor |
| **Web** | `opencode pair` | Browser access, with a pairing link/QR |
| **Headless CLI** | `opencode run "..."` | Automation, scripts and CI, without an interactive interface |

### Client–server architecture

OpenCode runs a **background service** that owns sessions, configuration, plugins, permissions, and tool execution. The interfaces (TUI, desktop, web) are clients of that service.

```bash
opencode service status    # check the service state
opencode service restart   # restart it if behavior looks odd
```

### Built-in agents

| Agent | Mode | Purpose |
|-------|------|---------|
| **Build** (`build`) | `primary` | Default coding agent — can edit files |
| **Plan** (`plan`) | `primary` | Explores and plans without editing project files |
| **General** (`general`) | `subagent` | Research and multi-step work with broad tool access |
| **Explore** (`explore`) | `subagent` | Searches and reads code/web without editing |

In Module 03 you will create **custom agents** reusing these concepts.

### Why learn OpenCode?

- Automate coding tasks with an agent that reads, edits, and executes in your project
- Headless automation in CI (`opencode run`) and integration via HTTP API and SDK
- Declarative, versionable configuration (`opencode.json`, `AGENTS.md`, Markdown agents)

## 💡 Try it now (if you already have OpenCode installed)

```bash
opencode                       # opens the TUI
opencode run "Explain this repository"   # direct answer in the terminal
```

If you haven't installed it yet, go to [Lesson 02 — Setup](02-setup-ambiente.md).

## 📚 Official source

- [Docs V2](https://opencode.ai/v2/docs/)
- [CLI guide](https://opencode.ai/v2/docs/cli/)
- [Agents guide](https://opencode.ai/v2/docs/agents/)

---

**Next step:** [Lesson 02 — Setup & Installation](02-setup-ambiente.md) · [Back to module](README.md)
# 04. Tools

## 🎯 Objective
Get to know OpenCode's built-in tool catalog and how to ask for outcomes that make the agent use them well.

## 📋 How to ask

Describe the **outcome** and OpenCode chooses the tools — or name the tool when you want a specific path.

```text
Find where request timeouts are configured, change the default to 30s, and run the relevant tests.
Use grep to find every reference to DEFAULT_TIMEOUT, then read the matching files.
```

## 📂 Files

| Tool | What it does | Permission |
|------|--------------|------------|
| `read` | Reads a file or lists a directory (non-recursive); pages with `offset`/`limit` | `read` |
| `glob` | Finds paths by pattern (`**/*.ts`) | `glob` |
| `grep` | Searches contents (regex or literal); returns file/line/snippet | `grep` |
| `edit` | Replaces an exact snippet in a file | `edit` |
| `write` | Creates/overwrites a file | `edit` |
| `patch` | Applies a multi-file patch (add/update/move/delete) | `edit` |

Typical limits: `read` up to 2,000 lines/50 KiB per page and images/PDFs up to 20 MiB; `glob`/`grep` with a default limit of 100 and a 30s timeout.

## 🖥️ Shell

`shell` runs in the user's shell. Use `workdir` instead of `cd`; `timeout` in ms (2 min foreground default); `background: true` for long-running processes.

```text
Run bun test in packages/core with a five-minute timeout.
```

> ⚠️ The shell has the user's authority (filesystem, network, processes). Use narrow rules in [Permissions](03-permissoes-e-policies.md).

## 🌐 Web

| Tool | What it does |
|------|--------------|
| `webfetch` | Fetches an HTTP(S) URL as `markdown`/`text`/`html` (timeout up to 120s) |
| `websearch` | Searches the web (see [Web search](../../modulo-03-avancado/04-busca-web.md)) |

## 💬 Interaction

- `question` — pauses and presents questions with choices
- `skill` — loads a skill's instructions into context (see [Skills](05-skills.md))

## 🤖 Automation

| Tool | What it does |
|------|--------------|
| `subagent` | Starts a child session with a subagent (foreground or `background`) |
| `execute` | Runs JavaScript in Code Mode to call/combine tools — useful for parallelizing |
| `opencode.*` | Session utilities and **worktrees** (`worktree_create/list/remove`, `session_rename/move`) |
| `browser.*` | Controls the desktop app browser (snapshots, clicks, screenshots, audits) |

## 🧩 Extensions

- **MCP servers** add per-server tools (action `<server>_<tool>`) — see [MCP](06-mcp-servers.md)
- **Skills** add instructions (not executable tools)
- **References/Attachments** bring in external content without bypassing permissions

## ❓ Hands-on challenge

1. Ask for a task that uses `grep` + `read` + `edit` and watch the calls
2. Run two independent commands in parallel by asking explicitly
3. Use `background: true` on a dev server and confirm the completion notification
4. Create a worktree with the `opencode` namespace and move the session into it

## 📚 Official source

- [Tools](https://opencode.ai/v2/docs/tools/)

---

**Next step:** [Lesson 05 — Skills](05-skills.md) · [Back to module](README.md)
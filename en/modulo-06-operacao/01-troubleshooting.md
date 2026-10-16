# 01. Troubleshooting

## 🎯 Objective
Diagnose problems by separating **client**, **background service** and **project**, and collect evidence safely.

## 🧭 The three places where a problem lives

1. **Client** (TUI/CLI)
2. Shared **background server** (sessions, providers, plugins, permissions, tool execution)
3. Specific **project/configuration**

## 🔍 Step by step

```bash
# 1) is the service healthy?
opencode service status
opencode api get /api/info

# 2) isolate from the shared service: run with a private server
opencode --standalone

# 3) useful paths
opencode debug paths
opencode debug config
```

Restarting the service fixes most hangs:

```bash
opencode service restart
opencode service status
```

## 🧾 Logs

Main log: `~/.local/share/opencode/log/opencode.log`

- Filter `role=cli` for client startup
- Filter `role=server` for sessions, providers, plugins, permissions and tools
- Reproduce once with verbosity:

```bash
OPENCODE_LOG_LEVEL=DEBUG opencode run "your case"
```

## 🧪 Minimal reproduction

Reduce the case to the smallest command that still fails (`opencode --standalone`, a single prompt, a single file). This separates config bugs from environment bugs.

## 🔐 Safety when sharing

> Remove **API keys, authorization headers, prompts, file contents** and other sensitive data before sharing logs.

## ⚠️ Do not do during diagnosis

- Do not delete or edit the database, the service registry or the service config
- Back up persistent data before inspecting it with external tools
- Prefer `/connect` or `auth` to manage credentials — never edit the database

## 🐞 Reporting bugs

If behavior **supported in V1** does not work in V2, treat it as a compatibility bug and report it (see the report skill / the troubleshooting guide).

## ❓ Hands-on challenge

1. Force an error (e.g. a non-existent model) and find the line in the log
2. Run `opencode --standalone` to isolate it and compare
3. Collect `opencode debug config` and identify the precedence in effect
4. Sanitize a log (remove keys) and write a bug report

## 📚 Official source

- [Troubleshooting](https://opencode.ai/v2/docs/troubleshooting/)

---

**Next step:** [Lesson 02 — Context, snapshots, warming and network](02-contexto-snapshots-warming-e-rede.md) · [Back to module](README.md)

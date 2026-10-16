# 01. HTTP API

## 🎯 Objective
Talk directly to the OpenCode server's HTTP API — the same one the TUI uses.

## 📋 Overview

The server exposes an HTTP API described by an OpenAPI document at `/openapi.json`. Use the built-in `api` command, which reuses the TUI's discovery and authentication (and can start the background service):

```bash
opencode api get /api/info
```

Calls using method + path:

```bash
opencode api post /api/example --data '{"key":"value"}'
opencode api get /api/example --header 'X-Example:value'
```

Or use the **operation ID** with `--param`:

```bash
opencode api session.list --param limit=10
opencode api session.create --data '{"title": "New session"}'
```

- Request bodies assume `Content-Type: application/json`
- `--data`/`-d` sends the body; `--header`/`-H` adds headers

## 🧪 Health check

```bash
opencode api get /api/info
```

A successful response confirms the client↔service connection and is the standard health check in deployments.

## 🔌 Server

```bash
opencode serve
opencode serve --hostname 0.0.0.0 --port 4096 --cors https://app.example.com
```

When connected to an explicit server, use the same configured authentication context instead of assembling an unauthenticated request.

## 🧰 Supporting tools

```bash
opencode service status        # is the background service healthy?
opencode debug paths db        # database path (sessions/credentials)
```

## ❓ Hands-on challenge

1. Run `opencode api get /api/info` and confirm it is healthy
2. List sessions by path and by operation ID
3. Create a session with `--data` and retrieve it
4. Start `opencode serve` with `--cors` and call it from a script

## 📚 Official source

- [API](https://opencode.ai/v2/docs/api/) · [CLI — api](https://opencode.ai/v2/docs/cli/commands/)

---

**Next step:** [Lesson 02 — JavaScript Client](02-cliente-javascript.md) · [Back to module](README.md)

# 02. Context, snapshots, warming and network

## 🎯 Objective
Control the context lifecycle (compaction, snapshots), the provider state (warming) and the network (proxy).

## 🧠 Compaction (context)

Automatic context compaction; there is also native compaction per provider/model.

```jsonc
{
  "compaction": {
    "auto": true,
    "keep": { "tokens": 15000 },
    "buffer": 20000
  }
}
```

- `keep.tokens` retains a tail of recent context
- A model can override the provider: `providers.openai.models."gpt-4.1".settings.compaction.type = "summary"`

## ↩️ Snapshots (file + conversation undo/redo)

Enabled by default. Each model step captures snapshots before and after, allowing `/undo`/`/redo` to restore files.

```jsonc
{ "snapshots": false }
```

- Cover tracked and untracked files (≤ 2 MiB) in the active directory, inside a Git worktree
- Do **not** revert shell effects (processes, networks, commits, ignored files)
- They are a convenience, not a backup: commit important work before `/undo`

## 🌡️ Warming (keeping caches warm)

Sends periodic requests to preserve provider caches between prompts. **Disabled by default.**

```jsonc
{
  "warming": {
    "prompt": "Do no work. Answer exactly: OK",
    "interval": "5 minutes",
    "duration": "1 hour"
  }
}
```

- Warming requests are **real**: they consume tokens, cost money and count toward the rate limit
- Use it only when the cache benefit outweighs the cost

## 🌐 Network and proxy

```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
export NO_PROXY=localhost,127.0.0.1,::1
opencode
```

- **`NO_PROXY` with loopback is mandatory**: the CLI talks to the local service over HTTP
- Persist it for the background service: `opencode service set env HTTPS_PROXY ...`
- Private CA: `NODE_EXTRA_CA_CERTS=/etc/company/ca.pem`
- Verify: `opencode api get /api/info`

## 🧹 Other output controls

```jsonc
{
  "tool_output": { "max_lines": 2000, "max_bytes": 51200 },
  "media": { "image": { "auto_resize": true, "max_width": 2000 } }
}
```

## ❓ Hands-on challenge

1. Enable `compaction` and run a long session; then use `/undo`
2. Turn off `snapshots` and confirm that `/undo` does not restore files
3. Configure `warming` with a short interval and watch `opencode stats --cost`
4. Configure a proxy with a loopback `NO_PROXY` and validate the health check

## 📚 Official source

- [Compaction](https://opencode.ai/v2/docs/compaction/) · [Snapshots](https://opencode.ai/v2/docs/snapshots/) · [Warming](https://opencode.ai/v2/docs/warming/) · [Network](https://opencode.ai/v2/docs/network/)

---

**Next step:** [Lesson 03 — Cost and statistics](03-custo-e-estatisticas.md) · [Back to module](README.md)

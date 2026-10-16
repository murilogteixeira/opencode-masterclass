# 04. Project configuration and CLI settings

## 🎯 Objective
Understand the difference between **server/project configuration** (`opencode.json(c)`) and **terminal client configuration** (`cli.json`), and use both.

## 🧩 Two distinct configurations

| File | Controls | Scope |
|------|----------|-------|
| `opencode.json(c)` | Server and project: model, agents, commands, permissions, MCP, providers, formatters... | Global/system/project |
| `cli.json` | Terminal client only: theme, keybinds, tabs, diffs, sounds, mini... | User-global |

> Rule of thumb: no theme/keybind goes in `opencode.json`; no model/agent/permission goes in `cli.json`.

## 📋 `opencode.json(c)` — server and project

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "permissions": [
    { "action": "shell", "resource": "git push *", "effect": "ask" }
  ]
}
```

> Full commented example: [`exemplos/opencode.jsonc`](../../modulo-01-fundamentos/exemplos/opencode.jsonc).

### Locations and precedence

```
/etc/opencode/opencode.json                # system (Linux)
~/.config/opencode/opencode.json           # user-global
<project>/opencode.json                    # project
<project>/.opencode/opencode.json          # project (.opencode overrides the direct file)
```

The search goes up from the current directory to the filesystem root. Discovered `.opencode` configs override direct configs. System and managed preferences have the highest precedence.

### Common fields

`model`, `default_agent`, `permissions`, `policies`, `agents`, `commands`, `plugins`, `providers`, `mcp`, `skills`, `instructions`, `references`, `formatter`, `shell`, `update`, `watcher`, `compaction`, `warming`, `snapshots`, `media`, `tool_output`, `websearch`, `worktree`.

### Variables and secrets

```jsonc
{
  "model": "{env:OPENCODE_MODEL}",
  "providers": {
    "anthropic": { "settings": { "apiKey": "{env:ANTHROPIC_API_KEY}" } }
  }
}
```

- `{env:VAR}` substitutes an environment variable
- `{file:path}` inserts the contents of a file (good for keys kept out of Git)

## 🎛️ `cli.json` — terminal client

```jsonc title="~/.config/opencode/cli.json"
{
  "$schema": "https://opencode.ai/v2/cli.json",
  "theme": { "name": "tokyonight", "mode": "system" },
  "keybinds": { "leader": "ctrl+x" },
  "session": { "thinking": "show", "tps": true },
  "diffs": { "source": "branch", "view": "auto" },
  "attention": { "notifications": true, "sound": true }
}
```

- Path: `~/.config/opencode/cli.json` (or `$XDG_CONFIG_HOME/opencode/cli.json`). There is no per-project `cli.json`.
- Inline config: `OPENCODE_CLI_CONFIG_CONTENT='{"tabs":{"mode":"off"}}' opencode`
- Main groups: `theme`, `animations`, `cursor`, `mouse`, `scroll`, `prompt`, `session`, `tabs`, `diffs`, `attention`, `terminal`, `mini`, `keybinds`, `plugins`, `debug`.
- Prefer **Ctrl+P → Open settings** in the TUI to change the essentials.

## 🖋️ Formatters (auto-format files)

Disabled by default; enable in `opencode.json(c)` to have OpenCode format files after `write`/`edit`/`patch`:

```jsonc
// enable every available built-in formatter
{ "formatter": true }

// or customize/extend:
{
  "formatter": {
    "prettier": { "extensions": [".js", ".ts"] },
    "deno-markdown": { "command": ["deno", "fmt", "$FILE"], "extensions": [".md"] }
  }
}
```

There are built-in formatters (gofmt, prettier, biome, ruff, rustfmt, shfmt, terraform…). `command` is an array (not a shell), with `$FILE` replaced by the absolute path.

## ❓ Hands-on challenge

1. Create an `opencode.jsonc` in your project with `$schema` and a `model`
2. Set `{ "action": "shell", "resource": "git push *", "effect": "ask" }` in `permissions` and test it
3. Adjust the theme and a keybind in `cli.json` and restart the TUI
4. Enable `formatter: true` and see a file formatted after an edit

## 📚 Official source

- [Config](https://opencode.ai/v2/docs/config/) · [CLI settings](https://opencode.ai/v2/docs/cli/config/) · [Keybinds](https://opencode.ai/v2/docs/cli/keybinds/) · [Formatters](https://opencode.ai/v2/docs/formatters/)

---

**Next step:** [Lesson 05 — Models & Providers](05-modelos-e-providers.md) · [Back to module](README.md)
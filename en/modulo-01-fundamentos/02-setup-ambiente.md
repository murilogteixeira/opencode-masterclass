# 02. Setup & Installation

## 🎯 Objective
Install OpenCode, connect a model provider, and validate the environment with real commands.

## 📦 Prerequisites

- Linux, macOS or Windows (Windows package managers are not supported — use the binary installer)
- **npm method only:** Node.js/npm installed. The other methods install a native binary with no Node dependency.

## 🚀 Installation

### Method 1 — curl (native binary, no Node)

```bash
curl -fsSL https://opencode.ai/v2/install | bash
```

### Method 2 — npm

```bash
npm install -g @opencode/cli
```

> The npm package uses a `postinstall` script to select the native binary for your platform.

### Other methods

```bash
# Homebrew (macOS/Linux)
brew install anomalyco/tap/opencode-v2

# mise (requires mise >= 2026.10.9)
mise use -g opencode

# Bun / pnpm
bun install -g --trust @opencode/cli
pnpm add -g --allow-build=@opencode/cli @opencode/cli
```

## 🔑 Connect a model provider

In the TUI, use the `/connect` command, choose the provider and follow the flow (API key or OAuth):

```text
/connect
/models
```

Or from the terminal, without opening the TUI:

```bash
# opens an interactive provider picker
opencode auth login

# directly, with an explicit method
opencode auth login anthropic --method key
```

> Environment variables also work, e.g. `ANTHROPIC_API_KEY=... opencode --standalone` for an isolated session.

## ⚙️ Basic project configuration

OpenCode is configured with **`opencode.json(c)`** (JSON/JSONC) at the project root. There is no `OPENCODE_API_URL`-style variable for providers — everything goes in the config file:

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  // default model in provider/model format
  "model": "anthropic/claude-sonnet-4-5",
}
```

Valid configuration locations:

| Location | Scope |
|----------|-------|
| `~/.config/opencode/opencode.json(c)` | Global (all projects for the user) |
| `opencode.json(c)` at the project root | Project |
| `.opencode/opencode.json(c)` | Project (overrides the direct root `opencode.json`) |

Secrets stay out of the versioned file — use substitution: `"apiKey": "{env:ANTHROPIC_API_KEY}"` or `{file:~/.secrets/key}`.

## ✅ Environment validation

```bash
# list available commands and flags
opencode --help

# list available models
opencode models

# list saved credentials
opencode auth list

# background service state
opencode service status

# first headless prompt (the acid test)
opencode run "Explain this repository in 5 lines"
```

## 🔍 Checklist

- [ ] `opencode --help` responds
- [ ] `opencode auth list` shows your credential
- [ ] `opencode service status` shows a healthy service
- [ ] `opencode run` answers a test prompt

## ❓ Hands-on challenge

Create a Bash script named `hello_opencode.sh` that:
1. Prints "Iniciando OpenCode..."
2. Creates an `outputs/` folder
3. Saves the output of `opencode service status` to `outputs/status.txt`
4. Prints "Configuração concluída com sucesso!"

> A skeleton is in [`exemplos/hello_opencode.sh`](../../modulo-01-fundamentos/exemplos/hello_opencode.sh) — complete it and compare afterwards.

## 📚 Official source

- [Install & interfaces](https://opencode.ai/v2/docs/)
- [CLI commands reference](https://opencode.ai/v2/docs/cli/commands/)
- [Providers & authentication](https://opencode.ai/v2/docs/cli/providers/)
- [Configuration](https://opencode.ai/v2/docs/config/)

---

**Next step:** [Lesson 03 — The TUI](03-tui-sessoes-e-keybinds.md) · [Back to module](README.md)
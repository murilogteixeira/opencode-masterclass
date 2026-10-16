# 02. Plugins: install and configure

## 🎯 Objective
Add plugins to OpenCode — published packages, specific versions, scoped packages or local directories — and manage them from the CLI.

## 📋 What plugins do

Plugins modify behavior and add features: tools, hooks, integrations, commands, agents and more (creation in [Lesson 03](03-criando-plugins.md)).

## ⚙️ Configure

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    "opencode-acme-plugin",
    "opencode-acme-plugin@1.2.0",
    "@acme/opencode-plugin",
    "./plugins/local",
    "../shared/plugin.ts",
    "file:///home/me/plugins/local",
    {
      "package": "@acme/opencode-plugin",
      "options": { "agent": "reviewer", "strict": true }
    }
  ]
}
```

- Relative paths resolve from the config file containing the entry
- Plugin arrays from applicable configs are **combined** (from lowest to highest precedence)

## 🔍 Automatic discovery

OpenCode automatically loads `.ts`/`.js` files and plugin package directories from every discovered `.opencode/plugins/` directory:

```text
.opencode/
└── plugins/
    ├── concise.ts
    ├── reviewer.js
    └── acme-package/
```

Global: `~/.config/opencode/plugins/`. (A `plugins/` directory beside the root `opencode.json` is **not** discovered; move it under `.opencode/` or configure it explicitly.)

## 🎚️ Control (enable/disable)

Entries are processed in order. Prefix with `-` to disable, use `*` for all and `.*` for a prefix. A later ID re-enables:

```jsonc
{
  "plugins": ["*", "-opencode.provider.*", "opencode.provider.openai", "-acme.reviewer"]
}
```

> Two built-in plugins ignore removal so a repository cannot switch off [policy](../../modulo-02-intermediario/03-permissoes-e-policies.md) enforcement: `opencode.config.policy` and `opencode.provider.opencode`.

## 🧰 Manage via CLI

```bash
opencode plugin add opencode-acme-plugin@1.2.0
opencode plugin list
opencode plugin list --builtin
opencode plugin check
opencode plugin update
opencode plugin remove opencode-acme-plugin@1.2.0
```

Accepts npm with versions/tags/ranges, plus Git packages (including private ones):

```bash
opencode plugin add @acme/opencode-plugin@latest
opencode plugin add github:acme/opencode-plugin
opencode plugin add 'github:acme/plugins#main::path:packages/opencode-plugin'
```

## 🖥️ Terminal plugins (CLI)

TUI-only plugins live in `cli.json` and stay active even with a remote server:

```json title="~/.config/opencode/cli.json"
{
  "plugins": ["opencode-acme-cli"]
}
```

## ❓ Hands-on challenge

1. Install a plugin with `opencode plugin add` and confirm it in `opencode plugin list`
2. Disable it with a `-name` entry in `plugins` and observe the effect
3. Add a local plugin under `.opencode/plugins/` and see the automatic discovery
4. Run `opencode plugin check` to see updates

## 📚 Official source

- [Plugins (usage)](https://opencode.ai/v2/docs/plugins/) · [CLI — plugin](https://opencode.ai/v2/docs/cli/commands/)

---

**Next step:** [Lesson 03 — Creating plugins](03-criando-plugins.md) · [Back to module](README.md)
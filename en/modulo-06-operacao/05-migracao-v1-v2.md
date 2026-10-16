# 05. V1 → V2 migration

## 🎯 Objective
Migrate from V1 to V2 with confidence: what is compatible, what intentionally breaks and how to convert the configuration.

## 🔴 The three breaking changes

1. **Plugins** use a new API (V1 implementations do not run on V2)
2. **Server API and clients** have new contracts
3. **Terminal client config** migrates from layered `tui.json(c)` to a single global `cli.json` (automatic migration)

Outside these areas, **supported** V1 functionality should keep working — treat breakages as compatibility bugs.

## 🚚 Practical migration in 5 steps

1. Keep your existing config and file definitions
2. Start V2 and check models, credentials, agents, permissions and MCP
3. **Port the plugins** (the API changed)
4. **Port integrations** that call the server API
5. Convert the config to the native V2 format when you are ready (optional)

> V1 and V2 use the same config locations. Do not point V1 at files already converted to native V2.

## 🤖 Ask OpenCode itself

```text
Migrate my OpenCode configuration, including file definitions, from the V1 format to the native V2 format.
Preserve behavior and all unrelated settings.
```

The conversion may be partial: native V1 and V2 fields coexist at the top level; a valid V2 value takes precedence. But do **not mix** formats within individual agents, providers, commands or models.

## 🔁 Main renames

| V1 | V2 |
|----|----|
| `permission` (per-tool map) | `permissions` (ordered array) |
| `bash` / `task` / `write` / `patch` action | `shell` / `subagent` / `edit` / `edit` |
| `agent` (map) | `agents` |
| `prompt` / `disable` / `maxSteps` (agent) | `system` / `disabled` / `steps` |
| separate `variant` | next to the model: `provider/model#variant` |
| `snapshot` | `snapshots` |
| `attachment` | `media` |
| `mcp.<name>` with `enabled` | `mcp.servers.<name>` with `disabled` |
| `command` / `subtask` | `commands` / `subagent` |
| `reference` | `references` |
| `provider` / `npm` / `api` / `options` | `providers` / `package` / `settings.baseURL` / `settings` |
| `enabled_providers` / `disabled_providers` | `policies` (`provider.use`) |
| `plugin` (tuple) | `plugins` (`{ package, options }` object) |

### Example: permissions

```jsonc
// V1
{ "permission": { "bash": { "git push *": "ask" }, "edit": "allow" } }

// V2
{ "permissions": [
  { "action": "shell", "resource": "git push *", "effect": "ask" },
  { "action": "edit", "resource": "*", "effect": "allow" }
] }
```

> ⚠️ V1 asked for confirmation to access paths outside the project; in V2 `external_directory` is allowed by default. To keep the V1 behavior: `{ "action": "external_directory", "resource": "*", "effect": "ask" }`.

### Example: provider

```jsonc
// V2
{
  "providers": {
    "acme": {
      "package": "aisdk:@ai-sdk/openai-compatible",
      "settings": { "baseURL": "https://llm.example.com/v1", "apiKey": "{env:ACME_API_KEY}" }
    }
  }
}
```

Consolidated providers: `azure-cognitive-services` → `azure`; `google-vertex-anthropic` → `google-vertex`.

## 🗂️ Definition files

- **Agents**: `.opencode/agents/<name>.md` (V2 also discovers `agent/`, `mode/`, `modes/`)
- **Commands**: `.opencode/commands/<name>.md` (also discovers `command/`)
- **Skills**: `.opencode/skills/<id>/SKILL.md` (V2 also discovers `skill/`)
- **Instructions**: `AGENTS.md` remains; migrate any `CLAUDE.md` to `AGENTS.md`

## 🚫 Fields accepted but with no effect

V2 ignores with a warning: `logLevel` (use `OPENCODE_LOG_LEVEL`), `server`, `subagent_depth` (use `experimental.subagent_depth`), `compaction.tail_turns`/`prune`, and various experimental/legacy provider fields. `lsp` is preserved but does not run language servers.

## ✅ Verification

Verify model, credentials, agents, permissions, MCP and plugins in a project before trusting V2 for daily work. Keep V1 until you confirm the behavior you need.

## ❓ Hands-on challenge

1. Copy your V1 config and ask OpenCode to migrate it to native V2
2. Confirm the coexistence of V1 and V2 fields at the top level
3. Convert an agent and a command to the V2 formats and validate with `opencode debug config`
4. Port a V1 plugin following the migration guide

## 📚 Official source

- [Migrate from V1](https://opencode.ai/v2/docs/migrate-v1/) · [Plugin migrate V1](https://opencode.ai/v2/docs/build/plugins/migrate-v1/)

---

**Next step:** [Capstone projects](../../projetos-praticos/README.md) · [Back to module](README.md)

# ❓ Frequently asked questions

Short answers, grounded only in the [official OpenCode V2 documentation](https://opencode.ai/v2/docs/).

## 1. Do I need a paid provider?

No. OpenCode automatically discovers local models served by **Ollama**, **LM Studio**, and **vLLM** (for example, `ollama/gemma3:4b`) with no account required. You can also connect providers from the catalog, which includes free models.

## 2. How do I change the default model?

Set `"model": "provider/model"` in `opencode.json(c)` — for example, `"anthropic/claude-sonnet-4-5"`. To change only the current session, use `/models` in the TUI: that choice does not rewrite the config file.

## 3. Where does configuration live?

- **Global:** `~/.config/opencode/opencode.json(c)`
- **Project:** `opencode.json(c)` or `.opencode/opencode.json(c)`
- **System (Linux):** `/etc/opencode`
- **Terminal-only** (theme, keybinds): `~/.config/opencode/cli.json`

Settings are merged by precedence: project overrides global, and system/managed overrides everything.

## 4. How do I inspect/reset configuration?

Use `opencode debug config` to list the resolved configuration sources and `opencode debug paths` to print the global paths OpenCode uses. Because files are merged by precedence, "resetting" an option means removing or adjusting it in the relevant file shown by those commands.

## 5. Where are the logs?

Logs are written to `~/.local/share/opencode/log/opencode.log`. For more detail, increase verbosity:

```bash
OPENCODE_LOG_LEVEL=DEBUG opencode
```

## 6. How do I keep secrets out of Git?

Use variable substitution in config files: `{env:VAR}` reads an environment variable and `{file:path}` reads a file's contents. Example:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "openai": { "settings": { "apiKey": "{file:~/.secrets/openai-key}" } }
  }
}
```

## 7. Is there an English version?

Yes. The site has a language switcher and the translated pages live under `en/` (for example, `en/docs/FAQ.md` and `en/modulo-01-fundamentos/`). The lesson content is also written in Portuguese.

## 8. How do I contribute?

See the guide in [CONTRIBUTING.md](../../CONTRIBUTING.md). For questions and open discussions, use [GitHub Discussions](https://github.com/murilogteixeira/opencode-masterclass/discussions).

---

### Sources

- Config: <https://opencode.ai/v2/docs/config/>
- Models: <https://opencode.ai/v2/docs/models/>
- Providers: <https://opencode.ai/v2/docs/providers/>
- CLI (commands, `debug`, paths): <https://opencode.ai/v2/docs/cli/>
- CLI settings (`cli.json`): <https://opencode.ai/v2/docs/cli/config/>
- Troubleshooting (logs): <https://opencode.ai/v2/docs/troubleshooting/>

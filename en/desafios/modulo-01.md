# 🏋️ Challenges — Module 01 (Fundamentals)

1. **Installation:** install OpenCode V2 using two different methods and confirm `opencode --help` works with both.
2. **TUI:** in a session, use `@` to attach a file with a line range and ask a question about that snippet.
3. **Config:** create an `opencode.jsonc` with `$schema`, a `model` and an `ask` permission for `git push *`.
4. **CLI settings:** change the theme and a keybind in `cli.json` and confirm they only apply to the terminal (not the server).
5. **Models:** connect a provider and run the same prompt with the `#low` and `#high` variants, comparing latency.

<details><summary>💡 Solution (challenge 3)</summary>

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "permissions": [
    { "action": "shell", "resource": "git push *", "effect": "ask" }
  ]
}
```
</details>

<details><summary>💡 Solution (challenge 5)</summary>

```bash
opencode run --model anthropic/claude-sonnet-4-5#low  "Explain this repository"
opencode run --model anthropic/claude-sonnet-4-5#high "Explain this repository"
```
Compare time and depth. Variants come from the model's catalog.
</details>

➡️ [Module 02](modulo-02.md)
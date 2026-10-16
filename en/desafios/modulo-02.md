# 🏋️ Challenges — Module 02 (Customization)

1. **Instructions:** create an `AGENTS.md` with 5 conventions and confirm the agent follows them.
2. **Command:** create `/changelog` that inserts the output of `!`git log --oneline -10`` into the prompt.
3. **Permissions:** deny reading `.env*` and prove the agent cannot read it.
4. **Policy:** deny a provider via `provider.use` and confirm it disappears from `/models`, even with valid credentials.
5. **Skill:** create a `review` skill with a `description` and a supporting file under `references/`, then load it with `@review`.
6. **MCP:** add a local MCP server and check the connection with `opencode mcp list`.

<details><summary>💡 Solution (challenge 2)</summary>

```md
---
description: Summarizes the last commits
---

Summarize these changes:

!`git log --oneline -10`
```
</details>

<details><summary>💡 Solution (challenge 4)</summary>

```jsonc
{ "policies": [{ "action": "provider.use", "resource": "openai", "effect": "deny" }] }
```
</details>

<details><summary>💡 Solution (challenge 6)</summary>

```bash
opencode mcp add everything --global -- npx -y @modelcontextprotocol/server-everything
opencode mcp list
```
</details>

➡️ [Module 03](modulo-03.md)
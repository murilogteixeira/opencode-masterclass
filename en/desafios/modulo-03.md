# 🏋️ Challenges — Module 03 (Advanced)

1. **Agent:** create a read-only subagent that denies `edit` and `shell`, and run it with `opencode run --agent`.
2. **Plugin (tool):** write a plugin with a `git_branch_name` tool and call it from the TUI.
3. **Plugin (RPC):** expose an RPC method and call it from an HTTP client with `POST /api/rpc/...`.
4. **Websearch:** configure a provider and run a search that cites sources; force `ask` on the permission.
5. **Context:** configure a Git reference and a local one, attach them and ask to summarize a specific path.

<details><summary>💡 Solution (challenge 1)</summary>

```md
---
description: Read-only reviewer
mode: subagent
permissions:
  - action: edit
    resource: "*"
    effect: deny
  - action: shell
    resource: "*"
    effect: deny
---

Review the changes and list findings by severity.
```
```bash
opencode run --agent reviewer "Review the last commit"
```
</details>

<details><summary>💡 Solution (challenge 5)</summary>

```jsonc
{
  "references": {
    "docs": { "path": "../product-docs", "description": "Product behavior" },
    "effect": { "repository": "Effect-TS/effect", "branch": "main" }
  }
}
```
</details>

➡️ [Module 04](modulo-04.md)
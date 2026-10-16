# 🏋️ Challenges — Module 06 (Operations)

1. **Troubleshooting:** force a model error and find the matching line in the log.
2. **Context:** enable `compaction` and `tool_output`, run a long session and compare `opencode stats --cost` before/after.
3. **Snapshots:** make an edit, use `/undo` and confirm the restore; then disable `snapshots` and repeat the test.
4. **Network:** configure a proxy with a loopback `NO_PROXY` and validate with `opencode api get /api/info`.
5. **Migration:** ask OpenCode to migrate a piece of V1 config (e.g. `permission`) to the V2 form and validate with `opencode debug config`.

<details><summary>💡 Solution (challenge 2)</summary>

```jsonc
{
  "compaction": { "auto": true },
  "tool_output": { "max_lines": 2000, "max_bytes": 51200 }
}
```
```bash
opencode stats --cost
```
</details>

<details><summary>💡 Solution (challenge 5)</summary>

```jsonc
// V1
{ "permission": { "bash": { "git push *": "ask" } } }
// V2
{ "permissions": [{ "action": "shell", "resource": "git push *", "effect": "ask" }] }
```
</details>

✅ Module complete! Head to the [Capstone projects](../../projetos-praticos/README.md).
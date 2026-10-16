# 03. Workflows and best practices

## 🎯 Objective
Combine agents, commands and worktrees into reliable workflows and adopt practices that keep quality and cost under control.

## 🔀 Isolated work with worktrees

Let the agent work in a **worktree** to isolate risky changes. Configure the destination:

```jsonc
{
  "worktree": { "directory": "../worktrees" }
}
```

The agent can create/move/remove worktrees through the `opencode` namespace (via `execute`) or through the API/SDK. Reduced worktrees are also useful in parallel pipelines.

## 🤝 Orchestration with subagents

- Use the **plan** agent to plan before **build** edits
- Delegate exploration/search to the **explore** subagent (read-only)
- Limit subagent steps to avoid going in circles: `steps: 8` in the agent
- Control which subagents an agent can launch with the `subagent` permission

## 📋 Versioned instructions (`AGENTS.md`)

```md title="AGENTS.md"
# Project conventions
- Reply in Portuguese; commits in Conventional Commits
- Run `npm test` before considering a task done
- Never commit secrets; use {env:...} in the configuration
```

```jsonc
{
  "instructions": ["CONTRIBUTING.md", "docs/guidelines/*.md"]
}
```

## 🧹 Context and cost under control

```jsonc
{
  "compaction": { "auto": true },
  "tool_output": { "max_lines": 2000, "max_bytes": 51200 },
  "snapshots": false
}
```

See details in [Optimization](../../projetos-praticos/02-otimizacao.md) and [Operations](../../modulo-06-operacao/02-contexto-snapshots-warming-e-rede.md).

## 🔐 Git hygiene and security

- Small commits per task make it easier to review what the agent did
- Always review the diffs before `git push`
- Force approval: `{ "action": "shell", "resource": "git push *", "effect": "ask" }`
- For restrictions that cannot be re-enabled by a repo, use [policies](../../modulo-02-intermediario/03-permissoes-e-policies.md)

## 🔍 Diagnostics

```bash
opencode debug config          # effective config
opencode debug paths db        # where data/credentials live
opencode service status        # service status
# logs: ~/.local/share/opencode/log/opencode.log
# verbose: OPENCODE_LOG_LEVEL=DEBUG opencode run "..."
```

> When sharing logs, remove API keys and sensitive data.

## ❓ Hands-on challenge

1. Write a real `AGENTS.md` with 5 conventions from your team
2. Build a workflow: **plan** plans → **build** implements → **explore** verifies
3. Isolate a risky task in a worktree and review before applying
4. Measure the workflow cost with `opencode stats --cost`

## 📚 Official source

- [Instructions](https://opencode.ai/v2/docs/instructions/) · [Permissions](https://opencode.ai/v2/docs/permissions/) · [Compaction](https://opencode.ai/v2/docs/compaction/) · [Snapshots](https://opencode.ai/v2/docs/snapshots/)

---

**Next step:** [Module 05 — Integration](../../modulo-05-integracao/README.md) · [Back to module](README.md)

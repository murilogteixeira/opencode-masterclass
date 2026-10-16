# 03. Cost and statistics

## 🎯 Objective
Measure and optimize cost and tokens with `opencode stats`, understanding what most impacts the bill.

## 📊 The `stats` command

```bash
opencode stats              # shareable report
opencode stats --days 7     # 7-day window
opencode stats --models     # usage by model
opencode stats --cost       # cost and tokens
opencode stats --json       # for pipelines
```

## 💸 What weighs the most

1. **Large context** — the biggest cost factor (input + cache)
2. **Model** — switch to `#low` variants for mechanical tasks
3. **Tool outputs** — huge logs/builds inflate the history
4. **Warming** — real keep-alive requests
5. **Subagents** — each child consumes independently

## 🛠️ Actions that reduce cost

```jsonc
{
  "compaction": { "auto": true },
  "tool_output": { "max_lines": 2000, "max_bytes": 51200 },
  "agents": {
    "ci-reviewer": { "steps": 8 }
  }
}
```

- Pin models by role: cheap for mechanical review, strong for architecture
- Prefer `--format json` and process it outside the context
- Limit subagent `steps`
- Turn off `warming` if there is no cache gain

## 🧮 Estimate before spending

- Models have a `cost` (input/output/cache per 1M tokens) — check the catalog
- Use `opencode run --model provider/model#low` for repetitive tasks
- Monitor automation: record `opencode stats --cost` as an artifact in CI

## 🔍 Audit

```bash
opencode stats --days 30 --models
opencode stats --cost --json | jq
```

For teams, the [Console](04-console-e-enterprise.md) adds budgets and a leaderboard.

## ❓ Hands-on challenge

1. Measure the cost of a long refactor with `--cost`
2. Enable `compaction` + `tool_output` and repeat — compare the numbers
3. Run the same task with `#low` and `#high` and compare cost vs. quality
4. Export `--json` and build a small report with `jq`

## 📚 Official source

- [CLI — stats](https://opencode.ai/v2/docs/cli/commands/) · [Models (cost)](https://opencode.ai/v2/docs/models/) · [Compaction](https://opencode.ai/v2/docs/compaction/)

---

**Next step:** [Lesson 04 — Console and enterprise](04-console-e-enterprise.md) · [Back to module](README.md)

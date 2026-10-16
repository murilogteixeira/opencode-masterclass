# 02. CI/CD: OpenCode in pipelines

## 🎯 Objective
Integrate OpenCode into CI/CD pipelines to review PRs, generate summaries and run automated tasks safely.

## 🤖 Real example: PR review on GitHub Actions

From the official documentation — review the repository automatically on every pull request:

```yaml title=".github/workflows/opencode-review.yml"
name: OpenCode review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install --global @opencode/cli
      - run: opencode run --standalone --model anthropic/claude-sonnet-4-5 "Review this repository for correctness and summarize any issues."
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

Key points:
- **`--standalone`**: in CI use a private server — the secret goes to the server process
- **Secrets**: never put the key in plain text in the workflow
- **`--model`**: pin the model for predictable results and controlled cost
- **`--agent`**: use a read-only agent (below)

## 🛡️ Automation security

In headless environments nobody approves. Restrict the agent:

```jsonc title="opencode.jsonc"
{
  "agents": {
    "ci-reviewer": {
      "mode": "subagent",
      "permissions": [
        { "action": "shell", "resource": "*", "effect": "deny" },
        { "action": "edit", "resource": "*", "effect": "deny" }
      ]
    }
  }
}
```

```bash
opencode run --standalone --agent ci-reviewer "Review the PR changes"
```

For rules that can **never** be re-enabled by a repository, use [policies](../../modulo-02-intermediario/03-permissoes-e-policies.md):

```jsonc
{
  "policies": [{ "action": "tool.use", "resource": "shell:*", "effect": "deny" }]
}
```

## 🔁 Useful pipeline patterns

- **PR comment**: capture `--format json` and post it via the GitHub API
- **Quality gate**: fail the job if the summary contains "severity: high" findings
- **Isolated sessions**: each job runs with `--standalone` so state does not leak
- **Cost**: log `opencode stats --cost` as an artifact to monitor spending

## 🧰 Useful commands

```bash
opencode session list --format json   # lists the job's sessions
opencode api GET /api/session         # talks directly to the server API
opencode service status               # background service diagnostics
opencode stats --cost                 # cost and tokens
```

## ❓ Hands-on challenge

1. Create a read-only `ci-reviewer` agent
2. Add the workflow above to your test repository (with a real secret)
3. Open a PR with an intentional bug and read the reviewer's comment
4. Make the job fail when there is a high-severity finding

## 📚 Official source

- [CLI — run and CI](https://opencode.ai/v2/docs/cli/commands/) · [API](https://opencode.ai/v2/docs/api/) · [Permissions](https://opencode.ai/v2/docs/permissions/)

---

**Next step:** [Lesson 03 — Workflows and best practices](03-workflows-e-boa-praticas.md) · [Back to module](README.md)

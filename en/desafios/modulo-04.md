# 🏋️ Challenges — Module 04 (Automation)

1. **Headless:** run `opencode run --format json "List the TODOs"` and parse it with `jq`.
2. **Sessions:** chain two commands with `--continue`, then export the session with `--sanitize`.
3. **CI:** copy [`examples/ci/opencode-review.yml`](../../examples/ci/opencode-review.yml) into a test repo, set the secret and open a PR with an intentional bug.
4. **Quality gate:** make the job fail when the output contains a high-severity finding.

<details><summary>💡 Solution (challenge 1)</summary>

```bash
opencode run --format json "List the TODO comments" | jq -r '.text'
```
</details>

<details><summary>💡 Solution (challenge 3 — essence)</summary>

```yaml
- run: npm install --global @opencode/cli
- run: opencode run --standalone --agent reviewer "Review the PR and list findings by severity."
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```
</details>

➡️ [Module 05](modulo-05.md)
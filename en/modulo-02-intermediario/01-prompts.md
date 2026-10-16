# 01. Project Instructions & Prompts

## 🎯 Objective
Write consistent prompts and, above all, **persist instructions in the project** so the whole team benefits — without repeating prompts every day.

## 📋 Anatomy of a good prompt

```text
Context:      what the model needs to know
Instruction:  the exact task
Format:       how the output should look
Constraints:  limits and prohibitions
Examples:     1-2 expected inputs/outputs (few-shot)
```

Applied to OpenCode:

```bash
opencode run --file src/api.py \
  "Review this Python/Flask REST API module. \
   Context: payments API. \
   Format: list of bugs + suggestions, quoting snippets. \
   Constraints: do not modify files; answer in English."
```

## 📋 Persistent instructions: `AGENTS.md`

The biggest quality lever is **not the one-off prompt** — it is the versioned project instructions. OpenCode loads `AGENTS.md` automatically:

```md title="AGENTS.md"
# Project conventions
- Always answer in English
- Commit style: Conventional Commits
- Tests: run `npm test` before finishing any task
- Do not use `any` in TypeScript; prefer explicit types
```

Complement it in `opencode.json`:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": ["CONTRIBUTING.md", "docs/guidelines/*.md"],
}
```

## 📋 Reusable commands (slash commands)

Turn prompts you repeat into `.md` commands:

```md title=".opencode/commands/review.md"
---
description: Reviews the given code for bugs and missing tests
---

Review $ARGUMENTS. Report bugs first, then missing tests.
```

In the TUI: `/review src/auth.ts` → OpenCode sends the prompt with the argument expanded.

Template features:
- `$ARGUMENTS` — the complete argument string
- `$1`, `$2` — positional arguments (quotes group words)
- `!`\`git diff\`` — inserts the output of a shell command into the prompt
- No placeholder? The argument is appended at the end of the prompt

## ❓ Hands-on challenge

1. Create an `AGENTS.md` with 5 conventions for your project
2. Create `.opencode/commands/study-challenge.md` that asks for a study challenge about `$ARGUMENTS`
3. Run `/study-challenge closures in JavaScript` in the TUI and refine the template until the output is useful

## 📚 Official source

- [Instructions & AGENTS.md](https://opencode.ai/v2/docs/instructions/)
- [Commands](https://opencode.ai/v2/docs/commands/)

---

**Next step:** [Lesson 02 — Commands](02-comandos.md) · [Back to module](README.md)
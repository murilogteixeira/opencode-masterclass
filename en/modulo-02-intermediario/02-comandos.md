# 02. Commands (slash commands)

## 🎯 Objective
Turn recurring prompts into reusable commands with `/name`, including arguments and embedded shell commands.

## 📋 Creating a command

A Markdown file in `.opencode/commands/` is enough:

```md title=".opencode/commands/review.md"
Review $ARGUMENTS for bugs and missing tests.
```

In the TUI: `/review src/auth.ts` → sends `Review src/auth.ts for bugs and missing tests.`

## 📂 Locations

```
~/.config/opencode/commands/review.md   # global
.opencode/commands/review.md            # project
```

Nested paths become names with `/`: `.opencode/commands/team/review.md` → `/team/review`.

## 🏷️ Frontmatter

```md title=".opencode/commands/review.md"
---
description: Reviews code for correctness
agent: plan
model: anthropic/claude-sonnet-4-5#high
---

Review $ARGUMENTS. Report bugs first.
```

Fields: `description`, `agent`, `model`, `subagent`. The body is always the template.

## 🔤 Arguments

| Placeholder | Replaces |
|-------------|----------|
| `$ARGUMENTS` | The complete argument string |
| `$1`, `$2`… | Positional arguments (quotes group words) |

With no placeholder, non-empty arguments are appended after a blank line (fallback).

```md title=".opencode/commands/check.md"
Check $1. Focus on $2.
```

## 🖥️ Shell blocks

Wrap a command in `!`+backticks to insert its output before sending the prompt:

```md title=".opencode/commands/review-diff.md"
Review this diff:

!`git diff --stat && git diff`
```

> ⚠️ Shell blocks run outside the agent's permission flow. Only use commands from trusted sources and never place untrusted arguments inside shell blocks.

## 🚀 Background execution

```md
---
agent: general
subagent: true
---

Audit $ARGUMENTS for bugs and missing tests.
```

`subagent: true` runs in a child session; the main session stays available.

## 🧾 Also via JSON

```jsonc title="opencode.jsonc"
{
  "commands": {
    "review": { "description": "Reviews the diff", "template": "Review $ARGUMENTS." }
  }
}
```

## ❓ Hands-on challenge

1. Create `/review` and `/explain` in your project
2. Add a `/changelog` command that uses a shell block `!`git log``
3. Create a command with `agent: plan` and observe that it does not edit files
4. Test the fallback: a command with no placeholder receiving arguments

## 📚 Official source

- [Commands](https://opencode.ai/v2/docs/commands/)

---

**Next step:** [Lesson 03 — Permissions & Policies](03-permissoes-e-policies.md) · [Back to module](README.md)
# 05. Skills

## 🎯 Objective
Give the agent **reusable instructions** for specific tasks, loaded on demand by a tool instead of bloating every prompt.

## 📋 What is a skill

A `SKILL.md` file (or a root-level `.md`) that describes **when** and **how** to perform a task. OpenCode advertises the skill when it is relevant and the agent loads it with the `skill` tool.

## 🗂️ Structure

Directory form (recommended) — supporting files live next to `SKILL.md`:

```text
.opencode/skills/
└── git-release/
    ├── SKILL.md
    ├── scripts/
    │   └── changelog.ts
    └── references/
        └── release-policy.md
```

```md title=".opencode/skills/git-release/SKILL.md"
---
name: Git Release
description: Prepare release notes, version bumps and GitHub releases
---

## Workflow
1. Read `references/release-policy.md`.
2. Summarize merged changes since the previous tag.
3. Propose the version bump before changing files.
4. Run `scripts/changelog.ts` only after the version is approved.
```

Paths inside the skill are relative to the `SKILL.md` directory.

## 🔍 Automatic discovery

| Scope | Locations |
|-------|-----------|
| Global | `~/.config/opencode/skills` |
| Global (compatible) | `~/.claude/skills`, `~/.agents/skills` |
| Project | `.opencode/skills` |
| Project (compatible) | `.claude/skills`, `.agents/skills` |

Rules: `.md` files must be at the source root; files named exactly `SKILL.md` can be at any depth.

## 🌐 Extra sources and HTTP catalogs

```jsonc
{
  "skills": ["./team-skills", "~/shared/opencode-skills", "https://example.com/opencode/skills/"]
}
```

An HTTP catalog is a base URL with an `index.json`; each skill has `name`, `version` and the list of `files`.

## 🏷️ Frontmatter

| Field | Effect |
|-------|--------|
| `name` | Display name (the ID comes from the path) |
| `description` | Summary used to advertise the skill to the model |
| `metadata.opencode/autoinvoke: false` | Hides the skill from the model's list (still loadable by ID) |

The **ID** is the path, lowercase and case-sensitive: `<source>/git-release/SKILL.md` → `git-release`.

## 🔐 Skill permissions

```jsonc
{
  "permissions": [
    { "action": "skill", "resource": "*", "effect": "allow" },
    { "action": "skill", "resource": "internal-*", "effect": "deny" }
  ]
}
```

`deny` hides and rejects; `ask` prompts before loading.

## 🖱️ Loading manually

Mention the skill in the prompt as `@skill-id`.

## ❓ Hands-on challenge

1. Create `.opencode/skills/review/SKILL.md` with a clear `description`
2. Add a `references/checklist.md` and have `SKILL.md` instruct reading it
3. Load the skill with `@review` and also ask the agent to use it on its own
4. Deny the skill with a `deny` rule and confirm it disappears

## 📚 Official source

- [Skills](https://opencode.ai/v2/docs/skills/)

---

**Next step:** [Lesson 06 — MCP servers](06-mcp-servers.md) · [Back to module](README.md)
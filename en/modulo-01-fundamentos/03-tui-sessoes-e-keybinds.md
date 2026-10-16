# 03. The TUI: sessions, commands and keybinds

## 🎯 Objective
Master the OpenCode terminal interface: prompt input, context, shell, commands, sessions, undo/redo, and shortcuts.

## 📋 Getting started

```bash
cd ~/code/my-project
opencode
```

Type a request and press **Enter**.

```text
Explain how authentication works in this project
```

- **Shift+Enter**, **Ctrl+Enter**, **Alt+Enter** or **Ctrl+J** insert a new line
- While OpenCode is working, **Enter** steers the active session; **Ctrl+X** then **Enter** queues the prompt

## 📎 Context and shell

```text
Review @src/auth.ts for error handling problems
Explain @src/auth.ts#20-45
```

- Type `@` to search and attach a file; you can include a line/range (`#20-45`)
- Type `!` at the start of an empty prompt to enter shell mode: `!git status` runs in the session directory

## ⌨️ Commands and palette

- `/` lists slash commands — common ones include `/new`, `/sessions`, `/models`, `/agents`, `/undo`, `/redo`, `/editor`
- **Ctrl+P** opens the command palette with every action in the current view
- **Ctrl+X** is the **leader key** by default (e.g. **Ctrl+X** then **M** = switch model; **Ctrl+X** then **A** = switch agent)

## 🤖 Models and agents

| Action | Shortcut |
|--------|----------|
| Choose model | `Ctrl+X` then `M`, or `/models` |
| Cycle recent models | `F2` |
| Choose agent | `Ctrl+X` then `A`, or `/agents` |
| Cycle agents | `Shift+Tab` |

## 🗂️ Sessions and tabs

- **Ctrl+X** then **N** creates a session; **Ctrl+X** then **L** (`/sessions`) returns to a session; **Ctrl+O** opens recent sessions and projects
- Tabs are enabled by default: **Ctrl+Tab** / **Ctrl+Shift+Tab** switch; **Ctrl+X** then **W** closes; **Ctrl+Shift+T** reopens

## ↩️ Undo and redo

```text
/undo   # reverts the last message and the following work; returns the prompt to the composer
/redo   # restores what was reverted
```

## ❓ Side question (`/btw`)

`/btw <question>` answers about the conversation so far **without** entering history — great for quick questions.

```text
/btw why did the test in step 2 fail?
```

## 🎨 Customize and edit

- **Ctrl+X** then **E** (or `/editor`) edits the prompt in your `$EDITOR`
- TUI preferences live in `~/.config/opencode/cli.json` (next lesson)

## ❓ Hands-on challenge

1. Open the TUI and use `@` to attach a file with a line range
2. Ask something with `/btw` and notice it does not appear in history
3. Make a change, use `/undo`, edit the prompt and resend
4. Rebind a key in `cli.json` (e.g. `command.palette.show` to `ctrl+k`)

## 📚 Official source

- [TUI](https://opencode.ai/v2/docs/cli/tui/) · [Keybinds](https://opencode.ai/v2/docs/cli/keybinds/)

---

**Next step:** [Lesson 04 — Configuration and CLI settings](04-configuracao-e-cli-settings.md) · [Back to module](README.md)
# 05. Context: references and attachments

## 🎯 Objective
Bring external content to the agent in a controlled way: **references** (directories/repos outside the project) and **attachments** (files attached to the prompt).

## 📚 References — named access outside the project

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "references": {
    "docs": { "path": "../product-docs", "description": "Product behavior and terminology" },
    "effect": { "repository": "Effect-TS/effect", "branch": "main" },
    "shared": "~/work/shared"
  }
}
```

- **Local**: `path` (relative to the config, absolute, or `~/...`)
- **Git**: `repository` (+ optional `branch`)
- A string shorthand is a local path only when it starts with `.`, `/` or `~` — a value like `docs` is interpreted as a Git repository

Attach it by alias in the client and ask to inspect a path:

```text
Read the attached docs reference and summarize api/authentication.md.
```

- Remote repos are cloned/refreshed in the background (eligible every 24h); prompts do **not** wait for the clone
- `description` advertises the reference to the agent; `hidden: true` hides it from interactive selectors
- References do **not** grant extra permissions — external access follows `external_directory`

## 📎 Attachments — files in the prompt

In the desktop/web client, use **Attach file**, paste or drag. In the interfaces, an attachment is described by `uri` (+ `name`/`description`):

```json
{ "uri": "file:///home/me/project/src/server.ts?start=20&end=60", "name": "server.ts" }
```

Formats visible to the model:

| Input | The model receives |
|-------|--------------------|
| UTF-8 file | Name + decoded text |
| Directory | Non-recursive listing of the immediate level |
| PNG/JPEG/GIF/WebP | Image |

> PDF, SVG (treated as text), AVIF, BMP, audio and video do **not** enter as binary attachments. Convert first (e.g. export a PDF page as `page-1.png`). Limit: 20 MiB per item.

## 🖼️ Image processing

```jsonc
{
  "media": {
    "image": { "auto_resize": true, "max_width": 2000, "max_height": 2000, "max_base64_bytes": 5242880 }
  }
}
```

With `auto_resize: true`, the image is proportionally resized; with `false`, it is rejected if it exceeds the limits. Applies to attachments and to images read by `read`.

## ❓ Hands-on challenge

1. Configure a local reference (`../some-dir`) and a Git one, then attach and query them
2. Attach a `.ts` file with a line range (`?start=&end=`)
3. Attach an image and confirm the chosen model accepts images
4. Mark a reference as `hidden` and verify it disappears from the selectors

## 📚 Official source

- [References](https://opencode.ai/v2/docs/references/) · [Attachments](https://opencode.ai/v2/docs/attachments/)

---

**Next step:** [Module 04 — Automation](../../modulo-04-automacao/README.md) 🇧🇷 · [Back to module](README.md)
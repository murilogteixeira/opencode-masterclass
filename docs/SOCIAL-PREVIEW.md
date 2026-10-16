# Social preview (GitHub Open Graph image)

GitHub's **social preview** is the 1280×640 image shown when someone shares this
repository on social media, in chat apps, or in link unfurls. GitHub shows it on
the repo's Open Graph card (Twitter/X, LinkedIn, Slack, Discord, WhatsApp, etc.).

## ⚠️ It must be uploaded manually

There is **no API and no CLI command** to set a repository's social preview.
`gh` cannot do it, the REST API cannot do it, and it cannot be committed as a
file. The only way to set it is through the GitHub web UI:

1. Open the repository on GitHub.
2. Go to **Settings** (top navigation, repo-level settings).
3. In the left sidebar, under **General**, find the **Social preview** section.
4. Click **Edit** → **Upload an image…**.
5. Upload `assets/opencode-masterclass.png` from this repository.

> Tip: the same image can be reused as the Open Graph image elsewhere (e.g. a
> docs site), but GitHub's repo card only reads the one uploaded in Settings.

## Recommended dimensions

| Property | Value |
|---|---|
| Dimensions | **1280 × 640 px** (2:1 ratio) |
| Recommended min. width | 640 px (1280 px recommended) |
| Max. file size | 1 MB (GitHub limit) |
| Format | PNG or JPG |

The asset in this repo, `assets/opencode-masterclass.png`, is already generated
at **1280 × 640** and is well under the 1 MB limit.

## Asset in this repo

- **File:** [`../assets/opencode-masterclass.png`](../assets/opencode-masterclass.png)
- **Design:** dark gradient background (`#0d1117` → `#1f2a44`) with a
  blue→purple→pink accent gradient (`#58a6ff` → `#a371f7` → `#f778ba`).
- **Content:** title "OpenCode Masterclass", subtitle
  "AI coding agent course · 32 lessons · PT/EN", and three level pills
  (Beginner / Advanced / Specialist).

## Description to paste

GitHub allows an optional description next to the social preview. Use this
one-liner:

> Hands-on OpenCode (V2) course — 32 project-based lessons from beginner to advanced: agents, skills, plugins, MCP, CI/CD, API and SDK.

## Checklist

- [ ] Confirm `assets/opencode-masterclass.png` is committed and up to date.
- [ ] Upload it at **Settings → Social preview → Edit → Upload an image…**.
- [ ] Paste the description above.
- [ ] Verify the card renders by sharing the repo URL (e.g. on X or in a chat app).

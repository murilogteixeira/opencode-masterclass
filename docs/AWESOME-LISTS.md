# Submitting to "awesome" lists

This document lists real GitHub **awesome lists** where the *OpenCode Masterclass*
course could reasonably be submitted, with the exact entry to add and each list's
contribution guidelines.

> ⚠️ **Read before submitting.** Every submission below means **opening a Pull
> Request against a third-party repository that we do not own or control**. The
> maintainers are the sole decision-makers: they may reject, edit, or ask for
> changes, and some lists have strict quality bars (e.g. "canonical" or minimum
> star counts). **Do not open any PR automatically** — a human must review this
> document, verify the current state of each list, and submit the PR manually
> and politely. Always read the target repo's `CONTRIBUTING.md` first, follow its
> exact format, and keep descriptions factual (no marketing).

Our repo being referenced: `https://github.com/murilogteixeira/opencode-masterclass`

---

## 1. awesome-opencode/awesome-opencode ⭐ ~10.6k

- **Repo:** [`awesome-opencode/awesome-opencode`](https://github.com/awesome-opencode/awesome-opencode)
- **Why it fits:** This is *the* curated list for the OpenCode ecosystem. It has a
  dedicated **`data/resources/`** category defined as *"Guides, templates, and
  configurations"*, and already lists course-like setups (e.g. a "Coding Agent
  Orchestration — OpenCode Setup Guide"). A 32-lesson course is a natural resource.
- **Important:** entries are **not markdown** — the README is generated from YAML
  files under `data/`. You add a new file, e.g.
  `data/resources/opencode-masterclass.yaml`:

  ```yaml
  name: OpenCode Masterclass
  repo: https://github.com/murilogteixeira/opencode-masterclass
  tagline: A 32-lesson, project-based course that takes you from beginner to advanced OpenCode.
  description: A progressive, hands-on course on the OpenCode (V2) AI coding agent.
    Covers 6 modules and 32 lessons plus capstone projects — fundamentals and
    configuration, custom agents, skills, commands, plugins, MCP servers,
    permissions, CI/CD automation, and integration via the HTTP API, JavaScript
    client and SDK. Lessons are in Portuguese with an English README.

    Every lesson includes an objective, content, a hands-on challenge, and links
    to the official OpenCode documentation.
  tags:
    - course
    - tutorial
    - learning
    - guide
  homepage: https://github.com/murilogteixeira/opencode-masterclass
  ```

- **Entry requirements:** relevant to OpenCode, public, maintained (active commits
  within 6 months), unique, complete fields.
- **Contribution guidelines:**
  [`contributing.md`](https://github.com/awesome-opencode/awesome-opencode/blob/main/contributing.md)

---

## 2. EthicalML/awesome-agentic-engineering-resources

- **Repo:** [`EthicalML/awesome-agentic-engineering-resources`](https://github.com/EthicalML/awesome-agentic-engineering-resources)
- **Why it fits:** A curated **resources** list (not a tools list) organized as a
  matrix of *resource type × topic*. It has an explicit **🧑‍🎓 Courses** row and a
  **T1 · Coding Agents & AI-Assisted Development** topic — exactly where a course
  about an AI coding agent belongs. It already links similar resources (Claude
  Code best practices, GitHub Copilot training, etc.).
- **Entry format:** one-line bullet, alphabetically sorted within the cell,
  with icon tags (`🧑‍🎓` course, `🆓` free). Under **Courses → T1**:

  ```markdown
  * [OpenCode Masterclass](https://github.com/murilogteixeira/opencode-masterclass) 🧑‍🎓 🆓 — Hands-on, project-based course that takes developers from zero to advanced OpenCode (V2) usage across agents, skills, plugins, MCP, CI/CD, and the API/SDK.
  ```

- **Note:** this list has a high bar — entries should be "substantive, canonical,
  primary-source, and durable". A GitHub-hosted course qualifies on substance and
  durability; the "canonical" bar is subjective, so expect the maintainer to
  decide. Free (CC0) license.
- **Contribution guidelines:**
  [`CONTRIBUTING.md`](https://github.com/EthicalML/awesome-agentic-engineering-resources/blob/main/CONTRIBUTING.md)

---

## 3. Hannibal046/Awesome-LLM ⭐ ~27k

- **Repo:** [`Hannibal046/Awesome-LLM`](https://github.com/Hannibal046/Awesome-LLM)
- **Why it fits:** One of the largest LLM lists and it has a dedicated
  **"LLM Tutorials and Courses"** section that already includes courses and
  course-repos (e.g. `llm-course`, Stanford CS324). An OpenCode course is an
  applied LLM/agent course and fits this section's intent.
- **Entry format:** `- [Name](url) - short description`, appended in the
  **LLM Tutorials and Courses** section:

  ```markdown
  - [OpenCode Masterclass](https://github.com/murilogteixeira/opencode-masterclass) - A 32-lesson, hands-on course on the OpenCode AI coding agent: agents, skills, plugins, MCP, CI/CD, and the API/SDK.
  ```

- **Contribution guidelines:**
  [`contributing.md`](https://github.com/Hannibal046/Awesome-LLM/blob/main/contributing.md)

---

## 4. artnitolog/awesome-agent-learning ⭐ ~160

- **Repo:** [`artnitolog/awesome-agent-learning`](https://github.com/artnitolog/awesome-agent-learning)
- **Why it fits:** A focused list of *"Guides, courses & reading lists for
  learning to build autonomous LLM agents"*, with a **Foundational Courses**
  section. The single subject of this list is learning resources, so a coding-agent
  course is on-topic by design.
- **Entry format:** `- **[Name](url)** — concise present-tense summary`, added
  alphabetically in the **Foundational Courses** section:

  ```markdown
  - **[OpenCode Masterclass](https://github.com/murilogteixeira/opencode-masterclass)** — a project-based course that teaches the OpenCode coding agent through 32 hands-on lessons and capstone projects.
  ```

- **Contribution guidelines:**
  [`contributing.md`](https://github.com/artnitolog/awesome-agent-learning/blob/main/contributing.md)
  (one link per PR, alphabetical order, high-quality/actively maintained only).

---

## 5. brandonhimpfen/awesome-ai-coding-agents

- **Repo:** [`brandonhimpfen/awesome-ai-coding-agents`](https://github.com/brandonhimpfen/awesome-ai-coding-agents)
- **Why it fits:** Scoped to *"frameworks, tools, platforms, **and resources**
  for AI coding agents"* — the exact domain of this course. It is a smaller list
  but its description explicitly includes resources, and its contribution guide
  accepts "articles, or resources".
- **Caveat:** the current taxonomy (Frameworks, Coding Agents & Platforms, IDE
  Integrations, Agent Infrastructure, Testing & Evaluation, Datasets & Benchmarks,
  Research & Papers) has **no dedicated courses/learning section**. The realistic
  path is to **open an issue first** proposing a "Learning Resources & Courses"
  section, then submit the entry once it exists — or ask the maintainer where it
  belongs. Suggested entry (matching the list's `- Name — description` style):

  ```markdown
  - OpenCode Masterclass — A 32-lesson, project-based course for mastering the OpenCode (V2) AI coding agent, from fundamentals to agents, plugins, MCP, CI/CD, and the API/SDK.
  ```

- **Contribution guidelines:**
  [`CONTRIBUTING.md`](https://github.com/brandonhimpfen/awesome-ai-coding-agents/blob/main/CONTRIBUTING.md)

---

## General submission rules

1. **Never auto-submit.** Open the PR manually after a human review of the target
   repo's current `CONTRIBUTING.md` (formats and sections change over time).
2. **One list per PR** where the guidelines ask for it (e.g. artnitolog).
3. **Match the exact format** of the target section — bullet style, separators
   (`,` vs `—` vs ` - `), icon tags, and alphabetical ordering.
4. **Update both language variants** when a list is bilingual (e.g.
   sorrycc/awesome-code-agents maintains `README.md` and `README.zh-CN.md`).
5. **Keep the description factual** — no superlatives, no "best", no stars unless
   the list's format includes them.
6. **Be ready to iterate** — maintainers may request edits; update the existing PR
   rather than opening a new one.

### Lists reviewed and intentionally excluded

- `jqueryscript/awesome-coding-agent`, `bradAGI/awesome-cli-coding-agents`,
  `kailiu42/awesome-coding-agents`, `sorrycc/awesome-code-agents` — these catalog
  **agents/tools**, not learning resources, and their inclusion criteria exclude
  courses/guides. Submitting the course there would likely be rejected.
- `tiennm99/awesome-ai-dev-tools` — a star-ranked **tools** list that explicitly
  excludes libraries, SDKs, and prompt/skill collections; a course is out of scope.

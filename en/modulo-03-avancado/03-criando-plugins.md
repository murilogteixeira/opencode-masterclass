# 03. Creating plugins

## 🎯 Objective
Write plugins that add **tools**, **hooks** and **transforms** to OpenCode, and expose methods/events via RPC.

## 📋 Basic structure

```ts title=".opencode/plugins/example/index.ts"
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "example",
  async setup(ctx) {
    await ctx.storage.set("loaded", true)
  },
})
```

Plugins in `.opencode/plugins/` load automatically. `setup` runs on load and can return a cleanup function. The `ctx` is essentially an [OpenCode server client](../../modulo-05-integracao/02-cliente-javascript.md) plus plugin-only methods.

## ➕ Adding a tool

```ts title=".opencode/plugins/acme/index.ts"
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "acme",
  async setup(ctx) {
    const registration = await ctx.tool.transform((editor) => {
      editor.namespace({ name: "acme", description: "Customer account tools" })
      editor.add({
        name: "greeting",
        description: "Creates a greeting",
        input: {
          type: "object",
          properties: { name: { type: "string" } },
          required: ["name"],
          additionalProperties: false,
        },
        options: { namespace: "acme", codemode: true },
        execute: async (input, context) => {
          await context.progress({ status: "greeting" })
          return { content: `Hello ${(input as { name: string }).name}!` }
        },
      })
    })

    return () => registration.dispose()
  },
})
```

- Pass `context.signal` to cancellable work (e.g. `fetch`)
- Disposing the registration removes the tool and reapplies the others

## 🔧 Transforms (agents, providers, models, commands, MCP…)

Each domain has `transform` + `reload`. Examples:

```ts
// agents
await ctx.agent.transform((editor) => {
  editor.update("build", (agent) => {
    agent.description = "Implements features and fixes bugs"
  })
})

// models: remove expensive models
await ctx.model.transform((editor) => {
  editor.list().filter((m) => m.cost.some((t) => t.output > 20))
    .forEach((m) => editor.remove(m.providerID, m.id))
})

// MCP
await ctx.mcp.transform((editor) => {
  editor.set("docs", { type: "remote", url: "https://mcp.example.com" })
})
```

Available domains: `agent`, `provider`, `model`, `command`, `integration`, `mcp`, `reference`, `skill`, `tool`, `vcs`, `worktree`, `websearch`, `credential`.

## 🪝 Hooks

They intercept live operations. Examples:

```ts
// redact secrets in incoming prompts
await ctx.session.hook("prompt", (event) => {
  event.prompt.text = event.prompt.text.replaceAll("company-secret", "[redacted]")
})

// adjust the model request
await ctx.session.hook("context", (event) => {
  event.system.push({ type: "text", text: "Focus on correctness." })
  event.options.temperature = 0.2
})
```

Session hooks include `prompt`, `context`, `compaction`, `generate`, `title`, `model.request`, `http.request`, `http.response`.

## 🔌 RPC: methods and events between plugins/clients

```ts title="src/rpc.ts"
import { Rpc } from "@opencode/plugin/rpc"

export const Acme = Rpc.define({
  id: "acme",
  methods: {
    search: {
      input: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
      output: { type: "object", properties: { text: { type: "string" } }, required: ["text"] },
    },
  },
  events: {
    updated: { schema: { type: "object", properties: { itemID: { type: "string" } } } },
  },
})
```

Register inside `setup` and call it from another plugin or over HTTP:

```ts
const registration = await ctx.rpc.register(Acme, {
  search: async (input, context) => ({ text: await findText((input as any).query, { signal: context.signal }) }),
})
await registration.events.emit("updated", { itemID: "item-1" })
```

HTTP client: `client.rpc(Acme).search({ query: "hello" })` or `POST /api/rpc/acme/search` with `{ "input": ... }`.

## 📦 Publishing

Package it as an npm package (`@acme/opencode-plugin`) whose entrypoint exports `Plugin.define(...)`. Enable it with `opencode plugin add`.

## 💡 Examples

- [`exemplos/plugins/greeting/index.ts`](../../modulo-03-avancado/exemplos/plugins/greeting/index.ts) — plugin with a tool
- [`exemplos/plugins/acme-rpc.ts`](../../modulo-03-avancado/exemplos/plugins/acme-rpc.ts) — plugin with RPC (methods + events)

## ❓ Hands-on challenge

1. Create a plugin with a `git_branch_name` tool that returns the current branch
2. Add a `prompt` hook that appends "answer in English"
3. Expose an RPC method and call it from a client
4. Publish it locally and load it via `plugins` in `opencode.json`

## 📚 Official source

- [Plugins (build)](https://opencode.ai/v2/docs/build/plugins/) · [RPC](https://opencode.ai/v2/docs/build/plugins/rpc/) · [CLI plugins](https://opencode.ai/v2/docs/build/plugins/cli/)

---

**Next step:** [Lesson 04 — Web search](04-busca-web.md) · [Back to module](README.md)
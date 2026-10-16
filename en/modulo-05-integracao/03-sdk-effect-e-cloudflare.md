# 03. SDK, Effect, and Cloudflare

## 🎯 Objective
Embed OpenCode inside an application (without an HTTP listener) and learn about the Effect and Cloudflare variants.

## 📋 SDK — host OpenCode in-process

`@opencode/sdk` assembles the OpenCode server and routes calls through your HTTP router **in memory** — no listener and no network hop.

```sh
bun add @opencode/sdk
```

```ts
import { OpenCode } from "@opencode/sdk"

await using opencode = await OpenCode.create()
const session = await opencode.sessions.create({ location: { directory: "/workspace" } })

await opencode.sessions.prompt({ sessionID: session.id, text: "Review the current changes" })
```

- `OpenCode.create()` returns an **explicitly owned** host; `await using` releases the router, Location services, fibers, and plugin registrations
- Without `await using`, call `await opencode.close()`
- Exposes the complete generated client + the `sessions` and `events` aliases

### Streaming and worktrees

```ts
for await (const event of opencode.events.subscribe()) {
  console.log(event.type)
}

const projectID = session.projectID
const worktree = await opencode.worktree.create({ projectID, name: "task" })
await opencode.worktree.refresh({ projectID })
await opencode.worktree.remove({ projectID, directory: worktree.directory, force: false })
```

### Customize with plugins

```ts
import { Plugin } from "@opencode/plugin"
import { OpenCode } from "@opencode/sdk"

const plugin = Plugin.define({
  id: "customize-agent",
  async setup(ctx) {
    await ctx.agent.transform((agents) => {
      agents.update("build", (agent) => { agent.description = "Implement our team's features" })
    })
  },
})

await using opencode = await OpenCode.create({ plugins: [plugin] })
// or, after startup:
// await opencode.plugin(plugin)
```

## ⚡ Effect

For Effect applications, use the `@opencode/client/effect` entrypoint (Effect types, Streams, and decoded values) and the [Effect SDK](https://opencode.ai/v2/docs/build/sdk/effect), which exposes Effects and interruption via Effect.

## ☁️ Cloudflare Durable Objects

To run on Cloudflare Durable Objects, use the dedicated variant — see the [Cloudflare guide](https://opencode.ai/v2/docs/build/sdk/cloudflare).

## 🤔 SDK vs Client

| | Client (`@opencode/client`) | SDK (`@opencode/sdk`) |
|---|---|---|
| Topology | Connects to a server over the network | Hosts OpenCode in-process |
| HTTP listener | Existing/remote | None |
| Typical use | External app, automation | Embed in a product, tests |

## ❓ Hands-on challenge

1. Embed OpenCode with `OpenCode.create()` and create a session
2. Register a plugin that changes the `build` agent's description
3. Use `await using` and confirm cleanup when leaving the scope
4. Compare the latency of a call via the SDK vs. via the HTTP client

## 💡 Example

See [`exemplos/sdk.ts`](../../modulo-05-integracao/exemplos/sdk.ts) — an embedded host with a plugin, session, and event streaming.

## 📚 Official source

- [SDK](https://opencode.ai/v2/docs/build/sdk/) · [Effect SDK](https://opencode.ai/v2/docs/build/sdk/effect/) · [Cloudflare SDK](https://opencode.ai/v2/docs/build/sdk/cloudflare/) · [Client Effect](https://opencode.ai/v2/docs/build/client/effect/)

---

**Next step:** [Lesson 04 — ACP, Web, and Remote Access](04-acp-web-e-acesso-remoto.md) · [Back to module](README.md)

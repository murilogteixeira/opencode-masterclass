# 02. JavaScript Client

## 🎯 Objective
Use `@opencode/client` to connect an application to the OpenCode server over the network, with generated types and event streaming.

## 📋 Install and create

```sh
bun add @opencode/client
```

```ts
import { OpenCode } from "@opencode/client"

const client = OpenCode.make({ baseUrl: "http://localhost:4096" })

const session = await client.session.create({ location: { directory: "/workspace" } })

await client.session.prompt({ sessionID: session.id, text: "Review the current changes" })
```

## 🔐 Headers and requests

```ts
const client = OpenCode.make({
  baseUrl: "https://opencode.example.com",
  headers: { authorization: `Bearer ${process.env.OPENCODE_TOKEN}` },
})

await client.session.list(undefined, { signal: AbortSignal.timeout(10_000) })
```

Each operation accepts options (as the last argument) for an `AbortSignal` or per-request headers.

## 📡 Event streaming

```ts
for await (const event of client.event.subscribe()) {
  console.log(event.type)
}
```

- One lazy connection per client, shared between subscribers
- No replay/automatic reconnection: subscribe again after recovery
- The last subscriber to leave closes the connection

## 🔌 Plugin RPC

Import the shared contract and pass it to `client.rpc`:

```ts
import { OpenCode } from "@opencode/client"
import { Acme } from "opencode-acme-plugin/rpc"

const acme = client.rpc(Acme)
const result = await acme.search({ query: "hello" })

const off = acme.events.on("updated", (event) => console.log(event.data.text))
```

Any HTTP client can also call `POST /api/rpc/{rpcID}/{method}` with `{ "input": ... }`.

## 🧩 Local background service (Node)

From the native `@opencode/client/service` entrypoint:

```ts
import { OpenCode } from "@opencode/client"
import { Service } from "@opencode/client/service"

const endpoint = await Service.ensure()          // discover or start
const client = OpenCode.make({ baseUrl: endpoint.url, headers: Service.headers(endpoint) })
const info = await client.server.info()
```

- `Service.discover()` — discover only, without starting
- `Service.ensure()` — returns a compatible service (starts it if needed)
- `Service.stop()` — stops the registered instance

## ❓ Hands-on challenge

1. Create a client, create a session, and send a prompt
2. Subscribe to `client.event.subscribe()` and log event types
3. Call a plugin RPC from another process
4. Use `Service.ensure()` in a Node script and call `server.info()`

## 💡 Example

See [`exemplos/client.ts`](../../modulo-05-integracao/exemplos/client.ts) — creates a session, sends a prompt, subscribes to events, and uses `Service.ensure()`.

## 📚 Official source

- [Client (JavaScript)](https://opencode.ai/v2/docs/build/client/)

---

**Next step:** [Lesson 03 — SDK, Effect, and Cloudflare](03-sdk-effect-e-cloudflare.md) · [Back to module](README.md)

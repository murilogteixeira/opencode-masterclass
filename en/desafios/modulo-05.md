# 🏋️ Challenges — Module 05 (Integration)

1. **API:** run `opencode api get /api/info`, create a session with `--data` and retrieve it.
2. **JS client:** create a session, send a prompt and subscribe to `client.event.subscribe()`.
3. **SDK:** embed OpenCode with `OpenCode.create()`, register a plugin and use `await using`.
4. **ACP/Web:** connect an editor via ACP and generate a pairing link with `opencode pair`.

<details><summary>💡 Solution (challenge 2)</summary>

```ts
import { OpenCode } from "@opencode/client"
const client = OpenCode.make({ baseUrl: "http://localhost:4096" })
const s = await client.session.create({ location: { directory: process.cwd() } })
await client.session.prompt({ sessionID: s.id, text: "Hello" })
for await (const e of client.event.subscribe()) { console.log(e.type); break }
```
</details>

<details><summary>💡 Solution (challenge 3)</summary>

```ts
import { OpenCode } from "@opencode/sdk"
await using opencode = await OpenCode.create()
const s = await opencode.sessions.create({ location: { directory: process.cwd() } })
await opencode.sessions.prompt({ sessionID: s.id, text: "Summarize the project" })
```
</details>

➡️ [Module 06](modulo-06.md)
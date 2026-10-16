# 🏋️ Desafios — Módulo 05 (Integração)

1. **API:** rode `opencode api get /api/info`, crie uma sessão com `--data` e recupere-a.
2. **Cliente JS:** crie uma sessão, envie um prompt e assine `client.event.subscribe()`.
3. **SDK:** embuta o OpenCode com `OpenCode.create()`, registre um plugin e use `await using`.
4. **ACP/Web:** conecte um editor via ACP e gere um link de pareamento com `opencode pair`.

<details><summary>💡 Solução (desafio 2)</summary>

```ts
import { OpenCode } from "@opencode/client"
const client = OpenCode.make({ baseUrl: "http://localhost:4096" })
const s = await client.session.create({ location: { directory: process.cwd() } })
await client.session.prompt({ sessionID: s.id, text: "Olá" })
for await (const e of client.event.subscribe()) { console.log(e.type); break }
```
</details>

<details><summary>💡 Solução (desafio 3)</summary>

```ts
import { OpenCode } from "@opencode/sdk"
await using opencode = await OpenCode.create()
const s = await opencode.sessions.create({ location: { directory: process.cwd() } })
await opencode.sessions.prompt({ sessionID: s.id, text: "Resuma o projeto" })
```
</details>

➡️ [Módulo 06](modulo-06.md)
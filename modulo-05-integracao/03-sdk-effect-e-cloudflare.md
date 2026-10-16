# 03. SDK, Effect e Cloudflare

## 🎯 Objetivo
Embutir o OpenCode dentro de uma aplicação (sem listener HTTP) e conhecer as variantes Effect e Cloudflare.

## 📋 SDK — hospedar o OpenCode in-process

`@opencode/sdk` monta o servidor OpenCode e roteia chamadas pelo seu router HTTP **em memória** — sem listener e sem hop de rede.

```sh
bun add @opencode/sdk
```

```ts
import { OpenCode } from "@opencode/sdk"

await using opencode = await OpenCode.create()
const session = await opencode.sessions.create({ location: { directory: "/workspace" } })

await opencode.sessions.prompt({ sessionID: session.id, text: "Revise as mudanças atuais" })
```

- `OpenCode.create()` retorna um host **explicitamente possuído**; `await using` libera router, serviços de Location, fibers e registros de plugin
- Sem `await using`, chame `await opencode.close()`
- Expõe o cliente gerado completo + aliases `sessions` e `events`

### Streaming e worktrees

```ts
for await (const event of opencode.events.subscribe()) {
  console.log(event.type)
}

const projectID = session.projectID
const worktree = await opencode.worktree.create({ projectID, name: "task" })
await opencode.worktree.refresh({ projectID })
await opencode.worktree.remove({ projectID, directory: worktree.directory, force: false })
```

### Customizar com plugins

```ts
import { Plugin } from "@opencode/plugin"
import { OpenCode } from "@opencode/sdk"

const plugin = Plugin.define({
  id: "customize-agent",
  async setup(ctx) {
    await ctx.agent.transform((agents) => {
      agents.update("build", (agent) => { agent.description = "Implementa features do nosso time" })
    })
  },
})

await using opencode = await OpenCode.create({ plugins: [plugin] })
// ou, após o startup:
// await opencode.plugin(plugin)
```

## ⚡ Effect

Para aplicações Effect, use o entrypoint `@opencode/client/effect` (tipos Effect, Streams e valores decodificados) e o [Effect SDK](https://opencode.ai/v2/docs/build/sdk/effect), que expõe Effects e interrupção por Effect.

## ☁️ Cloudflare Durable Objects

Para rodar em Cloudflare Durable Objects, use a variante própria — veja o [guia Cloudflare](https://opencode.ai/v2/docs/build/sdk/cloudflare).

## 🤔 SDK vs Cliente

| | Cliente (`@opencode/client`) | SDK (`@opencode/sdk`) |
|---|---|---|
| Topologia | Conecta a um servidor pela rede | Hospeda o OpenCode in-process |
| Listener HTTP | Existente/remoto | Nenhum |
| Uso típico | App externo, automação | Embutir em produto, testes |

## ❓ Desafio prático

1. Embuta o OpenCode com `OpenCode.create()` e crie uma sessão
2. Registre um plugin que altere a descrição do agente `build`
3. Use `await using` e confirme a liberação ao sair do escopo
4. Compare latência de uma chamada via SDK vs via cliente HTTP

## 📚 Fonte oficial

- [SDK](https://opencode.ai/v2/docs/build/sdk/) · [Effect SDK](https://opencode.ai/v2/docs/build/sdk/effect/) · [Cloudflare SDK](https://opencode.ai/v2/docs/build/sdk/cloudflare/) · [Client Effect](https://opencode.ai/v2/docs/build/client/effect/)

---

**Próximo passo:** [Aula 04 — ACP, Web e acesso remoto](04-acp-web-e-acesso-remoto.md) · [Voltar ao módulo](README.md)
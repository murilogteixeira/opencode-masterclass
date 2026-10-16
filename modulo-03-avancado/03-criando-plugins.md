# 03. Criando plugins

## 🎯 Objetivo
Escrever plugins que adicionam **ferramentas**, **hooks** e **transformações** ao OpenCode, e expor métodos/eventos via RPC.

## 📋 Estrutura básica

```ts title=".opencode/plugins/example/index.ts"
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "example",
  async setup(ctx) {
    await ctx.storage.set("loaded", true)
  },
})
```

Plugins em `.opencode/plugins/` carregam automaticamente. `setup` roda ao carregar e pode retornar uma função de cleanup. O `ctx` é essencialmente um [cliente do servidor OpenCode](../modulo-05-integracao/02-cliente-javascript.md) mais métodos exclusivos de plugin.

## ➕ Adicionar uma ferramenta

```ts title=".opencode/plugins/acme/index.ts"
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "acme",
  async setup(ctx) {
    const registration = await ctx.tool.transform((editor) => {
      editor.namespace({ name: "acme", description: "Ferramentas da conta do cliente" })
      editor.add({
        name: "greeting",
        description: "Cria uma saudação",
        input: {
          type: "object",
          properties: { name: { type: "string" } },
          required: ["name"],
          additionalProperties: false,
        },
        options: { namespace: "acme", codemode: true },
        execute: async (input, context) => {
          await context.progress({ status: "greeting" })
          return { content: `Olá ${(input as { name: string }).name}!` }
        },
      })
    })

    return () => registration.dispose()
  },
})
```

- Passe `context.signal` para trabalho cancelável (ex.: `fetch`)
- Dispor a registration remove a ferramenta e reaplica as demais

## 🔧 Transformações (agents, providers, models, commands, MCP…)

Cada domínio tem `transform` + `reload`. Exemplos:

```ts
// agentes
await ctx.agent.transform((editor) => {
  editor.update("build", (agent) => {
    agent.description = "Implementa features e corrige bugs"
  })
})

// modelos: remove modelos caros
await ctx.model.transform((editor) => {
  editor.list().filter((m) => m.cost.some((t) => t.output > 20))
    .forEach((m) => editor.remove(m.providerID, m.id))
})

// MCP
await ctx.mcp.transform((editor) => {
  editor.set("docs", { type: "remote", url: "https://mcp.example.com" })
})
```

Domínios disponíveis: `agent`, `provider`, `model`, `command`, `integration`, `mcp`, `reference`, `skill`, `tool`, `vcs`, `worktree`, `websearch`, `credential`.

## 🪝 Hooks

Interceptam operações ao vivo. Exemplos:

```ts
// redige segredos em prompts de entrada
await ctx.session.hook("prompt", (event) => {
  event.prompt.text = event.prompt.text.replaceAll("company-secret", "[redacted]")
})

// ajusta a requisição ao modelo
await ctx.session.hook("context", (event) => {
  event.system.push({ type: "text", text: "Foque em correção." })
  event.options.temperature = 0.2
})
```

Hooks de sessão incluem `prompt`, `context`, `compaction`, `generate`, `title`, `model.request`, `http.request`, `http.response`.

## 🔌 RPC: métodos e eventos entre plugins/clientes

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

Registrar dentro do `setup` e chamar de outro plugin ou via HTTP:

```ts
const registration = await ctx.rpc.register(Acme, {
  search: async (input, context) => ({ text: await findText((input as any).query, { signal: context.signal }) }),
})
await registration.events.emit("updated", { itemID: "item-1" })
```

Cliente HTTP: `client.rpc(Acme).search({ query: "hello" })` ou `POST /api/rpc/acme/search` com `{ "input": ... }`.

## 📦 Publicar

Empacote como um pacote npm (`@acme/opencode-plugin`) com entrypoint exportando o `Plugin.define(...)`. Habilite com `opencode plugin add`.

## ❓ Desafio prático

1. Crie um plugin com uma ferramenta `git_branch_name` que retorna a branch atual
2. Adicione um hook `prompt` que acrescenta "responda em português"
3. Exponha um método RPC e chame-o de um cliente
4. Publique localmente e carregue via `plugins` no `opencode.json`

## 📚 Fonte oficial

- [Plugins (build)](https://opencode.ai/v2/docs/build/plugins/) · [RPC](https://opencode.ai/v2/docs/build/plugins/rpc/) · [CLI plugins](https://opencode.ai/v2/docs/build/plugins/cli/)

---

**Próximo passo:** [Aula 04 — Busca web](04-busca-web.md) · [Voltar ao módulo](README.md)
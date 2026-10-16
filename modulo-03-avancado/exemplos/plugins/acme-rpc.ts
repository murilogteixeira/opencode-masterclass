// Exemplo: plugin que expõe um RPC (métodos + eventos) — Módulo 03, Aula 03.
// Veja: modulo-03-avancado/03-criando-plugins.md
import { Plugin } from "@opencode/plugin"
import { Rpc } from "@opencode/plugin/rpc"

// 1) Definição do contrato (compartilhável com outros plugins e clientes)
export const Acme = Rpc.define({
  id: "acme",
  methods: {
    search: {
      input: {
        type: "object",
        properties: { query: { type: "string" } },
        required: ["query"],
        additionalProperties: false,
      },
      output: {
        type: "object",
        properties: { text: { type: "string" } },
        required: ["text"],
        additionalProperties: false,
      },
    },
  },
  events: {
    updated: {
      schema: {
        type: "object",
        properties: { itemID: { type: "string" }, text: { type: "string" } },
        required: ["itemID", "text"],
        additionalProperties: false,
      },
    },
  },
})

// 2) Implementação dentro do setup
export default Plugin.define({
  id: "acme-plugin",
  async setup(ctx) {
    const registration = await ctx.rpc.register(Acme, {
      search: async (input, context) => {
        const { query } = input as { query: string }
        const text = await findText(query, { signal: context.signal })
        return { text }
      },
    })

    // 3) O mesmo plugin pode chamar seu próprio RPC
    const acme = ctx.rpc(Acme)
    await acme.search({ query: "hello" })

    // 4) Emitir um evento para assinantes
    await registration.events.emit("updated", { itemID: "item-1", text: "ready" })

    return () => registration.dispose()
  },
})

// Função de exemplo (substitua pela sua lógica real)
async function findText(query: string, opts: { signal?: AbortSignal }): Promise<string> {
  return `resultado para "${query}"`
}

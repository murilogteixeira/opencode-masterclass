// Exemplo: SDK embutido (in-process) — Módulo 05, Aula 03.
// Veja: modulo-05-integracao/03-sdk-effect-e-cloudflare.md
import { OpenCode } from "@opencode/sdk"
import { Plugin } from "@opencode/plugin"

// Plugin que personaliza um agente ao iniciar o host embutido
const customizeAgent = Plugin.define({
  id: "customize-agent",
  async setup(ctx) {
    await ctx.agent.transform((agents) => {
      agents.update("build", (agent) => {
        agent.description = "Implementa features e corrige bugs do nosso time"
      })
    })
  },
})

// Host explicitamente possuído; `await using` libera recursos ao sair do escopo
await using opencode = await OpenCode.create({ plugins: [customizeAgent] })

const session = await opencode.sessions.create({
  location: { directory: process.cwd() },
})

await opencode.sessions.prompt({
  sessionID: session.id,
  text: "Resuma a arquitetura deste projeto em 5 linhas.",
})

// Streaming de eventos
for await (const event of opencode.events.subscribe()) {
  console.log(event.type)
  if (event.type === "session.idle") break
}

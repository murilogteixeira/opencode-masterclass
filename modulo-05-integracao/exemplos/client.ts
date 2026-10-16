// Exemplo: cliente JavaScript do OpenCode — Módulo 05, Aula 02.
// Veja: modulo-05-integracao/02-cliente-javascript.md
import { OpenCode } from "@opencode/client"
import { Service } from "@opencode/client/service"

// Cliente para um servidor OpenCode em execução
const client = OpenCode.make({
  baseUrl: "http://localhost:4096",
  headers: { authorization: `Bearer ${process.env.OPENCODE_TOKEN ?? ""}` },
})

// Cria uma sessão e envia um prompt
const session = await client.session.create({ location: { directory: "/workspace" } })
await client.session.prompt({
  sessionID: session.id,
  text: "Revise as mudanças atuais deste repositório.",
})

// Streaming de eventos
for await (const event of client.event.subscribe()) {
  console.log(event.type)
  if (event.type === "session.idle") break
}

// Variante Node: descobre/inicia o serviço de fundo local automaticamente
const endpoint = await Service.ensure()
const local = OpenCode.make({ baseUrl: endpoint.url, headers: Service.headers(endpoint) })
console.log(await local.server.info())

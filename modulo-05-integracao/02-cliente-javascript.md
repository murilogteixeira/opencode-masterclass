# 02. Cliente JavaScript

## 🎯 Objetivo
Usar `@opencode/client` para conectar uma aplicação ao servidor OpenCode pela rede, com tipos gerados e streaming de eventos.

## 📋 Instalar e criar

```sh
bun add @opencode/client
```

```ts
import { OpenCode } from "@opencode/client"

const client = OpenCode.make({ baseUrl: "http://localhost:4096" })

const session = await client.session.create({ location: { directory: "/workspace" } })

await client.session.prompt({ sessionID: session.id, text: "Revise as mudanças atuais" })
```

## 🔐 Headers e requisições

```ts
const client = OpenCode.make({
  baseUrl: "https://opencode.example.com",
  headers: { authorization: `Bearer ${process.env.OPENCODE_TOKEN}` },
})

await client.session.list(undefined, { signal: AbortSignal.timeout(10_000) })
```

Cada operação aceita opções (último argumento) para `AbortSignal` ou headers por requisição.

## 📡 Streaming de eventos

```ts
for await (const event of client.event.subscribe()) {
  console.log(event.type)
}
```

- Uma conexão lazy por cliente, compartilhada entre assinantes
- Sem replay/reconexão automática: assine de novo após recuperação
- O último assinante a sair fecha a conexão

## 🔌 RPC de plugins

Importe o contrato compartilhado e passe para `client.rpc`:

```ts
import { OpenCode } from "@opencode/client"
import { Acme } from "opencode-acme-plugin/rpc"

const acme = client.rpc(Acme)
const result = await acme.search({ query: "hello" })

const off = acme.events.on("updated", (event) => console.log(event.data.text))
```

Qualquer cliente HTTP também pode chamar `POST /api/rpc/{rpcID}/{method}` com `{ "input": ... }`.

## 🧩 Serviço de fundo local (Node)

Do entrypoint nativo `@opencode/client/service`:

```ts
import { OpenCode } from "@opencode/client"
import { Service } from "@opencode/client/service"

const endpoint = await Service.ensure()          // descobre ou inicia
const client = OpenCode.make({ baseUrl: endpoint.url, headers: Service.headers(endpoint) })
const info = await client.server.info()
```

- `Service.discover()` — só descobre, sem iniciar
- `Service.ensure()` — retorna serviço compatível (inicia se preciso)
- `Service.stop()` — para a instância registrada

## ❓ Desafio prático

1. Crie um cliente, crie uma sessão e envie um prompt
2. Assine `client.event.subscribe()` e logue os tipos de evento
3. Chame um RPC de plugin de outro processo
4. Use `Service.ensure()` num script Node e faça `server.info()`

## 📚 Fonte oficial

- [Client (JavaScript)](https://opencode.ai/v2/docs/build/client/)

---

**Próximo passo:** [Aula 03 — SDK, Effect e Cloudflare](03-sdk-effect-e-cloudflare.md) · [Voltar ao módulo](README.md)
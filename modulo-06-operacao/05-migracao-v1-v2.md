# 05. Migração V1 → V2

## 🎯 Objetivo
Migrar de V1 para V2 com confiança: o que é compatível, o que quebra intencionalmente e como converter a configuração.

## 🔴 As três mudanças que quebram

1. **Plugins** usam uma nova API (implementações V1 não rodam na V2)
2. **Server API e clientes** têm contratos novos
3. **Config do cliente de terminal** migra de `tui.json(c)` em camadas para um único `cli.json` global (migração automática)

Fora dessas áreas, a funcionalidade **suportada** da V1 deve continuar funcionando — trate quebras como bug de compatibilidade.

## 🚚 Migração prática em 5 passos

1. Mantenha a config e definições em arquivo existentes
2. Inicie a V2 e verifique modelos, credenciais, agentes, permissões e MCP
3. **Porte os plugins** (a API mudou)
4. **Porte integrações** que chamam a server API
5. Converta a config para o formato nativo V2 quando estiver pronto (opcional)

> V1 e V2 usam os mesmos locais de config. Não aponte a V1 para arquivos já convertidos para V2 nativo.

## 🤖 Pedir ao próprio OpenCode

```text
Migre minha configuração do OpenCode, incluindo definições em arquivo, do formato V1 para o formato nativo V2.
Preserve o comportamento e todas as configurações não relacionadas.
```

Conversão pode ser parcial: campos V1 e V2 nativos coexistem no topo; um valor V2 válido tem precedência. Mas **não misture** formatos dentro de agentes, providers, commands ou models individuais.

## 🔁 Renomeações principais

| V1 | V2 |
|----|----|
| `permission` (mapa por ferramenta) | `permissions` (array ordenado) |
| ação `bash` / `task` / `write` / `patch` | `shell` / `subagent` / `edit` / `edit` |
| `agent` (mapa) | `agents` |
| `prompt` / `disable` / `maxSteps` (agente) | `system` / `disabled` / `steps` |
| `variant` separado | junto ao modelo: `provider/model#variant` |
| `snapshot` | `snapshots` |
| `attachment` | `media` |
| `mcp.<nome>` com `enabled` | `mcp.servers.<nome>` com `disabled` |
| `command` / `subtask` | `commands` / `subagent` |
| `reference` | `references` |
| `provider` / `npm` / `api` / `options` | `providers` / `package` / `settings.baseURL` / `settings` |
| `enabled_providers` / `disabled_providers` | `policies` (`provider.use`) |
| `plugin` (tupla) | `plugins` (objeto `{ package, options }`) |

### Exemplo: permissões

```jsonc
// V1
{ "permission": { "bash": { "git push *": "ask" }, "edit": "allow" } }

// V2
{ "permissions": [
  { "action": "shell", "resource": "git push *", "effect": "ask" },
  { "action": "edit", "resource": "*", "effect": "allow" }
] }
```

> ⚠️ A V1 pedia confirmação para acessar caminhos fora do projeto; na V2 `external_directory` é permitido por padrão. Para manter o comportamento V1: `{ "action": "external_directory", "resource": "*", "effect": "ask" }`.

### Exemplo: provider

```jsonc
// V2
{
  "providers": {
    "acme": {
      "package": "aisdk:@ai-sdk/openai-compatible",
      "settings": { "baseURL": "https://llm.example.com/v1", "apiKey": "{env:ACME_API_KEY}" }
    }
  }
}
```

Providers consolidados: `azure-cognitive-services` → `azure`; `google-vertex-anthropic` → `google-vertex`.

## 🗂️ Arquivos de definição

- **Agentes**: `.opencode/agents/<nome>.md` (a V2 também descobre `agent/`, `mode/`, `modes/`)
- **Comandos**: `.opencode/commands/<nome>.md` (descobre `command/` também)
- **Skills**: `.opencode/skills/<id>/SKILL.md` (a V2 descobre `skill/` também)
- **Instruções**: `AGENTS.md` continua; migre eventuais `CLAUDE.md` para `AGENTS.md`

## 🚫 Campos aceitos mas sem efeito

V2 ignora com aviso: `logLevel` (use `OPENCODE_LOG_LEVEL`), `server`, `subagent_depth` (use `experimental.subagent_depth`), `compaction.tail_turns`/`prune`, e vários campos experimentais/legados de provider. `lsp` é preservado mas não roda language servers.

## ✅ Verificação

Verifique modelo, credenciais, agentes, permissões, MCP e plugins num projeto antes de confiar na V2 no trabalho diário. Mantenha a V1 até confirmar o comportamento necessário.

## ❓ Desafio prático

1. Copie sua config V1 e peça ao OpenCode para migrá-la para V2 nativo
2. Confirme a coexistência de campos V1 e V2 no topo
3. Converta um agente e um comando para os formatos V2 e valide com `opencode debug config`
4. Porte um plugin V1 seguindo o guia de migração

## 📚 Fonte oficial

- [Migrate from V1](https://opencode.ai/v2/docs/migrate-v1/) · [Plugin migrate V1](https://opencode.ai/v2/docs/build/plugins/migrate-v1/)

---

**Próximo passo:** [Projetos finais](../projetos-praticos/README.md) · [Voltar ao módulo](README.md)
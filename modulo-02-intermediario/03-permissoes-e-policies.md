# 03. Permissões e Policies

## 🎯 Objetivo
Controlar o que o agente pode fazer com **permissões** (por agente, com ask/deny) e **policies** (binárias, nunca perguntam, só restringem).

## 🧩 Permissões vs Policies

| | Permissões (`permissions`) | Policies (`policies`) |
|---|---|---|
| Efeitos | `allow`, `ask`, `deny` | `allow`, `deny` (nunca pergunta) |
| Escopo | Regras por ação/ferramenta | Podem extinguir provider/MCP/skill/plugin |
| Papel | Decide o fluxo do agente | Aperta o que permissões permitiriam |

## 📋 Permissões — regras ordenadas

```jsonc
{
  "permissions": [
    { "action": "shell", "resource": "git push *", "effect": "ask" },
    { "action": "read", "resource": ".env*", "effect": "deny" }
  ]
}
```

- **A última regra que casa vence** → regras amplas primeiro, exceções depois
- `*` casa zero ou mais caracteres; `?` casa um

### Ações comuns

| Ação | Cobre |
|------|-------|
| `shell` | Comandos de shell |
| `edit` | Editar/criar/patch |
| `read`, `glob`, `grep` | Descoberta local |
| `subagent` | Agentes filhos |
| `webfetch`, `websearch` | Ferramentas de web |
| `skill` | Carregar skills |
| `external_directory` | Acesso fora do projeto/worktree |

> ⚠️ Na V2, `external_directory` é **permitido por padrão** (diferente da V1). Para exigir aprovação: `{ "action": "external_directory", "resource": "*", "effect": "ask" }`.

### Por agente

As mesmas regras podem ficar sob `agents.<id>.permissions` para valer só num agente.

## 🛡️ Policies — restrição binária

```jsonc
{
  "policies": [
    { "action": "provider.use", "resource": "*", "effect": "deny" },
    { "action": "provider.use", "resource": "anthropic", "effect": "allow" },
    { "action": "tool.use", "resource": "shell:git push *", "effect": "deny" },
    { "action": "integration.use", "resource": "mcp:*", "effect": "deny" }
  ]
}
```

| Ação | Resource | Extingue |
|------|----------|----------|
| `provider.use` | ID do provider | Provider (some do catálogo, mesmo com credencial) |
| `tool.use` | `<action>:<valor>` | Uma checagem de permissão específica |
| `integration.use` | `mcp:<nome>`, `skill:<id>`, `plugin:<pkg>` | Integração |

### Precedência (políticas invertem a regra normal)

Configuração **mais ampla** é avaliada por último, vencendo regras específicas:

1. Console conectado (maior autoridade)
2. macOS managed preferences
3. Sistema (`/etc/opencode`)
4. Global (`~/.config/opencode`)
5. `opencode.json` direto
6. `.opencode/opencode.json` (menor)

Ou seja: um repositório **não** consegue reabilitar um provider que você negou globalmente.

```jsonc title="~/.config/opencode/opencode.jsonc"
{ "policies": [{ "action": "provider.use", "resource": "openai", "effect": "deny" }] }
```

## ❓ Desafio prático

1. Force `ask` em `git push *` e teste que o push pede aprovação
2. Negue leitura de `.env*` e confirme que o agente não consegue lê-lo
3. Crie um policy que negue `shell:*` para um agente de revisão e permita só `shell:git status *`
4. Negue um provider por policy e veja que ele desaparece de `/models`

## 📚 Fonte oficial

- [Permissions](https://opencode.ai/v2/docs/permissions/) · [Policies](https://opencode.ai/v2/docs/policies/)

---

**Próximo passo:** [Aula 04 — Ferramentas](04-ferramentas.md) · [Voltar ao módulo](README.md)
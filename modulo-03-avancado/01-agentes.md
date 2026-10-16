# 01. Criação de Agentes Customizados

## 🎯 Objetivo
Criar agentes personalizados no OpenCode — arquivos Markdown com frontmatter que combinam prompt de sistema, modelo, modo e permissões.

## 📋 Como um agente é definido

Um agente OpenCode combina:
- **Prompt de sistema** — o corpo do arquivo Markdown
- **Modelo preferido** — `provider/model` com variante opcional (`#high`)
- **Modo** — `primary`, `subagent` ou `all`
- **Permissões** — regras ordenadas de `allow` / `ask` / `deny`
- **Detalhes de exibição** — `description`, `color`, `hidden`

### Locais de descoberta

```text
~/.config/opencode/agents/<nome>.md   # global (todos os projetos)
.opencode/agents/<nome>.md            # do projeto
```

Caminhos aninhados viram parte do ID: `.opencode/agents/team/reviewer.md` → agente `team/reviewer`.

## 🧪 Exemplo: agente revisor read-only

```md title=".opencode/agents/reviewer.md"
---
description: Reviews changes for correctness and regressions
mode: subagent
model: anthropic/claude-sonnet-4-5#high
permissions:
  - action: edit
    resource: "*"
    effect: deny
  - action: shell
    resource: "*"
    effect: deny
---

Review the current changes. List findings in severity order with file and line references.
```

Use-o:

```text
Use the reviewer subagent to review my current changes.
```

Ou em automação:

```bash
opencode run --agent reviewer "Revise as mudanças atuais"
```

## 🧭 Modos disponíveis

| Modo | Comportamento |
|------|---------------|
| `primary` | Agente principal da sessão (padrão para agentes customizados novos) |
| `subagent` | Só roda em sessão filha, via ferramenta `subagent` |
| `all` | Serve aos dois casos |

## 🛡️ Permissões

Regras ordenadas — **a última regra que casa vence**, então regras amplas vêm antes das exceções:

```jsonc
{
  "agents": {
    "reviewer": {
      "permissions": [
        { "action": "*", "resource": "*", "effect": "deny" },
        { "action": "read", "resource": "src/**", "effect": "allow" },
      ],
    },
  },
}
```

Ações comuns: `shell`, `edit`, `subagent`, `read`, `glob`, `grep`, `webfetch`, `websearch`, `skill`.

## ⚠️ Campos legados — não use

Não use `temperature`, `top_p`, `prompt`, `permission`, `tools`, `disable` ou `maxSteps` em agentes V2. Para configurar temperatura, prefira `request.body` no agente ou as configurações do provider/modelo.

## ❓ Desafio prático

1. Crie `.opencode/agents/revisor-pt.md` em algum projeto seu, no formato acima
2. Defina `mode: subagent` e negue `edit` e `shell`
3. No corpo, escreva um prompt de sistema que peça revisão em português
4. Execute `opencode run --agent revisor-pt "Revise o último commit"` e observe as restrições

> Exemplo pronto em [`exemplos/agents/revisor.md`](exemplos/agents/revisor.md) — copie-o para o `.opencode/agents/` do seu projeto de teste.

## 📚 Fonte oficial

- [Guia de agentes](https://opencode.ai/v2/docs/agents/)
- [Permissões](https://opencode.ai/v2/docs/permissions/)

---

**Próximo passo:** [Aula 02 — Plugins](02-plugins.md) · [Voltar ao módulo](README.md)
# 🏋️ Desafios — Módulo 03 (Avançado)

1. **Agente:** crie um subagente read-only que nega `edit` e `shell`, e rode-o com `opencode run --agent`.
2. **Plugin (ferramenta):** escreva um plugin com uma ferramenta `git_branch_name` e chame-a pela TUI.
3. **Plugin (RPC):** exponha um método RPC e chame-o de um cliente HTTP com `POST /api/rpc/...`.
4. **Websearch:** configure um provider e faça uma busca que cite fontes; force `ask` na permissão.
5. **Contexto:** configure uma reference Git e uma local, anexe-as e peça para resumir um caminho específico.

<details><summary>💡 Solução (desafio 1)</summary>

```md
---
description: Revisor read-only
mode: subagent
permissions:
  - action: edit
    resource: "*"
    effect: deny
  - action: shell
    resource: "*"
    effect: deny
---

Revise as mudanças e liste achados por severidade.
```
```bash
opencode run --agent reviewer "Revise o último commit"
```
</details>

<details><summary>💡 Solução (desafio 5)</summary>

```jsonc
{
  "references": {
    "docs": { "path": "../product-docs", "description": "Comportamento do produto" },
    "effect": { "repository": "Effect-TS/effect", "branch": "main" }
  }
}
```
</details>

➡️ [Módulo 04](modulo-04.md)
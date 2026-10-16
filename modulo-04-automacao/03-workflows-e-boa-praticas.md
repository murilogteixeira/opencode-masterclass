# 03. Workflows e boas práticas

## 🎯 Objetivo
Combinar agentes, comandos e worktrees em workflows confiáveis e adotar práticas que mantêm qualidade e custo sob controle.

## 🔀 Trabalho isolado com worktrees

Deixe o agente trabalhar em uma **worktree** para isolar mudanças arriscadas. Configure o destino:

```jsonc
{
  "worktree": { "directory": "../worktrees" }
}
```

O agente pode criar/mover/remover worktrees pelo namespace `opencode` (via `execute`) ou pela API/SDK. Worktrees reduzidas também são úteis em pipelines paralelos.

## 🤝 Orquestração com subagentes

- Use o agente **plan** para planejar antes de o **build** editar
- Delegue exploração/busca ao subagente **explore** (read-only)
- Limite passos do subagente para evitar voltas: `steps: 8` no agente
- Controle quais subagentes um agente pode lançar com a permissão `subagent`

## 📋 Instruções versionadas (`AGENTS.md`)

```md title="AGENTS.md"
# Convenções do projeto
- Responda em português; commits em Conventional Commits
- Rode `npm test` antes de considerar uma tarefa concluída
- Nunca commitar segredos; use {env:...} na configuração
```

```jsonc
{
  "instructions": ["CONTRIBUTING.md", "docs/guidelines/*.md"]
}
```

## 🧹 Contexto e custo sob controle

```jsonc
{
  "compaction": { "auto": true },
  "tool_output": { "max_lines": 2000, "max_bytes": 51200 },
  "snapshots": false
}
```

Veja detalhes em [Otimização](../projetos-praticos/02-otimizacao.md) e [Operação](../modulo-06-operacao/02-contexto-snapshots-warming-e-rede.md).

## 🔐 Higiene de git e segurança

- Commits pequenos por tarefa facilitam revisar o que o agente fez
- Revise sempre os diffs antes de `git push`
- Force aprovação: `{ "action": "shell", "resource": "git push *", "effect": "ask" }`
- Para restrições que não podem ser reabilitadas por um repo, use [policies](../modulo-02-intermediario/03-permissoes-e-policies.md)

## 🔍 Diagnóstico

```bash
opencode debug config          # config efetiva
opencode debug paths db        # onde ficam dados/credenciais
opencode service status        # estado do serviço
# logs: ~/.local/share/opencode/log/opencode.log
# verboso: OPENCODE_LOG_LEVEL=DEBUG opencode run "..."
```

> Ao compartilhar logs, remova API keys e dados sensíveis.

## ❓ Desafio prático

1. Escreva um `AGENTS.md` real com 5 convenções do seu time
2. Monte um workflow: **plan** planeja → **build** implementa → **explore** verifica
3. Isole uma tarefa arriscada numa worktree e revise antes de aplicar
4. Meça o custo do workflow com `opencode stats --cost`

## 📚 Fonte oficial

- [Instructions](https://opencode.ai/v2/docs/instructions/) · [Permissions](https://opencode.ai/v2/docs/permissions/) · [Compaction](https://opencode.ai/v2/docs/compaction/) · [Snapshots](https://opencode.ai/v2/docs/snapshots/)

---

**Próximo passo:** [Módulo 05 — Integração](../modulo-05-integracao/README.md) · [Voltar ao módulo](README.md)
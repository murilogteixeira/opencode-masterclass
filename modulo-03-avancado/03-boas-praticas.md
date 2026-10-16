# 03. Boas Práticas e Padrões de Código

## 🎯 Objetivo
Padronizar como o OpenCode trabalha no seu projeto: instruções versionadas, permissões conscientes, contexto sob controle e higiene de git.

## 📋 Instruções de projeto com `AGENTS.md`

O OpenCode carrega automaticamente arquivos **`AGENTS.md`** como instruções. Versione um na raiz do repositório e o agente passa a seguir as convenções do time:

```md title="AGENTS.md"
# Convenções do projeto
- Sempre responda em português
- Commits seguem Conventional Commits (feat:, fix:, docs:)
- Nunca commitar segredos; use {env:...} na configuração
- Testes com `npm test` antes de considerar uma tarefa concluída
```

Para arquivos adicionais, declare no `opencode.json`:

```jsonc
{
  "instructions": ["CONTRIBUTING.md", "docs/guidelines/*.md"],
}
```

## 🛡️ Permissões conscientes

Regras ordenadas, a última que casa vence — negue o amplo, permita o específico:

```jsonc
{
  "permissions": [
    { "action": "shell", "resource": "git push *", "effect": "ask" },
    { "action": "read", "resource": ".env*", "effect": "deny" },
  ],
}
```

| Ação | Cobre |
|------|-------|
| `shell` | Comandos de shell |
| `edit` | Editar/criar/patch de arquivos |
| `read`, `glob`, `grep` | Descoberta local |
| `subagent` | Agentes filhos |
| `webfetch`, `websearch` | Ferramentas de web |

## 🧹 Contexto sob controle

Sessões longas degradam contexto e custo. O OpenCode ajuda com:

```jsonc
{
  // compactação automática de contexto
  "compaction": { "auto": true },
  // limita a saída de ferramentas que enchem o contexto
  "tool_output": { "max_lines": 2000, "max_bytes": 51200 },
  // snapshots para undo/revert — desligue se o repo for gigante
  "snapshots": false,
}
```

## 🔀 Git e OpenCode

- Deixe o agente trabalhar em **worktrees** para isolar mudanças arriscadas
- Commits pequenos por tarefa — facilita revisar o que o agente fez
- Revise sempre os diffs antes de `git push` (configure `{ "action": "shell", "resource": "git push *", "effect": "ask" }`)
- Use o agente `plan` para planejar antes de deixar o `build` editar

## 🔍 Diagnóstico e custo

```bash
opencode stats --cost          # custo por modelo
opencode debug config          # fontes de configuração em efeito
opencode debug paths db        # onde ficam dados/credenciais
# logs detalhados: ~/.local/share/opencode/log/opencode.log
# reprodução verbosa: OPENCODE_LOG_LEVEL=DEBUG opencode run "..."
```

> Ao compartilhar logs, remova API keys e dados sensíveis.

## ❓ Desafio prático

1. Escreva um `AGENTS.md` real no seu projeto com 5 convenções do seu time
2. Adicione a permissão `ask` para `git push *`
3. Rode uma sessão longa e depois `opencode stats --cost` para ver o impacto

## 📚 Fonte oficial

- [Instruções](https://opencode.ai/v2/docs/instructions/)
- [Permissões](https://opencode.ai/v2/docs/permissions/)
- [Compaction](https://opencode.ai/v2/docs/compaction/)
- [Snapshots](https://opencode.ai/v2/docs/snapshots/)
- [Troubleshooting](https://opencode.ai/v2/docs/troubleshooting/)

---

**Próximo passo:** [Módulo 04 — Projetos e Otimização](../projetos-praticos/README.md) · [Voltar ao módulo](README.md)
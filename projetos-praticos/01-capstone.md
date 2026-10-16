# Projeto Capstone: Revisor Automático de Pull Requests

Este projeto final integra tudo o que você aprendeu: agentes customizados, slash commands, `opencode run` em CI e boas práticas de permissão.

## 🎯 Objetivo
Construir um **revisor automático de PRs** que comenta achados de correção, segurança e testes ausentes — rodando no GitHub Actions com um agente read-only.

## 📦 Requisitos

1. **Agente read-only** (Módulo 3, Aula 01)
   - `.opencode/agents/pr-reviewer.md` com `mode: subagent`
   - Permissões: negar `edit` e `shell`
   - Prompt de sistema em português, achados em ordem de severidade

2. **Workflow de CI** (Módulo 3, Aula 02)
   - `.github/workflows/opencode-review.yml` disparado em `pull_request`
   - `opencode run --standalone --agent pr-reviewer` com a API key como secret
   - Modelo fixado com `--model` para custo previsível

3. **Instruções do projeto** (Módulo 2, Aula 02)
   - `AGENTS.md` com as convenções que o revisor deve exigir (commits, testes, estilo)

4. **Controle de custo**
   - `opencode stats --cost` após os primeiros runs
   - Limitar o escopo: revise só o diff, não o repo inteiro

## 🗺️ Ordem de construção (slices incrementais)

| Slice | Entrega | Validação |
|-------|---------|-----------|
| 1 | Agente `pr-reviewer` | `opencode run --agent pr-reviewer "Revise o último commit"` |
| 2 | Workflow de CI | PR com bug proposital recebe achado |
| 3 | `AGENTS.md` refinado | Revisor cita as convenções nos comentários |
| 4 | Template de resposta | Saída com checkboxes `bug` / `segurança` / `testes` |

## 💡 Critérios de conclusão

- [ ] PR com bug intencional recebe revisão apontando o bug
- [ ] PR sem problema recebe "sem achados"
- [ ] Custo por revisão medido e aceitável
- [ ] Nenhuma permissão de escrita/shell no agente de CI

## 📚 Fontes oficiais

- [Agents](https://opencode.ai/v2/docs/agents/) · [Commands da CLI](https://opencode.ai/v2/docs/cli/commands/) · [Permissions](https://opencode.ai/v2/docs/permissions/)
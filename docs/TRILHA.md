# 🧭 Trilha de estudo

Como percorrer o **OpenCode Masterclass** com melhor aproveitamento.

## Pré-requisitos

| Nível | Você precisa de |
|-------|-----------------|
| Todos | Terminal (Linux, macOS ou WSL2) e noções de linha de comando |
| Módulos 2–3 | Um projeto Git para praticar; Node.js útil para plugins |
| Módulos 4–6 | Noções de CI/CD, Git/GitHub e (para SDK) TypeScript/Node |
| Provedor | Conta em um provedor de modelos **ou** Ollama/LM Studio local |

## Ordem sugerida

```text
M01 Fundamentos ─► M02 Personalização ─► M03 Extensões
        │                                        │
        └───────────────┬────────────────────────┘
                        ▼
                 M04 Automação ─► M05 Integração ─► M06 Operação
                                        │
                                        ▼
                              Projetos Finais (capstone)
```

1. **M01 — Fundamentos** (5 aulas): instale, domine a TUI, configure e conecte modelos. *Não pule.*
2. **M02 — Personalização** (7 aulas): instruções, comandos, permissões/policies, tools, skills, MCP e APIs.
3. **M03 — Extensões** (5 aulas): agentes, plugins (usar + criar + RPC), busca web e contexto externo.
4. **M04 — Automação** (3 aulas): `run` headless, sessões e CI/CD com GitHub Actions.
5. **M05 — Integração** (4 aulas): API HTTP, cliente JS, SDK/Effect/Cloudflare e ACP/Web/remoto.
6. **M06 — Operação** (5 aulas): diagnóstico, contexto/custo, Console enterprise e migração V1→V2.
7. **Projetos finais** (3): capstone (revisor de PRs), otimização e deploy.

## Ritmo sugerido

| Perfil | Ritmo | Duração |
|--------|-------|---------|
| Iniciante dedicado | 1–2 aulas/dia | ~3 semanas |
| Praticante | 1 módulo/semana | ~7 semanas |
| Revisão rápida | Trilhas 02 → 05 pulando exemplos | ~1 semana |

> **Regra de ouro:** faça o **desafio prático** de cada aula e faça um commit por aula. Aprender OpenCode é aprender fazendo.

## Marcos (checkpoints)

- [ ] **Marco 1 (fim do M01):** `opencode run` responde e você conectou um modelo
- [ ] **Marco 2 (fim do M02):** você tem `AGENTS.md`, um slash command e uma skill no seu projeto
- [ ] **Marco 3 (fim do M03):** você criou um agente read-only e um plugin simples
- [ ] **Marco 4 (fim do M04):** um PR recebe revisão automática no CI
- [ ] **Marco 5 (fim do M05):** um script usa o cliente JS ou o SDK
- [ ] **Marco 6 (fim do M06):** você sabe diagnosticar custo, contexto e problemas
- [ ] **Capstone:** revisor automático de PRs em produção

## Se você já conhece OpenCode

Vá direto para os pontos que te interessam:

- Só quer comandos → [`CHEATSHEET.md`](../CHEATSHEET.md)
- Automação/CI → [Módulo 04](../modulo-04-automacao/README.md)
- Construir plugins/SDK → [Módulo 03](../modulo-03-avancado/README.md) e [Módulo 05](../modulo-05-integracao/README.md)
- Empresas/Console → [Módulo 06](../modulo-06-operacao/README.md)
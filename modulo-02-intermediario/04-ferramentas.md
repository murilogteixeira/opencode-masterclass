# 04. Ferramentas (Tools)

## 🎯 Objetivo
Conhecer o catálogo de ferramentas internas do OpenCode e como pedir resultados que fazem o agente usá-las bem.

## 📋 Como pedir

Descreva o **resultado** e o OpenCode escolhe as ferramentas — ou nomeie a ferramenta quando quiser um caminho específico.

```text
Encontre onde o timeout de requisições é configurado, mude o padrão para 30s e rode os testes relevantes.
Use grep para achar toda referência a DEFAULT_TIMEOUT e depois leia os arquivos encontrados.
```

## 📂 Arquivos

| Ferramenta | O que faz | Permissão |
|-----------|-----------|-----------|
| `read` | Lê arquivo ou lista diretório (não recursivo); pagina com `offset`/`limit` | `read` |
| `glob` | Busca caminhos por padrão (`**/*.ts`) | `glob` |
| `grep` | Busca conteúdo (regex, ou literal); retorna arquivo/linha/trecho | `grep` |
| `edit` | Substitui trecho exato num arquivo | `edit` |
| `write` | Cria/sobrescreve arquivo | `edit` |
| `patch` | Aplica um patch multiarquivo (add/update/move/delete) | `edit` |

Limites típicos: `read` até 2.000 linhas/50 KiB por página e imagens/PDF até 20 MiB; `glob`/`grep` com limite padrão de 100 e timeout de 30s.

## 🖥️ Shell

`shell` executa no shell do usuário. Use `workdir` em vez de `cd`; `timeout` em ms (padrão 2 min no foreground); `background: true` para processos longos.

```text
Rode bun test em packages/core com timeout de cinco minutos.
```

> ⚠️ O shell tem a autoridade do usuário (filesystem, rede, processos). Use regras estreitas em [Permissões](03-permissoes-e-policies.md).

## 🌐 Web

| Ferramenta | O que faz |
|-----------|-----------|
| `webfetch` | Busca uma URL HTTP(S) como `markdown`/`text`/`html` (timeout até 120s) |
| `websearch` | Busca na web (ver [Busca web](../modulo-03-avancado/04-busca-web.md)) |

## 💬 Interação

- `question` — pausa e apresenta perguntas com escolhas
- `skill` — carrega as instruções de uma skill no contexto (ver [Skills](05-skills.md))

## 🤖 Automação

| Ferramenta | O que faz |
|-----------|-----------|
| `subagent` | Inicia uma sessão filha com um subagente (foreground ou `background`) |
| `execute` | Roda JavaScript no Code Mode para chamar/combinar ferramentas — útil para paralelizar |
| `opencode.*` | Utilitários de sessão e **worktrees** (`worktree_create/list/remove`, `session_rename/move`) |
| `browser.*` | Controla o navegador do app desktop (snapshots, cliques, screenshots, auditorias) |

## 🧩 Extensões

- **MCP servers** adicionam ferramentas por servidor (ação `<server>_<tool>`) — ver [MCP](06-mcp-servers.md)
- **Skills** adicionam instruções (não ferramentas executáveis)
- **References/Attachments** trazem conteúdo externo sem furar permissões

## ❓ Desafio prático

1. Peça uma tarefa que use `grep` + `read` + `edit` e observe as chamadas
2. Rode dois comandos independentes em paralelo pedindo explicitamente
3. Use `background: true` num dev server e confirme a notificação ao terminar
4. Crie um worktree com o namespace `opencode` e mova a sessão para ele

## 📚 Fonte oficial

- [Tools](https://opencode.ai/v2/docs/tools/)

---

**Próximo passo:** [Aula 05 — Skills](05-skills.md) · [Voltar ao módulo](README.md)
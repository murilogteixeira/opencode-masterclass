# 📖 Glossário de termos

Termos usados ao longo do **OpenCode Masterclass**. Baseado na [documentação oficial](https://opencode.ai/v2/docs/).

## Conceitos centrais

| Termo | Significado |
|-------|-------------|
| **OpenCode** | Agente de programação com IA, open source. Roda em TUI, desktop e web. |
| **Agente** | Perfil de assistente com prompt de sistema, modelo, modo e permissões. Pode ser `primary` ou `subagent`. |
| **TUI** | Interface de terminal full-screen (`opencode`). |
| **Mini** | Interface interativa minimalista (`opencode mini`). |
| **Headless** | Execução sem interface (`opencode run`), para scripts e CI. |
| **Sessão** | Conversa com o agente; guarda histórico e pode ter subagentes (filhos). |
| **Serviço de fundo** | Servidor compartilhado que possui sessões, config, plugins e execução de ferramentas. |

## Configuração

| Termo | Significado |
|-------|-------------|
| **`opencode.json(c)`** | Configuração de servidor/projeto (modelo, agentes, permissões…). |
| **`cli.json`** | Configuração **só** do cliente de terminal (tema, keybinds…). |
| **`AGENTS.md`** | Arquivo de instruções de projeto carregado automaticamente. |
| **Instruções** | Arquivos/globs (`instructions`) além dos `AGENTS.md`. |

## Personalização

| Termo | Significado |
|-------|-------------|
| **Command** | Prompt reutilizável como `/nome` (`.opencode/commands/`). |
| **Skill** | Instruções sob demanda para uma tarefa (`.opencode/skills/`). |
| **Tool** | Ferramenta interna (`read`, `grep`, `edit`, `shell`, `subagent`…). |
| **Permission** | Regra por agente com efeito `allow` / `ask` / `deny`. |
| **Policy** | Regra binária (`allow`/`deny`), nunca pergunta; só restringe. |
| **Provider** | Fonte de modelos (Anthropic, OpenAI, Ollama, custom…). |
| **Modelo** | Identificado por `provider/model` (+ variante `#high`). |
| **Variante** | Opção nomeada de um modelo (ex.: esforço de raciocínio). |

## Extensões e integração

| Termo | Significado |
|-------|-------------|
| **Plugin** | Código que adiciona ferramentas, hooks, transforms e RPC. |
| **Hook** | Intercepta operações (prompt, chamadas ao modelo, HTTP…). |
| **Transform** | Edição síncrona do estado de um domínio (agents, models…). |
| **MCP** | Model Context Protocol — conecta o agente a serviços externos. |
| **Reference** | Acesso nomeado a diretórios/repos fora do projeto. |
| **Attachment** | Arquivo anexado a um prompt. |
| **ACP** | Agent Client Protocol — integração com editores. |
| **SDK** | `@opencode/sdk` — hospeda o OpenCode in-process. |
| **Client** | `@opencode/client` — conecta a um OpenCode pela rede. |

## Operação

| Termo | Significado |
|-------|-------------|
| **Compaction** | Compactação de contexto (local ou nativa do provider). |
| **Snapshot** | Captura antes/depois de cada passo; permite `/undo`/`/redo`. |
| **Warming** | Requisições periódicas para manter caches do provider quentes. |
| **Worktree** | Cópia isolada do repo para trabalho paralelo/arriscado. |
| **Console** | Serviço enterprise: workspaces, budgets, policies, Go. |
| **Go / Go Plus** | Assinaturas ($10/$40 por mês) para modelos open source. |

## Níveis do curso

- 🟢 **Básico** — Módulo 01
- 🔵 **Intermediário** — Módulo 02
- 🟠 **Avançado** — Módulos 03 e 04
- 🟣 **Especialista** — Módulos 05, 06 e Projetos finais
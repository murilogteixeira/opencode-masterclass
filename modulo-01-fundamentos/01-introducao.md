# 01. Introdução ao OpenCode

## 🎯 Objetivo
Entender o que é o OpenCode, quais interfaces e componentes ele oferece e como se organiza o curso.

## 📋 O que é o OpenCode?

OpenCode é um **agente de programação com IA, open source**, disponível como:

| Interface | Como usar | Descrição |
|-----------|-----------|-----------|
| **TUI** (terminal) | `opencode` | Interface terminal full-screen — a principal para o dia a dia |
| **Mini** | `opencode mini` | Interface interativa minimalista, no próprio terminal |
| **Desktop** | App gráfico | Aplicação desktop com editor visual |
| **Web** | `opencode pair` | Acesso pelo navegador, com link/QR de pareamento |
| **CLI headless** | `opencode run "..."` | Automação, scripts e CI, sem interface interativa |

### Arquitetura cliente-servidor

O OpenCode roda um **serviço de fundo (background service)** que dono de sessões, configuração, plugins, permissões e execução de ferramentas. As interfaces (TUI, desktop, web) são clientes desse serviço.

```bash
opencode service status    # ver o estado do serviço
opencode service restart   # reiniciar em caso de comportamento estranho
```

### Agentes integrados

| Agente | Modo | Função |
|--------|------|--------|
| **Build** (`build`) | `primary` | Agente de código padrão — pode editar arquivos |
| **Plan** (`plan`) | `primary` | Explora e planeja sem editar arquivos do projeto |
| **General** (`general`) | `subagent` | Pesquisa e trabalho multi-etapa com amplo acesso a ferramentas |
| **Explore** (`explore`) | `subagent` | Busca e leitura de código/web, sem editar |

A partir do Módulo 03 você criará **agentes customizados** reutilizando esses conceitos.

### Por que aprender OpenCode?

- Automatiza tarefas de código com um agente que lê, edita e executa no seu projeto
- Automação headless em CI (`opencode run`) e integração via HTTP API e SDK
- Configuração declarativa e versionável (`opencode.json`, `AGENTS.md`, agentes em Markdown)

## 💡 Experimente agora (se já tiver o OpenCode instalado)

```bash
opencode                       # abre a TUI
opencode run "Explique este repositório"   # resposta direta no terminal
```

Se ainda não instalou, siga para a [Aula 02 — Setup do Ambiente](02-setup-ambiente.md).

## 📚 Fonte oficial

- [Docs V2](https://opencode.ai/v2/docs/)
- [Guia da CLI](https://opencode.ai/v2/docs/cli/)
- [Guia de agentes](https://opencode.ai/v2/docs/agents/)

---

**Próximo passo:** [Aula 02 — Setup do Ambiente](02-setup-ambiente.md) · [Voltar ao módulo](README.md)
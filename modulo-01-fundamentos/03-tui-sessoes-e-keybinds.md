# 03. A TUI: sessões, comandos e keybinds

## 🎯 Objetivo
Dominar a interface de terminal do OpenCode: entrada de prompts, contexto, shell, comandos, sessões, undo/redo e atalhos.

## 📋 Iniciando

```bash
cd ~/code/meu-projeto
opencode
```

Digite um pedido e pressione **Enter**.

```text
Explique como a autenticação funciona neste projeto
```

- **Shift+Enter**, **Ctrl+Enter**, **Alt+Enter** ou **Ctrl+J** inserem nova linha
- Enquanto o OpenCode trabalha, **Enter** direciona a sessão ativa; **Ctrl+X** e **Enter** enfileira o prompt

## 📎 Contexto e shell

```text
Review @src/auth.ts for error handling problems
Explain @src/auth.ts#20-45
```

- Digite `@` para buscar e anexar um arquivo; dá para incluir linha/intervalo (`#20-45`)
- Digite `!` no início de um prompt vazio para entrar no modo shell: `!git status` roda no diretório da sessão

## ⌨️ Comandos e paleta

- `/` lista os slash commands — os comuns incluem `/new`, `/sessions`, `/models`, `/agents`, `/undo`, `/redo`, `/editor`
- **Ctrl+P** abre a paleta com todas as ações do contexto atual
- **Ctrl+X** é a **tecla leader** por padrão (ex.: **Ctrl+X** depois **M** = trocar modelo; **Ctrl+X** depois **A** = trocar agente)

## 🤖 Modelos e agentes

| Ação | Atalho |
|------|--------|
| Escolher modelo | `Ctrl+X` depois `M`, ou `/models` |
| Ciclar modelos recentes | `F2` |
| Escolher agente | `Ctrl+X` depois `A`, ou `/agents` |
| Ciclar agentes | `Shift+Tab` |

## 🗂️ Sessões e abas

- **Ctrl+X** depois **N** cria sessão; **Ctrl+X** depois **L** (`/sessions`) volta a uma sessão; **Ctrl+O** abre sessões e projetos recentes
- Abas são habilitadas por padrão: **Ctrl+Tab** / **Ctrl+Shift+Tab** alternam; **Ctrl+X** depois **W** fecha; **Ctrl+Shift+T** reabre

## ↩️ Undo e redo

```text
/undo   # reverte a última mensagem e o trabalho seguinte; devolve o prompt ao composer
/redo   # restaura o que foi revertido
```

## ❓ Pergunta lateral (`/btw`)

`/btw <pergunta>` responde sobre a conversa até aqui **sem** entrar no histórico — ótimo para dúvidas rápidas.

```text
/btw por que o teste do passo 2 falhou?
```

## 🎨 Personalizar e editar

- **Ctrl+X** depois **E** (ou `/editor`) edita o prompt no seu `$EDITOR`
- Preferências de TUI ficam em `~/.config/opencode/cli.json` (próxima aula)

## ❓ Desafio prático

1. Abra a TUI, use `@` para anexar um arquivo com o intervalo de linhas
2. Pergunte algo com `/btw` e note que ele não aparece no histórico
3. Faça uma alteração, use `/undo`, edite o prompt e reenvie
4. Redefina um keybind qualquer em `cli.json` (ex.: `command.palette.show` para `ctrl+k`)

## 📚 Fonte oficial

- [TUI](https://opencode.ai/v2/docs/cli/tui/) · [Keybinds](https://opencode.ai/v2/docs/cli/keybinds/)

---

**Próximo passo:** [Aula 04 — Configuração e CLI settings](04-configuracao-e-cli-settings.md) · [Voltar ao módulo](README.md)
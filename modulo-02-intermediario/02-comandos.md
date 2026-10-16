# 02. Comandos (slash commands)

## 🎯 Objetivo
Transformar prompts recorrentes em comandos reutilizáveis com `/nome`, com argumentos e comandos de shell embutidos.

## 📋 Criando um comando

Basta um arquivo Markdown em `.opencode/commands/`:

```md title=".opencode/commands/review.md"
Revise $ARGUMENTS procurando bugs e testes ausentes.
```

Na TUI: `/review src/auth.ts` → envia `Revise src/auth.ts procurando bugs e testes ausentes.`

## 📂 Locais

```
~/.config/opencode/commands/review.md   # global
.opencode/commands/review.md            # do projeto
```

Caminhos aninhados viram nomes com `/`: `.opencode/commands/team/review.md` → `/team/review`.

## 🏷️ Frontmatter

```md title=".opencode/commands/review.md"
---
description: Revisa código em busca de correção
agent: plan
model: anthropic/claude-sonnet-4-5#high
---

Revise $ARGUMENTS. Reporte bugs primeiro.
```

Campos: `description`, `agent`, `model`, `subagent`. O corpo é sempre o template.

## 🔤 Argumentos

| Placeholder | Substitui |
|-------------|-----------|
| `$ARGUMENTS` | A string completa de argumentos |
| `$1`, `$2`… | Argumentos posicionais (aspas agrupam palavras) |

Sem placeholder, os argumentos não vazios são anexados após uma linha em branco (fallback).

```md title=".opencode/commands/check.md"
Verifique $1. Foque em $2.
```

## 🖥️ Blocos de shell

Envolva um comando em `!`+backticks para inserir a saída antes de enviar o prompt:

```md title=".opencode/commands/review-diff.md"
Revise este diff:

!`git diff --stat && git diff`
```

> ⚠️ Blocos de shell rodam fora do fluxo de permissão do agente. Use apenas comandos de fontes confiáveis e nunca coloque argumentos não confiáveis dentro de blocos de shell.

## 🚀 Execução em background

```md
---
agent: general
subagent: true
---

Audite $ARGUMENTS buscando bugs e testes ausentes.
```

`subagent: true` roda em uma sessão filha; a sessão principal continua disponível.

## 🧾 Também via JSON

```jsonc title="opencode.jsonc"
{
  "commands": {
    "review": { "description": "Revisa o diff", "template": "Revise $ARGUMENTS." }
  }
}
```

## ❓ Desafio prático

1. Crie `/review` e `/explain` no seu projeto
2. Adicione um comando `/changelog` que use um bloco de shell `!`git log``
3. Crie um comando com `agent: plan` e observe que ele não edita arquivos
4. Teste o fallback: um comando sem placeholder recebendo argumentos

## 📚 Fonte oficial

- [Commands](https://opencode.ai/v2/docs/commands/)

---

**Próximo passo:** [Aula 03 — Permissões e Policies](03-permissoes-e-policies.md) · [Voltar ao módulo](README.md)
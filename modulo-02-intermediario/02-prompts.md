# 02. Prompts Avançados e Instruções de Projeto

## 🎯 Objetivo
Escrever prompts consistentes e, principalmente, **persistir instruções no projeto** para que todo o time se beneficie — sem repetir prompt todo dia.

## 📋 Anatomia de um bom prompt

```text
Contexto:        o que o modelo precisa saber
Instrução:       a tarefa exata
Formato:         como a saída deve vir
Restrições:      limites e proibições
Exemplos:        1-2 entradas/saídas esperadas (few-shot)
```

Exemplo aplicado ao OpenCode:

```bash
opencode run --file src/api.py \
  "Revise este módulo de API REST em Python/Flask. \
   Contexto: API de pagamentos. \
   Formato: lista de bugs + sugestões, com trechos citados. \
   Restrições: não modifique arquivos; responda em português."
```

## 📋 Instruções persistentes: `AGENTS.md`

A maior alavanca de qualidade **não é o prompt pontual** — são as instruções versionadas no projeto. O OpenCode carrega `AGENTS.md` automaticamente:

```md title="AGENTS.md"
# Convenções do projeto
- Responda sempre em português
- Estilo de commit: Conventional Commits
- Testes: `npm test` antes de encerrar qualquer tarefa
- Não usar `any` em TypeScript; prefira tipos explícitos
```

Complemente no `opencode.json`:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": ["CONTRIBUTING.md", "docs/guidelines/*.md"],
}
```

## 📋 Comandos reutilizáveis (slash commands)

Transforme prompts que você repete em comandos `.md`:

```md title=".opencode/commands/review.md"
---
description: Revisa o código informado procurando bugs e testes faltando
---

Revise $ARGUMENTS. Reporte bugs primeiro, depois os testes ausentes.
```

Na TUI: `/review src/auth.ts` → o OpenCode envia o prompt com o argumento expandido.

Recursos de template:
- `$ARGUMENTS` — a string completa de argumentos
- `$1`, `$2` — argumentos posicionais (aspas agrupam palavras)
- `!`\`git diff\`` — insere a saída de um comando shell no prompt
- Sem placeholder? O argumento é anexado no fim do prompt

## ❓ Desafio prático

1. Crie um `AGENTS.md` com 5 convenções do seu projeto
2. Crie `.opencode/commands/aula-desafio.md` que peça um desafio de estudo sobre `$ARGUMENTS`
3. Rode `/aula-desafio closures em JavaScript` na TUI e ajuste o template até a saída ficar útil

## 📚 Fonte oficial

- [Instructions & AGENTS.md](https://opencode.ai/v2/docs/instructions/)
- [Commands](https://opencode.ai/v2/docs/commands/)

---

**Próximo passo:** [Aula 03 — Manipulação de Dados](03-dados.md) · [Voltar ao módulo](README.md)
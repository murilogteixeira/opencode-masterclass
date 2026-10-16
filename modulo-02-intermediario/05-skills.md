# 05. Skills

## 🎯 Objetivo
Dar ao agente **instruções reutilizáveis** para tarefas específicas, carregadas sob demanda por uma ferramenta, em vez de inflar todo prompt.

## 📋 O que é uma skill

Um arquivo `SKILL.md` (ou um `.md` no nível raiz) que descreve **quando** e **como** executar uma tarefa. O OpenCode anuncia a skill quando ela é relevante e o agente a carrega com a ferramenta `skill`.

## 🗂️ Estrutura

Formato em diretório (recomendado) — arquivos de apoio ficam ao lado do `SKILL.md`:

```text
.opencode/skills/
└── git-release/
    ├── SKILL.md
    ├── scripts/
    │   └── changelog.ts
    └── references/
        └── release-policy.md
```

```md title=".opencode/skills/git-release/SKILL.md"
---
name: Git Release
description: Prepara notas de release, bump de versão e releases do GitHub
---

## Fluxo
1. Leia `references/release-policy.md`.
2. Resuma as mudanças merged desde a tag anterior.
3. Proponha o bump de versão antes de mudar arquivos.
4. Rode `scripts/changelog.ts` só após aprovação da versão.
```

Os caminhos dentro da skill são relativos ao diretório do `SKILL.md`.

## 🔍 Descoberta automática

| Escopo | Locais |
|--------|--------|
| Global | `~/.config/opencode/skills` |
| Global (compat.) | `~/.claude/skills`, `~/.agents/skills` |
| Projeto | `.opencode/skills` |
| Projeto (compat.) | `.claude/skills`, `.agents/skills` |

Regras: `.md` devem estar na raiz da fonte; arquivos chamados exatamente `SKILL.md` podem estar em qualquer nível.

## 🌐 Fontes extras e catálogos HTTP

```jsonc
{
  "skills": ["./team-skills", "~/shared/opencode-skills", "https://example.com/opencode/skills/"]
}
```

Um catálogo HTTP é uma URL base com `index.json`; cada skill tem `name`, `version` e a lista de `files`.

## 🏷️ Frontmatter

| Campo | Efeito |
|-------|--------|
| `name` | Nome de exibição (o ID vem do caminho) |
| `description` | Resumo usado para anunciar a skill ao modelo |
| `metadata.opencode/autoinvoke: false` | Esconde a skill da lista do modelo (ainda carregável por ID) |

O **ID** é o caminho, em minúsculas e case-sensitive: `<fonte>/git-release/SKILL.md` → `git-release`.

## 🔐 Permissões de skill

```jsonc
{
  "permissions": [
    { "action": "skill", "resource": "*", "effect": "allow" },
    { "action": "skill", "resource": "internal-*", "effect": "deny" }
  ]
}
```

`deny` esconde e rejeita; `ask` pergunta antes de carregar.

## 🖱️ Carregar manualmente

Mencione a skill no prompt como `@skill-id`.

## ❓ Desafio prático

1. Crie `.opencode/skills/review/SKILL.md` com `description` claro
2. Adicione um `references/checklist.md` e faça o `SKILL.md` mandar lê-lo
3. Carregue a skill com `@review` e também peça ao agente que a use sozinho
4. Negue a skill com uma regra `deny` e confirme que ela some

## 📚 Fonte oficial

- [Skills](https://opencode.ai/v2/docs/skills/)

---

**Próximo passo:** [Aula 06 — MCP servers](06-mcp-servers.md) · [Voltar ao módulo](README.md)
# AGENTS.md — Convenções deste repositório de curso

Instruções para agentes OpenCode trabalhando neste projeto.

## Idioma e estilo
- Todo o conteúdo do curso é em português (PT-BR)
- Aulas: Markdown limpo, com seções Objetivo, Conteúdo, Desafio prático e Fonte oficial

## Fonte da verdade
- Todo fato sobre OpenCode deve vir da documentação oficial V2: https://opencode.ai/v2/docs/
- Nunca inventar comandos, flags, nomes de config ou URLs — verificar na doc antes
- Usar apenas sintaxe V2 (não V1/legado)

## Estrutura
- Um módulo por pasta: `modulo-01-fundamentos/` … `modulo-03-avancado/`, `projetos-praticos/`
- Exemplos de código em `exemplos/` dentro de cada módulo; código deve rodar sem ajustes
- Links entre aulas são relativos e devem funcionar no GitHub

## Git
- Commits em Conventional Commits (feat:, fix:, docs:, refactor:)
- Um commit por aula concluída, mensagens curtas e em português
- Nunca commitar segredos (`.env`, keys) — o `.gitignore` cobre, confirme antes do push
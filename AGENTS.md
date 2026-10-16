# AGENTS.md — Convenções deste repositório de curso

Instruções para agentes OpenCode trabalhando neste projeto.

## Idioma e estilo
- Todo o conteúdo do curso é em português (PT-BR)
- Aulas: Markdown limpo, com seções Objetivo, Conteúdo, Desafio prático e Fonte oficial

## Fonte da verdade
- Todo fato sobre OpenCode deve vir da documentação oficial V2: https://opencode.ai/v2/docs/
- Nunca inventar comandos, flags, nomes de config ou URLs — verificar na doc antes
- Usar apenas sintaxe V2 (não V1/legado, exceto na aula de migração)

## Estrutura (6 módulos + projetos finais)
- `modulo-01-fundamentos/` — instalação, TUI, config, modelos
- `modulo-02-intermediario/` — instruções, comandos, permissões, tools, skills, MCP, APIs
- `modulo-03-avancado/` — agentes, plugins, websearch, referências/anexos
- `modulo-04-automacao/` — run headless, CI/CD, workflows
- `modulo-05-integracao/` — API, cliente JS, SDK, ACP/Web/remoto
- `modulo-06-operacao/` — troubleshooting, contexto, custo, Console, migração
- `projetos-praticos/` — capstone e otimização
- Exemplos de código em `exemplos/` dentro de cada módulo; código deve rodar sem ajustes
- Links entre aulas são relativos e devem funcionar no GitHub

## Git
- Commits em Conventional Commits (feat:, fix:, docs:, refactor:)
- Um commit por aula concluída, mensagens curtas e em português
- Nunca commitar segredos (`.env`, keys) — o `.gitignore` cobre, confirme antes do push
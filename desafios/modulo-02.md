# 🏋️ Desafios — Módulo 02 (Personalização)

1. **Instruções:** crie um `AGENTS.md` com 5 convenções e confirme que o agente as segue.
2. **Comando:** crie `/changelog` que insere a saída de `!`git log --oneline -10`` no prompt.
3. **Permissões:** negue a leitura de `.env*` e comprove que o agente não consegue lê-lo.
4. **Policy:** negue um provider via `provider.use` e confirme que ele some de `/models`, mesmo com credencial válida.
5. **Skill:** crie uma skill `review` com `description` e um arquivo de apoio em `references/`, depois carregue-a com `@review`.
6. **MCP:** adicione um MCP server local e verifique a conexão com `opencode mcp list`.

<details><summary>💡 Solução (desafio 2)</summary>

```md
---
description: Resume os últimos commits
---

Resuma estas mudanças:

!`git log --oneline -10`
```
</details>

<details><summary>💡 Solução (desafio 4)</summary>

```jsonc
{ "policies": [{ "action": "provider.use", "resource": "openai", "effect": "deny" }] }
```
</details>

<details><summary>💡 Solução (desafio 6)</summary>

```bash
opencode mcp add everything --global -- npx -y @modelcontextprotocol/server-everything
opencode mcp list
```
</details>

➡️ [Módulo 03](modulo-03.md)
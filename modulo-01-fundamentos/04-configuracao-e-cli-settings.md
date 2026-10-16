# 04. Configuração do Projeto e CLI settings

## 🎯 Objetivo
Entender a diferença entre a **configuração do servidor/projeto** (`opencode.json(c)`) e a **configuração do cliente de terminal** (`cli.json`), e usar as duas.

## 🧩 Duas configurações distintas

| Arquivo | Controla | Escopo |
|---------|----------|--------|
| `opencode.json(c)` | Servidor e projeto: modelo, agentes, comandos, permissões, MCP, providers, formatters... | Global/sistema/projeto |
| `cli.json` | Só o cliente de terminal: tema, keybinds, abas, diffs, sons, mini... | Global do usuário |

> Regra de ouro: nada de tema/keybind vai em `opencode.json`; nada de modelo/agente/permissão vai em `cli.json`.

## 📋 `opencode.json(c)` — servidor e projeto

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "permissions": [
    { "action": "shell", "resource": "git push *", "effect": "ask" }
  ]
}
```

> Exemplo completo e comentado: [`exemplos/opencode.jsonc`](exemplos/opencode.jsonc).

### Locais e precedência

```
/etc/opencode/opencode.json                # sistema (Linux)
~/.config/opencode/opencode.json           # global do usuário
<projeto>/opencode.json                    # projeto
<projeto>/.opencode/opencode.json          # projeto (.opencode sobrepõe o direto)
```

A busca sobe do diretório atual até a raiz. Configs `.opencode` descobertas sobrepõem as configs diretas. Sistema e preferências gerenciadas têm a maior precedência.

### Campos comuns

`model`, `default_agent`, `permissions`, `policies`, `agents`, `commands`, `plugins`, `providers`, `mcp`, `skills`, `instructions`, `references`, `formatter`, `shell`, `update`, `watcher`, `compaction`, `warming`, `snapshots`, `media`, `tool_output`, `websearch`, `worktree`.

### Variáveis e segredos

```jsonc
{
  "model": "{env:OPENCODE_MODEL}",
  "providers": {
    "anthropic": { "settings": { "apiKey": "{env:ANTHROPIC_API_KEY}" } }
  }
}
```

- `{env:VAR}` substitui uma variável de ambiente
- `{file:caminho}` insere o conteúdo de um arquivo (bom para chaves fora do Git)

## 🎛️ `cli.json` — cliente de terminal

```jsonc title="~/.config/opencode/cli.json"
{
  "$schema": "https://opencode.ai/v2/cli.json",
  "theme": { "name": "tokyonight", "mode": "system" },
  "keybinds": { "leader": "ctrl+x" },
  "session": { "thinking": "show", "tps": true },
  "diffs": { "source": "branch", "view": "auto" },
  "attention": { "notifications": true, "sound": true }
}
```

- Caminho: `~/.config/opencode/cli.json` (ou `$XDG_CONFIG_HOME/opencode/cli.json`). Não há `cli.json` por projeto.
- Config inline: `OPENCODE_CLI_CONFIG_CONTENT='{"tabs":{"mode":"off"}}' opencode`
- Principais grupos: `theme`, `animations`, `cursor`, `mouse`, `scroll`, `prompt`, `session`, `tabs`, `diffs`, `attention`, `terminal`, `mini`, `keybinds`, `plugins`, `debug`.
- Prefira **Ctrl+P → Open settings** na TUI para mudar o essencial.

## 🖋️ Formatters (formatar arquivos automaticamente)

Desabilitados por padrão; ative no `opencode.json(c)` para o OpenCode formatar após `write`/`edit`/`patch`:

```jsonc
// habilitar todos os formatadores embutidos disponíveis
{ "formatter": true }

// ou customizar/estender:
{
  "formatter": {
    "prettier": { "extensions": [".js", ".ts"] },
    "deno-markdown": { "command": ["deno", "fmt", "$FILE"], "extensions": [".md"] }
  }
}
```

Há formatters embutidos (gofmt, prettier, biome, ruff, rustfmt, shfmt, terraform…). `command` é um array (não shell), com `$FILE` substituído pelo caminho absoluto.

## ❓ Desafio prático

1. Crie um `opencode.jsonc` no seu projeto com `$schema` e um `model`
2. Defina `{ "action": "shell", "resource": "git push *", "effect": "ask" }` em `permissions` e teste
3. Ajuste o tema e um keybind no `cli.json` e reinicie a TUI
4. Ative `formatter: true` e veja um arquivo ser formatado após uma edição

## 📚 Fonte oficial

- [Config](https://opencode.ai/v2/docs/config/) · [CLI settings](https://opencode.ai/v2/docs/cli/config/) · [Keybinds](https://opencode.ai/v2/docs/cli/keybinds/) · [Formatters](https://opencode.ai/v2/docs/formatters/)

---

**Próximo passo:** [Aula 05 — Modelos e Providers](05-modelos-e-providers.md) · [Voltar ao módulo](README.md)
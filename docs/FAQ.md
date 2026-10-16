# ❓ Perguntas frequentes

Respostas curtas, baseadas apenas na [documentação oficial do OpenCode V2](https://opencode.ai/v2/docs/).

## 1. Preciso de um provedor pago?

Não. O OpenCode descobre automaticamente modelos locais servidos por **Ollama**, **LM Studio** e **vLLM** (por exemplo, `ollama/gemma3:4b`), sem exigir conta. Também é possível conectar provedores do catálogo, que inclui modelos gratuitos.

## 2. Como mudo o modelo padrão?

Defina `"model": "provider/model"` no `opencode.json(c)` — por exemplo, `"anthropic/claude-sonnet-4-5"`. Para trocar apenas a sessão atual, use `/models` na TUI: a escolha não reescreve o arquivo de configuração.

## 3. Onde fica a configuração?

- **Global:** `~/.config/opencode/opencode.json(c)`
- **Projeto:** `opencode.json(c)` ou `.opencode/opencode.json(c)`
- **Sistema (Linux):** `/etc/opencode`
- **Só do terminal** (tema, keybinds): `~/.config/opencode/cli.json`

As configurações são mescladas por precedência: projeto sobrepõe global, e sistema/managed sobrepõe tudo.

## 4. Como inspecionar/resetar a configuração?

Use `opencode debug config` para ver as fontes de configuração resolvidas e `opencode debug paths` para listar os caminhos globais usados pelo OpenCode. Como os arquivos são mesclados por precedência, "resetar" uma opção significa removê-la ou ajustá-la no arquivo correspondente indicado por esses comandos.

## 5. Onde ficam os logs?

Os logs ficam em `~/.local/share/opencode/log/opencode.log`. Para ver mais detalhes, aumente a verbosidade:

```bash
OPENCODE_LOG_LEVEL=DEBUG opencode
```

## 6. Como manter segredos fora do Git?

Use substituição de variáveis nos arquivos de configuração: `{env:VAR}` lê uma variável de ambiente e `{file:caminho}` lê o conteúdo de um arquivo. Exemplo:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "openai": { "settings": { "apiKey": "{file:~/.secrets/openai-key}" } }
  }
}
```

## 7. O curso tem inglês?

Sim. O site tem um seletor de idioma e as páginas traduzidas ficam em `en/` (por exemplo, `en/docs/FAQ.md` e `en/modulo-01-fundamentos/`). O conteúdo das aulas também é escrito em português.

## 8. Como contribuo?

Veja o guia em [CONTRIBUTING.md](../CONTRIBUTING.md). Para dúvidas e discussões abertas, use as [GitHub Discussions](https://github.com/murilogteixeira/opencode-masterclass/discussions).

---

### Fontes

- Config: <https://opencode.ai/v2/docs/config/>
- Models: <https://opencode.ai/v2/docs/models/>
- Providers: <https://opencode.ai/v2/docs/providers/>
- CLI (comandos, `debug`, caminhos): <https://opencode.ai/v2/docs/cli/>
- CLI settings (`cli.json`): <https://opencode.ai/v2/docs/cli/config/>
- Troubleshooting (logs): <https://opencode.ai/v2/docs/troubleshooting/>

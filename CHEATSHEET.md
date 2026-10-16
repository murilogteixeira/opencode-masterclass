# 🧾 OpenCode Cheat Sheet

Referência rápida dos comandos, configurações e trechos mais usados no OpenCode (V2). Baseado na [documentação oficial](https://opencode.ai/v2/docs/).

---

## 📦 Instalação

```bash
curl -fsSL https://opencode.ai/v2/install | bash      # binário nativo
npm install -g @opencode/cli                          # npm
brew install anomalyco/tap/opencode-v2                # Homebrew (macOS/Linux)
mise use -g opencode                                  # mise (>= 2026.10.9)
```

## 🖥️ Interfaces

| Comando | O que faz |
|---------|-----------|
| `opencode` | TUI full-screen |
| `opencode mini` | Interface minimalista |
| `opencode run "prompt"` | Headless (scripts/CI) |
| `opencode serve` | Servidor de API/web |
| `opencode pair` | Links de pareamento (browser/app) |
| `opencode acp` | Servidor ACP (editores) |

## ⌨️ TUI — atalhos essenciais

| Ação | Atalho |
|------|--------|
| Paleta de comandos | `Ctrl+P` |
| Trocar modelo | `Ctrl+X` → `M` |
| Trocar agente | `Ctrl+X` → `A` / `Shift+Tab` |
| Nova sessão | `Ctrl+X` → `N` |
| Listar sessões | `Ctrl+X` → `L` |
| Undo / Redo | `Ctrl+X` → `U` / `Ctrl+X` → `R` |
| Anexar arquivo | `@arquivo` (ex.: `@src/auth.ts#20-45`) |
| Modo shell | `!comando` |
| Editor externo | `Ctrl+X` → `E` |
| Tecla leader | `Ctrl+X` (padrão) |

## 🤖 `opencode run` (headless)

```bash
opencode run --model anthropic/claude-sonnet-4-5 "Refatore parseToken"
opencode run --continue "Agora trate o caso expirado"
opencode run --format json "Liste os TODOs" | jq
opencode run --file src/server.ts "Revise buscando bugs"
opencode run --agent build "Corrija o teste que falha"
opencode run --standalone "Revise o diff"          # servidor privado (CI)
```

## 🧰 CLI

```bash
opencode auth login                       # conecta provedor
opencode auth list                        # credenciais salvas
opencode models                           # modelos disponíveis
opencode mcp add context7 --url https://mcp.context7.com/mcp
opencode mcp list
opencode plugin add opencode-acme-plugin@1.2.0
opencode session list --format json
opencode stats --cost                      # custo e tokens
opencode service status                    # saúde do serviço de fundo
opencode reload                            # recarrega config sem reiniciar
opencode upgrade
opencode debug paths | opencode debug config
```

## ⚙️ Configuração (`opencode.jsonc`)

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "permissions": [
    { "action": "shell", "resource": "git push *", "effect": "ask" },
    { "action": "read", "resource": ".env*", "effect": "deny" }
  ],
  "policies": [{ "action": "provider.use", "resource": "*", "effect": "deny" }],
  "instructions": ["CONTRIBUTING.md"],
  "formatter": true
}
```

Locais: `/etc/opencode` · `~/.config/opencode/opencode.json(c)` · `<projeto>/opencode.json(c)` · `<projeto>/.opencode/opencode.json(c)`
Segredos: `{env:VAR}` e `{file:caminho}`. **Preferências de terminal** ficam em `~/.config/opencode/cli.json` (tema, keybinds, abas).

## 🧑‍💻 Agente customizado (`.opencode/agents/<nome>.md`)

```md
---
description: Revisa mudanças (somente leitura)
mode: subagent
model: anthropic/claude-sonnet-4-5#high
permissions:
  - action: edit
    resource: "*"
    effect: deny
---

Revise as mudanças. Liste achados por severidade.
```

## ⚡ Comandos (`.opencode/commands/<nome>.md`)

```md
---
description: Revisa o diff
agent: plan
---

Revise $ARGUMENTS. Use o diff:

!`git diff --stat && git diff`
```

## 🧠 Skills (`.opencode/skills/<id>/SKILL.md`)

```md
---
name: Git Release
description: Prepara notas de release e bump de versão
---

1. Leia `references/policy.md`.
2. Resuma as mudanças desde a última tag.
```

## 🔌 MCP servers

```jsonc
{ "mcp": { "servers": { "playwright": { "type": "local", "command": ["bunx", "@playwright/mcp"] } } } }
```

## 🛡️ Permissões e Policies

- **Permissões** decidem `allow` / `ask` / `deny` — a **última regra que casa vence** (amplo antes, exceções depois)
- **Policies** são binárias (`allow`/`deny`), nunca perguntam e só restringem (provider, tool, mcp/skill/plugin)
- Ações comuns: `shell`, `edit`, `read`, `glob`, `grep`, `subagent`, `webfetch`, `websearch`, `skill`, `external_directory`

## 🚀 CI (GitHub Actions)

```yaml
- run: npm install --global @opencode/cli
- run: opencode run --standalone --model anthropic/claude-sonnet-4-5 "Review this PR"
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

## 🌐 API

```bash
opencode api get /api/info
opencode api session.list --param limit=10
opencode api session.create --data '{"title":"Nova sessão"}'
```

## 🔧 Troubleshooting

```bash
opencode service status            # serviço saudável?
opencode api get /api/info         # health check
opencode --standalone              # isolar do serviço compartilhado
# logs: ~/.local/share/opencode/log/opencode.log
OPENCODE_LOG_LEVEL=DEBUG opencode run "caso"
```

---

📚 Referências: [Config](https://opencode.ai/v2/docs/config/) · [CLI](https://opencode.ai/v2/docs/cli/) · [Agents](https://opencode.ai/v2/docs/agents/) · [Commands](https://opencode.ai/v2/docs/commands/) · [Skills](https://opencode.ai/v2/docs/skills/) · [Plugins](https://opencode.ai/v2/docs/plugins/) · [Permissions](https://opencode.ai/v2/docs/permissions/) · [Policies](https://opencode.ai/v2/docs/policies/)
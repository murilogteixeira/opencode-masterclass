# 02. Setup do Ambiente OpenCode

## 🎯 Objetivo
Instalar o OpenCode, conectar um provedor de modelos e validar o ambiente com comandos reais.

## 📦 Pré-requisitos

- Linux, macOS ou Windows (os gerenciadores de pacote do Windows não são suportados — use o instalador binário)
- **Só para o método npm:** Node.js/npm instalados. Os outros métodos instalam um binário nativo, sem depender de Node.

## 🚀 Instalação

### Método 1 — curl (binário nativo, sem Node)

```bash
curl -fsSL https://opencode.ai/v2/install | bash
```

### Método 2 — npm

```bash
npm install -g @opencode/cli
```

> O pacote npm usa um script `postinstall` para selecionar o binário nativo da sua plataforma.

### Outros métodos

```bash
# Homebrew (macOS/Linux)
brew install anomalyco/tap/opencode-v2

# mise (requer mise >= 2026.10.9)
mise use -g opencode

# Bun / pnpm
bun install -g --trust @opencode/cli
pnpm add -g --allow-build=@opencode/cli @opencode/cli
```

## 🔑 Conectar um provedor de modelos

Na TUI, use o comando `/connect`, escolha o provedor e siga o fluxo (API key ou OAuth):

```text
/connect
/models
```

Ou pelo terminal, sem abrir a TUI:

```bash
# abre um seletor interativo de provedores
opencode auth login

# direto, com método explícito
opencode auth login anthropic --method key
```

> Variáveis de ambiente também funcionam, por exemplo `ANTHROPIC_API_KEY=... opencode --standalone` para uma sessão isolada.

## ⚙️ Configuração básica do projeto

O OpenCode se configura com **`opencode.json(c)`** (JSON/JSONC), na raiz do projeto. Não existem variáveis como `OPENCODE_API_URL` para configurar provedores — tudo vai no arquivo de configuração:

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  // modelo padrão no formato provider/model
  "model": "anthropic/claude-sonnet-4-5",
}
```

Locais válidos de configuração:

| Local | Escopo |
|-------|--------|
| `~/.config/opencode/opencode.json(c)` | Global (todos os projetos do usuário) |
| `opencode.json(c)` na raiz do projeto | Projeto |
| `.opencode/opencode.json(c)` | Projeto (sobrepõe o `opencode.json` direto da raiz) |

Segredos ficam fora do arquivo versionado — use substituição: `"apiKey": "{env:ANTHROPIC_API_KEY}"` ou `{file:~/.secrets/chave}`.

## ✅ Validação do ambiente

```bash
# lista os comandos e flags disponíveis
opencode --help

# lista os modelos disponíveis
opencode models

# lista credenciais salvas
opencode auth list

# estado do serviço de fundo
opencode service status

# primeiro prompt headless (a prova de fogo)
opencode run "Explique este repositório em 5 linhas"
```

## 🔍 Checklist

- [ ] `opencode --help` responde
- [ ] `opencode auth list` mostra sua credencial
- [ ] `opencode service status` mostra o serviço saudável
- [ ] `opencode run` responde um prompt de teste

## ❓ Desafio prático

Crie um script Bash chamado `hello_opencode.sh` que:
1. Imprima "Iniciando OpenCode..."
2. Crie uma pasta `outputs/`
3. Salve em `outputs/status.txt` o resultado de `opencode service status`
4. Imprima "Configuração concluída com sucesso!"

> Um esqueleto está em [`exemplos/hello_opencode.sh`](exemplos/hello_opencode.sh) — complete-o e depois compare.

## 📚 Fonte oficial

- [Instalação e interfaces](https://opencode.ai/v2/docs/)
- [Referência de comandos da CLI](https://opencode.ai/v2/docs/cli/commands/)
- [Provedores e autenticação](https://opencode.ai/v2/docs/cli/providers/)
- [Configuração](https://opencode.ai/v2/docs/config/)

---

**Próximo passo:** [Módulo 02 — APIs, Prompts e Dados](../modulo-02-intermediario/README.md) · [Voltar ao módulo](README.md)
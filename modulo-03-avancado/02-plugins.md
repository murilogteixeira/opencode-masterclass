# 02. Plugins: instalar e configurar

## 🎯 Objetivo
Adicionar plugins ao OpenCode — pacotes publicados, versões específicas, pacotes com escopo ou diretórios locais — e gerenciá-los pela CLI.

## 📋 O que plugins fazem

Plugins modificam o comportamento e adicionam recursos: ferramentas, hooks, integrações, comandos, agentes e mais (criação na [Aula 03](03-criando-plugins.md)).

## ⚙️ Configurar

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    "opencode-acme-plugin",
    "opencode-acme-plugin@1.2.0",
    "@acme/opencode-plugin",
    "./plugins/local",
    "../shared/plugin.ts",
    "file:///home/me/plugins/local",
    {
      "package": "@acme/opencode-plugin",
      "options": { "agent": "reviewer", "strict": true }
    }
  ]
}
```

- Caminhos relativos resolvem a partir do arquivo de config
- Arrays de plugins de configs aplicáveis são **combinados** (da menor para a maior precedência)

## 🔍 Descoberta automática

OpenCode carrega automaticamente `.ts`/`.js` e diretórios de pacote de cada diretório `.opencode/plugins/` descoberto:

```text
.opencode/
└── plugins/
    ├── concise.ts
    ├── reviewer.js
    └── acme-package/
```

Global: `~/.config/opencode/plugins/`. (Um `plugins/` ao lado do `opencode.json` da raiz **não** é descoberto; mova para `.opencode/` ou configure explicitamente.)

## 🎚️ Controle (habilitar/desabilitar)

Entradas são processadas em ordem. Prefixe com `-` para desabilitar, use `*` para todos e `.*` para prefixo. Um ID posterior reabilita:

```jsonc
{
  "plugins": ["*", "-opencode.provider.*", "opencode.provider.openai", "-acme.reviewer"]
}
```

> Dois plugins embutidos ignoram remoção para que um repositório não desligue a aplicação de [policies](../modulo-02-intermediario/03-permissoes-e-policies.md): `opencode.config.policy` e `opencode.provider.opencode`.

## 🧰 Gerenciar via CLI

```bash
opencode plugin add opencode-acme-plugin@1.2.0
opencode plugin list
opencode plugin list --builtin
opencode plugin check
opencode plugin update
opencode plugin remove opencode-acme-plugin@1.2.0
```

Aceita npm com versões/tags/ranges, além de pacotes Git (inclusive privados):

```bash
opencode plugin add @acme/opencode-plugin@latest
opencode plugin add github:acme/opencode-plugin
opencode plugin add 'github:acme/plugins#main::path:packages/opencode-plugin'
```

## 🖥️ Plugins de terminal (CLI)

Plugins exclusivos da TUI ficam em `cli.json` e permanecem ativos mesmo com servidor remoto:

```json title="~/.config/opencode/cli.json"
{
  "plugins": ["opencode-acme-cli"]
}
```

## ❓ Desafio prático

1. Instale um plugin com `opencode plugin add` e confirme em `opencode plugin list`
2. Desabilite-o com uma entrada `-nome` em `plugins` e observe o efeito
3. Adicione um plugin local em `.opencode/plugins/` e veja a descoberta automática
4. Rode `opencode plugin check` para ver atualizações

## 📚 Fonte oficial

- [Plugins (uso)](https://opencode.ai/v2/docs/plugins/) · [CLI — plugin](https://opencode.ai/v2/docs/cli/commands/)

---

**Próximo passo:** [Aula 03 — Criando plugins](03-criando-plugins.md) · [Voltar ao módulo](README.md)
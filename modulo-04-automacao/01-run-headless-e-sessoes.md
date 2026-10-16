# 01. `opencode run` e gestão de sessões

## 🎯 Objetivo
Usar o OpenCode sem interface: executar prompts, escolher modelo/agente, obter saída JSON e gerenciar sessões pela CLI.

## 📋 `opencode run` — headless

```bash
# resposta direta no terminal
opencode run "Explique este repositório"

# escolhe o modelo (sem mudar o padrão)
opencode run --model anthropic/claude-sonnet-4-5 "Refatore parseToken"

# continua a última sessão
opencode run --continue "Agora trate o caso do token expirado"

# saída JSON (newline-delimited) para scripts
opencode run --format json "Liste os comentários TODO"

# anexa arquivos ao prompt
opencode run --file src/server.ts --file src/client.ts "Revise isto procurando bugs"

# roda com um agente específico
opencode run --agent build "Corrija o teste que falha"

# servidor privado (CI, isolamento)
opencode run --standalone "Revise o diff"
```

## 🖥️ Outras interfaces não-gráficas

| Comando | O que faz |
|---------|-----------|
| `opencode` | TUI full-screen |
| `opencode mini` | Interface interativa minimalista (`--continue`, `--model`, `--prompt`) |
| `opencode serve` | Servidor de API/web |
| `opencode pair` | Links de pareamento (browser/app) com QR |
| `opencode acp` | Servidor ACP para editores |

## 🗂️ Sessões

```bash
opencode session list
opencode session list --max-count 20 --format json
opencode session export ses_4f2a1c
opencode session export ses_4f2a1c --sanitize      # remove dados sensíveis
opencode session import session.json --directory ~/code/projeto
opencode session delete ses_9c1b08                 # remove também sessões filhas
```

## 📊 Estatísticas

```bash
opencode stats              # estatísticas de uso
opencode stats --days 7
opencode stats --models
opencode stats --cost
opencode stats --json
```

## 🔧 Manutenção

```bash
opencode service status      # estado do serviço de fundo
opencode reload              # recarrega config sem reiniciar o servidor
opencode upgrade             # atualiza o OpenCode
opencode uninstall --dry-run # pré-visualiza a remoção
opencode debug paths         # caminhos (db, config, log…)
```

## ❓ Desafio prático

1. Rode `opencode run --format json "Liste os TODOs" | jq` no seu projeto
2. Encadeie duas chamadas com `--continue`
3. Exporte uma sessão com `--sanitize` e inspecione o JSON
4. Meça o custo de uma tarefa com `opencode stats --cost`

## 📚 Fonte oficial

- [CLI commands](https://opencode.ai/v2/docs/cli/commands/) · [CLI](https://opencode.ai/v2/docs/cli/)

---

**Próximo passo:** [Aula 02 — CI/CD](02-ci-cd.md) · [Voltar ao módulo](README.md)
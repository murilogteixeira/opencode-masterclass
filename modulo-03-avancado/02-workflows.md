# 02. Automação de Workflows (CI/CD)

## 🎯 Objetivo
Usar o OpenCode fora da TUI — em scripts, pipelines e revisão automática de PRs com `opencode run`.

## 📋 `opencode run` — o OpenCode headless

```bash
# resposta direta no terminal
opencode run "Explique este repositório"

# escolhe o modelo
opencode run --model anthropic/claude-sonnet-4-5 "Refatore parseToken"

# continua a última sessão
opencode run --continue "Agora trate o caso do token expirado"

# saída JSON (newline-delimited) para scripts
opencode run --format json "Liste os comentários TODO"

# anexa arquivos ao prompt
opencode run --file src/server.ts "Revise isto procurando bugs"

# roda com um agente específico
opencode run --agent build "Corrija o teste que falha"

# modo standalone: servidor privado, útil em CI
opencode run --standalone "Revise o diff"
```

## 🤖 Exemplo real: revisão de PR no GitHub Actions

Da documentação oficial — revise o repositório automaticamente a cada pull request:

```yaml title=".github/workflows/opencode-review.yml"
name: OpenCode review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install --global @opencode/cli
      - run: opencode run --standalone --model anthropic/claude-sonnet-4-5 "Review this repository for correctness and summarize any issues."
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

Pontos-chave:
- **`--standalone`**: em CI use um servidor privado — a API key como secret vai para ele
- **Secrets**: nunca coloque a chave em texto no workflow
- **`--model`**: fixe o modelo para resultados previsíveis e custo controlado

## 🛡️ Segurança da automação

Em ambientes headless ninguém está lá para aprovar. Restrinja o agente:

```jsonc title="opencode.jsonc"
{
  "agents": {
    "ci-reviewer": {
      "mode": "subagent",
      "permissions": [
        { "action": "shell", "resource": "*", "effect": "deny" },
        { "action": "edit", "resource": "*", "effect": "deny" },
      ],
    },
  },
}
```

E execute com `opencode run --agent ci-reviewer ...` — o agente vira revisor read-only.

## 🧰 Comandos úteis para automação

```bash
opencode session list --format json   # lista sessões
opencode api GET /api/session         # fala direto com a API do servidor
opencode service status               # diagnóstico do serviço de fundo
opencode stats --cost                 # custo e tokens — monitore a automação!
```

## ❓ Desafio prático

1. Crie um agente `ci-reviewer` read-only (Aula 01)
2. Adicione o workflow acima ao seu repositório de teste (com um secret real)
3. Abra um PR com um bug intencional e leia o comentário do revisor
4. Bonus: troque `--format json` e parseie a resposta com `jq`

## 📚 Fonte oficial

- [Comandos da CLI](https://opencode.ai/v2/docs/cli/commands/) — flag `run` com exemplo de CI
- [API](https://opencode.ai/v2/docs/api/)
- [Permissões](https://opencode.ai/v2/docs/permissions/)

---

**Próximo passo:** [Aula 03 — Boas Práticas](03-boas-praticas.md) · [Voltar ao módulo](README.md)
# 02. CI/CD: OpenCode em pipelines

## 🎯 Objetivo
Integrar o OpenCode a pipelines de CI/CD para revisar PRs, gerar resumos e rodar tarefas automatizadas com segurança.

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
- **`--standalone`**: em CI use um servidor privado — o secret vai para o processo do servidor
- **Secrets**: nunca coloque a chave em texto no workflow
- **`--model`**: fixe o modelo para resultados previsíveis e custo controlado
- **`--agent`**: use um agente read-only (abaixo)

## 🛡️ Segurança da automação

Em ambientes headless ninguém aprova. Restrinja o agente:

```jsonc title="opencode.jsonc"
{
  "agents": {
    "ci-reviewer": {
      "mode": "subagent",
      "permissions": [
        { "action": "shell", "resource": "*", "effect": "deny" },
        { "action": "edit", "resource": "*", "effect": "deny" }
      ]
    }
  }
}
```

```bash
opencode run --standalone --agent ci-reviewer "Revise as mudanças do PR"
```

Para regras que **nunca** podem ser reabilitadas por um repositório, use [policies](../modulo-02-intermediario/03-permissoes-e-policies.md):

```jsonc
{
  "policies": [{ "action": "tool.use", "resource": "shell:*", "effect": "deny" }]
}
```

## 🔁 Padrões úteis de pipeline

- **Comentário no PR**: capture `--format json` e poste via API do GitHub
- **Portão de qualidade**: falhe o job se o resumo contiver achados "severity: high"
- **Sessões isoladas**: cada job roda com `--standalone` para não vazar estado
- **Custo**: registre `opencode stats --cost` como artefato para monitorar gasto

## 🧰 Comandos úteis

```bash
opencode session list --format json   # lista sessões do job
opencode api GET /api/session         # fala direto com a API do servidor
opencode service status               # diagnóstico do serviço de fundo
opencode stats --cost                 # custo e tokens
```

## ❓ Desafio prático

1. Crie um agente `ci-reviewer` read-only
2. Adicione o workflow acima ao seu repositório de teste (com um secret real)
3. Abra um PR com um bug intencional e leia o comentário do revisor
4. Faça o job falhar quando houver achado de alta severidade

## 📚 Fonte oficial

- [CLI — run e CI](https://opencode.ai/v2/docs/cli/commands/) · [API](https://opencode.ai/v2/docs/api/) · [Permissions](https://opencode.ai/v2/docs/permissions/)

---

**Próximo passo:** [Aula 03 — Workflows e boas práticas](03-workflows-e-boa-praticas.md) · [Voltar ao módulo](README.md)
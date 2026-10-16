# 03. Custo e estatísticas

## 🎯 Objetivo
Medir e otimizar custo e tokens com `opencode stats`, entendendo o que mais impacta a fatura.

## 📊 O comando `stats`

```bash
opencode stats              # relatório compartilhável
opencode stats --days 7     # janela de 7 dias
opencode stats --models     # uso por modelo
opencode stats --cost       # custo e tokens
opencode stats --json       # para pipelines
```

## 💸 O que mais pesa

1. **Contexto grande** — o maior fator de custo (entrada + cache)
2. **Modelo** — trocar por variantes `#low` em tarefas mecânicas
3. **Saídas de ferramentas** — logs/builds enormes inflam o histórico
4. **Warming** — requisições reais de keep-alive
5. **Subagentes** — cada filho consome de forma independente

## 🛠️ Ações que reduzem custo

```jsonc
{
  "compaction": { "auto": true },
  "tool_output": { "max_lines": 2000, "max_bytes": 51200 },
  "agents": {
    "ci-reviewer": { "steps": 8 }
  }
}
```

- Fixe modelos por papel: barato para revisão mecânica, forte para arquitetura
- Prefira `--format json` e processe fora do contexto
- Limite `steps` de subagentes
- Desligue `warming` se não houver ganho de cache

## 🧮 Estimar antes de gastar

- Modelos têm `cost` (input/output/cache por 1M tokens) — confira no catálogo
- Use `opencode run --model provider/model#low` para tarefas repetitivas
- Monitore a automação: registre `opencode stats --cost` como artefato no CI

## 🔍 Auditoria

```bash
opencode stats --days 30 --models
opencode stats --cost --json | jq
```

Para times, o [Console](../modulo-06-operacao/04-console-e-enterprise.md) adiciona budgets e leaderboard.

## ❓ Desafio prático

1. Meça o custo de uma refatoração longa com `--cost`
2. Ative `compaction` + `tool_output` e repita — compare os números
3. Rode a mesma tarefa com `#low` e `#high` e compare custo x qualidade
4. Exporte `--json` e crie um pequeno relatório com `jq`

## 📚 Fonte oficial

- [CLI — stats](https://opencode.ai/v2/docs/cli/commands/) · [Models (cost)](https://opencode.ai/v2/docs/models/) · [Compaction](https://opencode.ai/v2/docs/compaction/)

---

**Próximo passo:** [Aula 04 — Console e enterprise](04-console-e-enterprise.md) · [Voltar ao módulo](README.md)
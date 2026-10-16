# Otimização de Performance: Contexto, Custo e Velocidade

## 🎯 Objetivo
Reduzir custo e latência das suas sessões e automações OpenCode, controlando o contexto enviado ao modelo.

## 📋 Onde o contexto vai embora

1. **Saídas de ferramentas gigantes** (logs, builds, arquivos enormes)
2. **Sessões longas sem compactação**
3. **Prompts repetindo contexto que já está em `AGENTS.md`**

## 🛠️ Configurações que resolvem

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",

  // compactação automática quando o contexto enche
  "compaction": { "auto": true },

  // corta saídas gigantes de ferramentas
  "tool_output": {
    "max_lines": 2000,
    "max_bytes": 51200,
  },

  // redimensiona imagens grandes antes de enviá-las ao modelo
  "media": {
    "image": { "auto_resize": true, "max_width": 2000, "max_height": 2000 },
  },

  // snapshots em repos gigantes custam I/O — avalie desligar
  "snapshots": false,

  // ignora diretórios ruidosos no watcher
  "watcher": { "ignore": ["dist/**", "coverage/**", "node_modules/**"] },
}
```

## 🛠️ Passos limitados para subagents

Agentes filhos podem dar voltas demais. Limite o número de passos do modelo:

```yaml
steps: 8   # no último passo, o agente resume em texto
```

## 🛠️ Meça antes de otimizar

```bash
opencode stats --cost          # custo e tokens por modelo
opencode stats --models        # uso por modelo
opencode stats --days 7        # janela de 7 dias
opencode stats --json          # para pipelines
```

Regra prática: otimize **contexto primeiro** (maior impacto em custo e qualidade), depois modelo (troque por variantes `#low` em tarefas mecânicas).

## ❓ Desafio prático

1. Rode uma sessão de refatoração longa com `opencode stats --cost` anotado
2. Ative `compaction` e `tool_output` e repita o exercício
3. Compare os dois números no git (commit o `opencode.jsonc` da otimização)

## 📚 Fontes oficiais

- [Compaction](https://opencode.ai/v2/docs/compaction/) · [Config](https://opencode.ai/v2/docs/config/) · [Agents (`steps`)](https://opencode.ai/v2/docs/agents/)
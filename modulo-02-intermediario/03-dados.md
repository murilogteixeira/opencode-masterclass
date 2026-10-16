# 03. Manipulação de Dados com Python e JavaScript

## 🎯 Objetivo
Processar, transformar e validar dados usando Python e JavaScript dentro do fluxo OpenCode.

## 📋 Conteúdo

### Processamento de JSON

```python
import json
dados = {"nome": "Murilo", "idade": 30}
json_str = json.dumps(dados, indent=2)
parsed = json.loads(json_str)
```

### Validação de dados

Use `pydantic` ou `ajv` para validar estruturas antes do processamento.

### Com o OpenCode no fluxo

```bash
# pede ao agente para executar e explicar o script
opencode run --file exemplos/dados_exemplo.py "Execute e explique o relatório gerado"

# saída estruturada para pipelines de dados
opencode run --format json "Resuma este dataset em 3 métricas" --file dados.json
```

## 💡 Exemplo
Veja [`exemplos/dados_exemplo.py`](exemplos/dados_exemplo.py) — gera um relatório de notas em JSON formatado.

## ❓ Desafio prático

1. Execute `python exemplos/dados_exemplo.py` e leia o relatório
2. Peca ao OpenCode para adicionar "melhor nota por aluno" e a mediana ao relatório
3. Commit apenas quando o relatório estiver completo — compare os dois estados no git

## 📚 Fonte oficial

- [Comandos da CLI — `run`](https://opencode.ai/v2/docs/cli/commands/)

---

**Próximo passo:** [Módulo 03 — Agentes e Automação](../modulo-03-avancado/README.md) · [Voltar ao módulo](README.md)

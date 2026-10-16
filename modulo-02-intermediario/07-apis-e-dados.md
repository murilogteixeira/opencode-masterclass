# 07. APIs externas e manipulação de dados

## 🎯 Objetivo
Aplicar o OpenCode em tarefas reais de integração: consumir APIs REST, tratar erros e processar dados — com o agente escrevendo, executando e explicando o código.

## 📋 Consumo de API com código

Peça ao OpenCode para escrever e testar a chamada direto no seu projeto. Exemplo de estudo em [`exemplos/api_exemplo.py`](exemplos/api_exemplo.py):

```python
import requests

def buscar_dados(url, token=None):
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    try:
        resposta = requests.get(url, headers=headers, timeout=10)
        resposta.raise_for_status()
        return resposta.json()
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        return None
```

Boas práticas:
- **Timeout sempre** + `try/except` para erros de rede
- Valide `status_code` antes de parsear
- Chaves de API em variáveis de ambiente — nunca no código
- Limite a saída: use `opencode run --format json` para pipelines

## 📋 Manipulação de dados

Veja [`exemplos/dados_exemplo.py`](exemplos/dados_exemplo.py) — gera um relatório JSON formatado a partir de uma lista de notas:

```python
import json
from datetime import datetime

alunos = json.loads(dados_raw)
relatorio = {
    "total_alunos": len(alunos),
    "media_geral": sum(a["nota"] for a in alunos) / len(alunos),
    "mais_alto": max(alunos, key=lambda x: x["nota"]),
}
print(json.dumps(relatorio, indent=2, ensure_ascii=False))
```

### Com o OpenCode no fluxo

```bash
# executa e explica o script
opencode run --file exemplos/dados_exemplo.py "Execute e explique o relatório gerado"

# saída estruturada para pipelines de dados
opencode run --format json --file dados.json "Resuma este dataset em 3 métricas"
```

## 🧠 Dicas de prompt para dados

- Passe o arquivo com `--file` ou `@arquivo` em vez de colar o conteúdo
- Peça o **formato de saída** explicitamente (JSON, tabela, CSV)
- Para grandes entradas, peça paging/análise incremental (o `read` pagina por linhas)

## ❓ Desafio prático

1. Peca ao OpenCode: "crie uma função que busca os 10 primeiros posts de https://jsonplaceholder.typicode.com e imprime o título de cada um"
2. Adicione tratamento de erro e timeout e teste com uma URL inválida
3. Peca para estender `dados_exemplo.py` com mediana e melhor aluno por média
4. Gere a saída com `--format json` e parseie com `jq`

## 📚 Fonte oficial

- [CLI — run](https://opencode.ai/v2/docs/cli/commands/) · [Tools](https://opencode.ai/v2/docs/tools/)

---

**Próximo passo:** [Módulo 03 — Avançado](../modulo-03-avancado/README.md) · [Voltar ao módulo](README.md)
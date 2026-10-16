# 01. Integração de APIs com OpenCode

## 🎯 Objetivo
Consumir APIs externas em duas frentes: código Python/JS gerado e testado com o OpenCode, e **MCP servers** — a forma nativa de dar ferramentas externas ao agente.

## 📋 Parte 1 — Chamadas de API com código no seu fluxo

Peça ao OpenCode para escrever e testar chamadas de API diretamente no seu projeto. Exemplo de código para estudo (veja [`exemplos/api_exemplo.py`](exemplos/api_exemplo.py)):

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
- Trate erros de rede com `try/except` e timeout sempre
- Valide `status_code` antes de parsear
- Chaves de API em variáveis de ambiente — **nunca** no código

## 📋 Parte 2 — MCP: dando ferramentas ao agente

O **Model Context Protocol (MCP)** conecta o OpenCode a serviços externos (banco de dados, docs, APIs). Servidores ficam sob `mcp.servers` do `opencode.json` — ou use a CLI:

```bash
# servidor remoto (OAuth por padrão)
opencode mcp add context7 --url https://mcp.context7.com/mcp

# servidor local, no config global
opencode mcp add everything --global -- npx -y @modelcontextprotocol/server-everything

# com variável de ambiente
opencode mcp add everything --env LOG_LEVEL=debug -- npx -y @modelcontextprotocol/server-everything

# listar e autenticar
opencode mcp list
opencode mcp auth sentry
```

> Servidores remotos usam OAuth por padrão. Se o `mcp list` indicar autenticação pendente, use `/mcps` na TUI para entrar. Credenciais com header usam `{env:VAR}` — nunca escreva segredo literal no config.

## ❓ Desafio prático

1. Peca ao OpenCode: "crie uma função que busca os 10 primeiros posts de https://jsonplaceholder.typicode.com e imprime o título de cada um"
2. Adicione um MCP server local com `opencode mcp add` e verifique em `opencode mcp list`
3. Na TUI, confira em `/mcps` se o servidor conectou

## 📚 Fonte oficial

- [MCP servers](https://opencode.ai/v2/docs/mcp-servers/)
- [Comandos da CLI — `mcp`](https://opencode.ai/v2/docs/cli/commands/)

---

**Próximo passo:** [Aula 02 — Prompts Avançados e Instruções de Projeto](02-prompts.md) · [Voltar ao módulo](README.md)
# 01. HTTP API

## 🎯 Objetivo
Falar diretamente com a API HTTP do servidor OpenCode — a mesma que a TUI usa.

## 📋 Visão geral

O servidor expõe uma API HTTP descrita por um documento OpenAPI em `/openapi.json`. Use o comando embutido `api`, que reutiliza a descoberta e a autenticação da TUI (e pode iniciar o serviço de fundo):

```bash
opencode api get /api/info
```

Chamadas com método + path:

```bash
opencode api post /api/example --data '{"key":"value"}'
opencode api get /api/example --header 'X-Example:value'
```

Ou pelo **operation ID** com `--param`:

```bash
opencode api session.list --param limit=10
opencode api session.create --data '{"title": "Nova sessão"}'
```

- Corpo de requisição assume `Content-Type: application/json`
- `--data`/`-d` envia o corpo; `--header`/`-H` adiciona cabeçalhos

## 🧪 Health check

```bash
opencode api get /api/info
```

Resposta bem-sucedida confirma a conexão cliente↔serviço e é o health check padrão em deploys.

## 🔌 Servidor

```bash
opencode serve
opencode serve --hostname 0.0.0.0 --port 4096 --cors https://app.example.com
```

Quando conectado a um servidor explícito, use o mesmo contexto de autenticação configurado em vez de montar uma requisição não autenticada.

## 🧰 Ferramentas de apoio

```bash
opencode service status        # o serviço de fundo está saudável?
opencode debug paths db        # caminho do banco (sessões/credenciais)
```

## ❓ Desafio prático

1. Rode `opencode api get /api/info` e confirme a saúde
2. Liste sessões por path e por operation ID
3. Crie uma sessão com `--data` e recupere-a
4. Suba `opencode serve` com `--cors` e chame de um script

## 📚 Fonte oficial

- [API](https://opencode.ai/v2/docs/api/) · [CLI — api](https://opencode.ai/v2/docs/cli/commands/)

---

**Próximo passo:** [Aula 02 — Cliente JavaScript](02-cliente-javascript.md) · [Voltar ao módulo](README.md)
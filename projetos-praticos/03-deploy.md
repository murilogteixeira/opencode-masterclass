# Deploy e Integrações: Servidor, Web, Docker e Editores

## 🎯 Objetivo
Expor o OpenCode como serviço, acessá-lo pelo navegador, containerizá-lo e integrá-lo a editores.

## 📋 Servidor HTTP e acesso web

```bash
# servidor de API/web na porta padrão
opencode serve

# produção: bind em todas as interfaces, porta fixa e CORS explícito
opencode serve --hostname 0.0.0.0 --port 4096 --cors https://app.example.com

# pareamento do navegador/app com link de uso único + QR (expira em 5 min)
opencode pair

# acesso remoto (expõe o servidor à internet — leia o aviso antes de aceitar)
opencode pair --remote
```

O serviço de fundo compartilhado é o padrão; controle-o com:

```bash
opencode service status | start | stop | restart
```

## 📋 Health check e API

O servidor expõe um OpenAPI em `/openapi.json`. Valide o serviço com:

```bash
opencode api get /api/info
```

Use `opencode api` (método + path, ou operation ID) com `--data` para POST e `-H` para headers — o mesmo contexto de auth da TUI, sem montar requests na mão.

## 📋 Docker

As imagens usam tags versionadas:

```bash
docker pull ghcr.io/anomalyco/opencode:2.0.0
```

Estratégia mínima de deploy:
1. Rodar o container com a API key via variável de ambiente (nunca na imagem)
2. `opencode serve` atrás de um proxy com TLS
3. Volumes persistentes para dados de sessão
4. Health check em `/api/info` e rollback por tag fixa

## 📋 Integração com editores (ACP)

O OpenCode expõe o Agent Client Protocol sobre stdin/stdout para editores:

```bash
opencode acp
```

Clientes ACP (como editores que suportam o protocolo) conectam nesse processo.

## 📋 Checklist de produção

- [ ] API key em variável de ambiente / secret manager, nunca em arquivo versionado
- [ ] `--cors` restrito aos domínios que realmente usam o app
- [ ] `opencode pair --remote` usado com consciência — expõe o servidor à internet
- [ ] Logs em `~/.local/share/opencode/log/opencode.log` coletados (sem segredos)
- [ ] Upgrade versionado: `opencode upgrade` / rollback por tag

## 📚 Fontes oficiais

- [CLI](https://opencode.ai/v2/docs/cli/) · [Web](https://opencode.ai/v2/docs/cli/web/) · [API](https://opencode.ai/v2/docs/api/) · [ACP](https://opencode.ai/v2/docs/cli/acp/) · [Troubleshooting](https://opencode.ai/v2/docs/troubleshooting/)
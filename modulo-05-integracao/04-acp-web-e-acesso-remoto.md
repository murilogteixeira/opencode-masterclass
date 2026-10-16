# 04. ACP, Web e acesso remoto

## 🎯 Objetivo
Integrar o OpenCode a editores via ACP, acessá-lo pelo navegador e expô-lo remotamente com segurança.

## 🖥️ ACP (Agent Client Protocol)

O OpenCode expõe um servidor ACP sobre stdin/stdout para integração com editores:

```bash
opencode acp
```

Ele roda até o cliente fechar a conexão. Editores que suportam o protocolo conectam nesse processo.

## 🌐 Interface web

```bash
opencode pair
```

Mostra URLs de uso único (mais um QR do primeiro link) para assinar um navegador ou app no servidor. Os links **expiram em 5 minutos** e funcionam uma vez.

```bash
opencode pair --url https://dev.example.com
```

## 🌍 Acesso remoto

```bash
opencode pair --remote
```

Expõe o servidor à internet via endereço remoto (OpenTunnel). Na primeira vez, explica a exposição e pede aceite. Para automação sem prompt:

```bash
opencode pair --remote --yes
```

Você também pode servir a API/web e gerenciar o serviço de fundo:

```bash
opencode serve --hostname 0.0.0.0 --port 4096 --cors https://app.example.com
opencode service status | start | stop | restart
```

## 🔒 Segurança do acesso remoto

- `--remote` **expõe o servidor à internet** — aceite só quando necessário
- Restrinja `--cors` aos domínios que realmente usam o app
- Links de pareamento são de uso único e curtos por design
- Prefira TLS (proxy reverso) e autenticação nos deploys expostos

## 🔄 Rede e proxy

Se sua rede exige proxy, o serviço local precisa excluir loopback:

```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
export NO_PROXY=localhost,127.0.0.1,::1
opencode
```

Persista para o serviço de fundo e valide:

```bash
opencode service set env HTTPS_PROXY http://proxy.example.com:8080
opencode service set env NO_PROXY localhost,127.0.0.1,::1
opencode service start
opencode api get /api/info
```

Ca corporativo privado: `NODE_EXTRA_CA_CERTS=/etc/company/ca.pem`.

## ❓ Desafio prático

1. Abra o ACP e conecte um editor compatível
2. Gere um link de pareamento com `opencode pair` e acesse pelo navegador
3. Configure proxy com `NO_PROXY` de loopback e valide com `opencode api get /api/info`
4. Explore `opencode pair --remote` em um ambiente controlado

## 📚 Fonte oficial

- [ACP](https://opencode.ai/v2/docs/cli/acp/) · [Web](https://opencode.ai/v2/docs/cli/web/) · [Network](https://opencode.ai/v2/docs/network/)

---

**Próximo passo:** [Módulo 06 — Operação](../modulo-06-operacao/README.md) · [Voltar ao módulo](README.md)
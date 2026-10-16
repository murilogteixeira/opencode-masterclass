# 04. ACP, Web, and Remote Access

## 🎯 Objective
Integrate OpenCode with editors via ACP, access it in a browser, and expose it remotely and securely.

## 🖥️ ACP (Agent Client Protocol)

OpenCode exposes an ACP server over stdin/stdout for integration with editors:

```bash
opencode acp
```

It runs until the client closes the connection. Editors that support the protocol connect to this process.

## 🌐 Web interface

```bash
opencode pair
```

Displays one-time URLs (plus a QR code for the first link) to pair a browser or app with the server. The links **expire after 5 minutes** and can be used once.

```bash
opencode pair --url https://dev.example.com
```

## 🌍 Remote access

```bash
opencode pair --remote
```

Exposes the server to the internet through a remote address (OpenTunnel). The first time, it explains the exposure and asks for confirmation. For automation without a prompt:

```bash
opencode pair --remote --yes
```

You can also serve the API/web interface and manage the background service:

```bash
opencode serve --hostname 0.0.0.0 --port 4096 --cors https://app.example.com
opencode service status | start | stop | restart
```

## 🔒 Remote access security

- `--remote` **exposes the server to the internet** — enable it only when necessary
- Restrict `--cors` to the domains that actually use the app
- Pairing links are one-time and short-lived by design
- Prefer TLS (reverse proxy) and authentication in exposed deployments

## 🔄 Network and proxy

If your network requires a proxy, the local service needs loopback excluded:

```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
export NO_PROXY=localhost,127.0.0.1,::1
opencode
```

Persist these settings for the background service and validate:

```bash
opencode service set env HTTPS_PROXY http://proxy.example.com:8080
opencode service set env NO_PROXY localhost,127.0.0.1,::1
opencode service start
opencode api get /api/info
```

Private corporate CA: `NODE_EXTRA_CA_CERTS=/etc/company/ca.pem`.

## ❓ Hands-on challenge

1. Launch ACP and connect a compatible editor
2. Generate a pairing link with `opencode pair` and open it in a browser
3. Configure the proxy with loopback in `NO_PROXY` and validate with `opencode api get /api/info`
4. Explore `opencode pair --remote` in a controlled environment

## 📚 Official source

- [ACP](https://opencode.ai/v2/docs/cli/acp/) · [Web](https://opencode.ai/v2/docs/cli/web/) · [Network](https://opencode.ai/v2/docs/network/)

---

**Next step:** [Module 06 — Operations](../../modulo-06-operacao/README.md) · [Back to module](README.md)

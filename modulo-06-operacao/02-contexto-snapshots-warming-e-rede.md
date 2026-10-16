# 02. Contexto, snapshots, warming e rede

## 🎯 Objetivo
Controlar o ciclo de vida do contexto (compaction, snapshots), o estado do provider (warming) e a rede (proxy).

## 🧠 Compaction (contexto)

Compactação automática de contexto; também há compactação nativa por provider/modelo.

```jsonc
{
  "compaction": {
    "auto": true,
    "keep": { "tokens": 15000 },
    "buffer": 20000
  }
}
```

- `keep.tokens` retém uma cauda de contexto recente
- Um modelo pode sobrescrever o provider: `providers.openai.models."gpt-4.1".settings.compaction.type = "summary"`

## ↩️ Snapshots (undo/redo de arquivos + conversa)

Habilitados por padrão. Cada passo do modelo captura snapshots antes e depois, permitindo `/undo`/`/redo` restaurarem arquivos.

```jsonc
{ "snapshots": false }
```

- Cobrem arquivos rastreados e untracked (≤ 2 MiB) no diretório ativo, dentro de um worktree Git
- **Não** revertem efeitos de shell (processos, redes, commits, arquivos ignorados)
- São conveniência, não backup: faça commit de trabalho importante antes de `/undo`

## 🌡️ Warming (manter caches quentes)

Envia requisições periódicas para preservar caches do provider entre prompts. **Desabilitado por padrão.**

```jsonc
{
  "warming": {
    "prompt": "Não faça trabalho. Responda exatamente: OK",
    "interval": "5 minutes",
    "duration": "1 hour"
  }
}
```

- Requisições de warming são **reais**: consomem tokens, custam e contam no rate limit
- Use só quando o benefício do cache compensar

## 🌐 Rede e proxy

```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
export NO_PROXY=localhost,127.0.0.1,::1
opencode
```

- **`NO_PROXY` com loopback é obrigatório**: o CLI fala com o serviço local via HTTP
- Persista para o serviço de fundo: `opencode service set env HTTPS_PROXY ...`
- CA privado: `NODE_EXTRA_CA_CERTS=/etc/company/ca.pem`
- Verifique: `opencode api get /api/info`

## 🧹 Outros controles de saída

```jsonc
{
  "tool_output": { "max_lines": 2000, "max_bytes": 51200 },
  "media": { "image": { "auto_resize": true, "max_width": 2000 } }
}
```

## ❓ Desafio prático

1. Ative `compaction` e rode uma sessão longa; depois use `/undo`
2. Desligue `snapshots` e confirme que `/undo` não restaura arquivos
3. Configure `warming` com intervalo curto e observe `opencode stats --cost`
4. Configure um proxy com `NO_PROXY` de loopback e valide o health check

## 📚 Fonte oficial

- [Compaction](https://opencode.ai/v2/docs/compaction/) · [Snapshots](https://opencode.ai/v2/docs/snapshots/) · [Warming](https://opencode.ai/v2/docs/warming/) · [Network](https://opencode.ai/v2/docs/network/)

---

**Próximo passo:** [Aula 03 — Custo e estatísticas](03-custo-e-estatisticas.md) · [Voltar ao módulo](README.md)
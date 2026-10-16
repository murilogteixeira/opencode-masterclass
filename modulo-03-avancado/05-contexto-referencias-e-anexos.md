# 05. Contexto: referências e anexos

## 🎯 Objetivo
Trazer conteúdo externo ao agente de forma controlada: **references** (diretórios/repos fora do projeto) e **attachments** (arquivos anexados ao prompt).

## 📚 References — acesso nomeado a fora do projeto

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "references": {
    "docs": { "path": "../product-docs", "description": "Comportamento e terminologia do produto" },
    "effect": { "repository": "Effect-TS/effect", "branch": "main" },
    "shared": "~/work/shared"
  }
}
```

- **Local**: `path` (relativo ao config, absoluto, ou `~/...`)
- **Git**: `repository` (+ `branch` opcional)
- Shorthand string é path local só se começar com `.`, `/` ou `~` — um valor como `docs` é interpretado como repositório Git

Anexe pelo alias no cliente e peça para inspecionar um caminho:

```text
Leia a referência docs anexada e resuma api/authentication.md.
```

- Repos remotos são clonados/atualizados em background (elegível a cada 24h); prompts **não** esperam o clone
- `description` anuncia a reference ao agente; `hidden: true` esconde dos seletores interativos
- References **não** concedem permissões extras — acesso externo segue `external_directory`

## 📎 Attachments — arquivos no prompt

No cliente desktop/web, use **Attach file**, cole ou arraste. Nas interfaces, um anexo é descrito por `uri` (+ `name`/`description`):

```json
{ "uri": "file:///home/me/projeto/src/server.ts?start=20&end=60", "name": "server.ts" }
```

Formatos visíveis ao modelo:

| Entrada | O modelo recebe |
|---------|-----------------|
| Arquivo UTF-8 | Nome + texto decodificado |
| Diretório | Listagem não recursiva do nível imediato |
| PNG/JPEG/GIF/WebP | Imagem |

> PDF, SVG (tratado como texto), AVIF, BMP, áudio e vídeo **não** entram como anexo binário. Converta antes (ex.: exporte página de PDF como `page-1.png`). Limite: 20 MiB por item.

## 🖼️ Processamento de imagens

```jsonc
{
  "media": {
    "image": { "auto_resize": true, "max_width": 2000, "max_height": 2000, "max_base64_bytes": 5242880 }
  }
}
```

Com `auto_resize: true`, a imagem é redimensionada proporcionalmente; com `false`, é rejeitada se exceder. Vale para anexos e para imagens lidas pelo `read`.

## ❓ Desafio prático

1. Configure uma reference local (`../algum-dir`) e uma Git, depois anexe e consulte
2. Anexe um arquivo `.ts` com intervalo de linhas (`?start=&end=`)
3. Anexe uma imagem e confirme que o modelo escolhido aceita imagem
4. Marque uma reference como `hidden` e verifique que some dos seletores

## 📚 Fonte oficial

- [References](https://opencode.ai/v2/docs/references/) · [Attachments](https://opencode.ai/v2/docs/attachments/)

---

**Próximo passo:** [Módulo 04 — Automação](../modulo-04-automacao/README.md) · [Voltar ao módulo](README.md)
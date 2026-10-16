# 04. OpenCode Console e enterprise

## 🎯 Objetivo
Conhecer o [OpenCode Console](https://opencode.ai/console) — serviço opcional que adiciona workspaces, budgets, políticas de time, providers gerenciados e o plano Go.

## 🏢 O que o Console oferece

- **Workspaces** para compartilhar acesso com o time
- **Inference** (modelos proprietários e open source) e **Providers** (conectar suas contas via gateway)
- **Usage tracking** e **budgets**
- **Policies** de time aplicadas a todos os clientes V2 conectados
- **Web search** hospedada e um **MCP server** do Console
- **OpenCode Go / Go Plus** — assinaturas de $10/mês e $40/mês para modelos open source

## 🚀 Começando

Todo mundo tem um workspace **Personal** ao se cadastrar.

1. Entre no [Console](https://opencode.ai/console)
2. Assine o **Go**, adicione créditos ou conecte um provider
3. Rode `/connect` no OpenCode e escolha o workspace
4. Opcionalmente, convide o time

```text
/connect
```

## 👥 Membros e papéis

| Papel | Pode |
|-------|------|
| **Member** | Usar OpenCode; ver o próprio uso, logs e budget |
| **Admin** | Tudo do member + gerenciar membros, billing, budgets, providers, policies, service accounts |
| **Owner** | Tudo do admin + conceder Owner e deletar o workspace |

Convites expiram em 7 dias; novos membros entram como **Member**. Workspaces com **Go** não podem convidar membros.

## 💰 Budgets

Budgets limitam o gasto mensal por workspace, membro e service account. Uma requisição precisa caber no budget do workspace **e** no da pessoa.

- Valores em USD; reset no dia 1º às 00:00 UTC
- Ao atingir o budget, requisições novas falham com HTTP `429`
- Contam: modelos pagos do Console, providers próprios (com preço), web search; **não** contam: modelos grátis e uso do Go dentro do plano

## 🧩 Service accounts e API

Automações usam **service accounts** (membro não-humano) com API keys próprias:

```bash
export CONSOLE_URL="https://opencode.ai/console"
export SERVICE_API_KEY="oc_sk_..."
curl --fail-with-body "${CONSOLE_URL}/api/v2/config" \
  --header "Authorization: Bearer ${SERVICE_API_KEY}"
```

- Permissões: **Inference only** (inference/providers + `GET /api/v2/config`) ou **All** (Console API com acesso de admin, exceto gerenciar modelos)
- Ações como convidar/remover membros e criar/revogar chaves sempre exigem uma pessoa logada
- O login do OpenCode usa **device flow** (OAuth RFC 8628)

## 🛡️ Policies de time

Providers/Tools do Console são entregues como [statements de policy](../modulo-02-intermediario/03-permissoes-e-policies.md) com autoridade **final** — um `deny` da organização não pode ser levantado por repositório ou usuário. Negativas citam o workspace ("Blocked by Acme's policy").

## 🎁 OpenCode Go

Assinatura opcional ($10 Go / $40 Go Plus) para modelos open source testados. Conecte com `/connect` → **OpenCode Go**, cole a API key e use `/models`. Inclui limites mensais por modelo; ao estourar, dá para continuar nos modelos grátis ou cair no saldo pay-as-you-go (se habilitado).

## ❓ Desafio prático

1. Conecte um workspace com `/connect` e confirme os modelos disponíveis
2. Crie um service account e leia `GET /api/v2/config`
3. Defina um budget de workspace e um budget de membro
4. Publique uma policy de time negando um provider e confirme em outro cliente

## 📚 Fonte oficial

- [Console](https://opencode.ai/v2/docs/console/) · [Workspaces](https://opencode.ai/v2/docs/console/workspaces/) · [Members](https://opencode.ai/v2/docs/console/members/) · [Budgets](https://opencode.ai/v2/docs/console/budgets/) · [Go](https://opencode.ai/v2/docs/console/go/) · [Console API](https://opencode.ai/v2/docs/console/api/)

---

**Próximo passo:** [Aula 05 — Migração V1 → V2](05-migracao-v1-v2.md) · [Voltar ao módulo](README.md)
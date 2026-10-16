# 04. OpenCode Console and enterprise

## 🎯 Objective
Get to know the [OpenCode Console](https://opencode.ai/console) — an optional service that adds workspaces, budgets, team policies, managed providers and the Go plan.

## 🏢 What the Console offers

- **Workspaces** to share access with the team
- **Inference** (proprietary and open source models) and **Providers** (connect your accounts via gateway)
- **Usage tracking** and **budgets**
- Team **Policies** applied to all connected V2 clients
- Hosted **Web search** and a **MCP server** for the Console
- **OpenCode Go / Go Plus** — $10/month and $40/month subscriptions for open source models

## 🚀 Getting started

Everyone has a **Personal** workspace when they sign up.

1. Sign in to the [Console](https://opencode.ai/console)
2. Subscribe to **Go**, add credits or connect a provider
3. Run `/connect` in OpenCode and choose the workspace
4. Optionally, invite the team

```text
/connect
```

## 👥 Members and roles

| Role | Can |
|-------|------|
| **Member** | Use OpenCode; view their own usage, logs and budget |
| **Admin** | Everything a member can + manage members, billing, budgets, providers, policies, service accounts |
| **Owner** | Everything an admin can + grant Owner and delete the workspace |

Invitations expire in 7 days; new members join as **Member**. Workspaces with **Go** cannot invite members.

## 💰 Budgets

Budgets limit monthly spending per workspace, member and service account. A request must fit within both the workspace **and** the person's budget.

- Values in USD; reset on the 1st at 00:00 UTC
- When the budget is reached, new requests fail with HTTP `429`
- Count toward it: paid Console models, your own providers (with a price), web search; **do not** count: free models and Go usage within the plan

## 🧩 Service accounts and API

Automations use **service accounts** (a non-human member) with their own API keys:

```bash
export CONSOLE_URL="https://opencode.ai/console"
export SERVICE_API_KEY="oc_sk_..."
curl --fail-with-body "${CONSOLE_URL}/api/v2/config" \
  --header "Authorization: Bearer ${SERVICE_API_KEY}"
```

- Permissions: **Inference only** (inference/providers + `GET /api/v2/config`) or **All** (Console API with admin access, except managing models)
- Actions such as inviting/removing members and creating/revoking keys always require a logged-in person
- OpenCode login uses **device flow** (OAuth RFC 8628)

## 🛡️ Team policies

Console Providers/Tools are delivered as [policy statements](../../modulo-02-intermediario/03-permissoes-e-policies.md) with **final** authority — a `deny` from the organization cannot be lifted by a repository or user. Denials cite the workspace ("Blocked by Acme's policy").

## 🎁 OpenCode Go

An optional subscription ($10 Go / $40 Go Plus) for tested open source models. Connect with `/connect` → **OpenCode Go**, paste the API key and use `/models`. It includes monthly limits per model; when you exceed them, you can continue with the free models or fall back to the pay-as-you-go balance (if enabled).

## ❓ Hands-on challenge

1. Connect a workspace with `/connect` and confirm the available models
2. Create a service account and read `GET /api/v2/config`
3. Set a workspace budget and a member budget
4. Publish a team policy denying a provider and confirm it in another client

## 📚 Official source

- [Console](https://opencode.ai/v2/docs/console/) · [Workspaces](https://opencode.ai/v2/docs/console/workspaces/) · [Members](https://opencode.ai/v2/docs/console/members/) · [Budgets](https://opencode.ai/v2/docs/console/budgets/) · [Go](https://opencode.ai/v2/docs/console/go/) · [Console API](https://opencode.ai/v2/docs/console/api/)

---

**Next step:** [Lesson 05 — V1 → V2 migration](05-migracao-v1-v2.md) · [Back to module](README.md)

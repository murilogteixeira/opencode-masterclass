# 🏋️ Desafios — Módulo 04 (Automação)

1. **Headless:** rode `opencode run --format json "Liste os TODOs"` e parseie com `jq`.
2. **Sessões:** encadeie dois comandos com `--continue` e depois exporte a sessão com `--sanitize`.
3. **CI:** copie [`examples/ci/opencode-review.yml`](../examples/ci/opencode-review.yml) para um repo de teste, configure o secret e faça um PR com bug proposital.
4. **Portão de qualidade:** faça o job falhar quando a saída contiver um achado de severidade alta.

<details><summary>💡 Solução (desafio 1)</summary>

```bash
opencode run --format json "Liste os comentários TODO" | jq -r '.text'
```
</details>

<details><summary>💡 Solução (desafio 3 — essência)</summary>

```yaml
- run: npm install --global @opencode/cli
- run: opencode run --standalone --agent revisor "Revise o PR e liste achados por severidade."
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```
</details>

➡️ [Módulo 05](modulo-05.md)
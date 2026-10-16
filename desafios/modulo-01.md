# 🏋️ Desafios — Módulo 01 (Fundamentos)

1. **Instalação:** instale o OpenCode V2 por dois métodos diferentes e confirme que `opencode --help` funciona nos dois.
2. **TUI:** em uma sessão, use `@` para anexar um arquivo com intervalo de linhas e faça uma pergunta sobre esse trecho.
3. **Config:** crie um `opencode.jsonc` com `$schema`, um `model` e uma permissão `ask` para `git push *`.
4. **CLI settings:** mude o tema e um keybind no `cli.json` e confirme que só se aplicam ao terminal (não ao servidor).
5. **Modelos:** conecte um provider e rode o mesmo prompt com as variantes `#low` e `#high`, comparando latência.

<details><summary>💡 Solução (desafio 3)</summary>

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "permissions": [
    { "action": "shell", "resource": "git push *", "effect": "ask" }
  ]
}
```
</details>

<details><summary>💡 Solução (desafio 5)</summary>

```bash
opencode run --model anthropic/claude-sonnet-4-5#low  "Explique este repositório"
opencode run --model anthropic/claude-sonnet-4-5#high "Explique este repositório"
```
Compare tempo e profundidade. Variantes vêm do catálogo do modelo.
</details>

➡️ [Módulo 02](modulo-02.md)
# 🏋️ Desafios — Módulo 06 (Operação)

1. **Troubleshooting:** force um erro de modelo e localize a linha correspondente no log.
2. **Contexto:** ative `compaction` e `tool_output`, rode uma sessão longa e compare `opencode stats --cost` antes/depois.
3. **Snapshots:** faça uma edição, use `/undo` e confirme a restauração; depois desligue `snapshots` e repita o teste.
4. **Rede:** configure um proxy com `NO_PROXY` de loopback e valide com `opencode api get /api/info`.
5. **Migração:** peça ao OpenCode para migrar um trecho de config V1 (ex.: `permission`) para a forma V2 e valide com `opencode debug config`.

<details><summary>💡 Solução (desafio 2)</summary>

```jsonc
{
  "compaction": { "auto": true },
  "tool_output": { "max_lines": 2000, "max_bytes": 51200 }
}
```
```bash
opencode stats --cost
```
</details>

<details><summary>💡 Solução (desafio 5)</summary>

```jsonc
// V1
{ "permission": { "bash": { "git push *": "ask" } } }
// V2
{ "permissions": [{ "action": "shell", "resource": "git push *", "effect": "ask" }] }
```
</details>

✅ Módulo concluído! Vá para os [Projetos finais](../projetos-praticos/README.md).
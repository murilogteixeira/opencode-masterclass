# 01. Troubleshooting

## 🎯 Objetivo
Diagnosticar problemas separando **cliente**, **serviço de fundo** e **projeto**, e coletar evidências com segurança.

## 🧭 Os três lugares onde o problema mora

1. **Cliente** (TUI/CLI)
2. **Servidor de fundo** compartilhado (sessões, providers, plugins, permissões, execução de ferramentas)
3. **Projeto/configuração** específico

## 🔍 Passo a passo

```bash
# 1) o serviço está saudável?
opencode service status
opencode api get /api/info

# 2) isolar do serviço compartilhado: rode com servidor privado
opencode --standalone

# 3) caminhos úteis
opencode debug paths
opencode debug config
```

Reiniciar o serviço resolve a maioria dos travamentos:

```bash
opencode service restart
opencode service status
```

## 🧾 Logs

Log principal: `~/.local/share/opencode/log/opencode.log`

- Filtre `role=cli` para startup do cliente
- Filtre `role=server` para sessões, providers, plugins, permissões e ferramentas
- Reproduza uma vez com verbosidade:

```bash
OPENCODE_LOG_LEVEL=DEBUG opencode run "seu caso"
```

## 🧪 Reprodução mínima

Reduza o caso ao menor comando que ainda falha (`opencode --standalone`, um único prompt, um único arquivo). Isso separa bugs de config de bugs de ambiente.

## 🔐 Segurança ao compartilhar

> Remova **API keys, headers de autorização, prompts, conteúdo de arquivos** e outros dados sensíveis antes de compartilhar logs.

## ⚠️ Não faça durante o diagnóstico

- Não apague nem edite o banco de dados, o registro do serviço ou a config do serviço
- Faça backup dos dados persistentes antes de inspecioná-los com ferramentas externas
- Prefira `/connect` ou `auth` para gerenciar credenciais — nunca edite o banco

## 🐞 Reportar bugs

Se comportamento **suportado na V1** não funciona na V2, trate como bug de compatibilidade e reporte (veja a skill de report / o guia de troubleshooting).

## ❓ Desafio prático

1. Force um erro (ex.: modelo inexistente) e localize a linha no log
2. Rode `opencode --standalone` para isolar e compare
3. Colete `opencode debug config` e identifique a precedência em efeito
4. Sanitize um log (remova chaves) e escreva um relatório de bug

## 📚 Fonte oficial

- [Troubleshooting](https://opencode.ai/v2/docs/troubleshooting/)

---

**Próximo passo:** [Aula 02 — Contexto, snapshots, warming e rede](02-contexto-snapshots-warming-e-rede.md) · [Voltar ao módulo](README.md)
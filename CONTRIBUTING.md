# 🤝 Como contribuir

Obrigado pelo interesse em melhorar o **OpenCode Masterclass**! Este é um curso comunitário e sua ajuda é bem-vinda.

## Formas de contribuir

- 🐛 **Reportar erros** de conteúdo (comando, flag, config ou URL incorretos)
- ✍️ **Melhorar aulas** (clareza, exemplos, exercícios)
- 🧩 **Adicionar exemplos** de código rodáveis
- 🌎 **Traduções** (ex.: manter o `README.en.md` em dia)
- 💡 **Sugerir novos tópicos** que a documentação cobre e o curso ainda não

## Padrões do projeto

Este repositório segue as convenções em [`AGENTS.md`](AGENTS.md). Os mais importantes:

1. **Fonte da verdade:** todo fato sobre OpenCode deve vir da [documentação oficial V2](https://opencode.ai/v2/docs/). Nunca invente comandos, flags, nomes de config ou URLs.
2. **Sintaxe V2:** use apenas a sintaxe da V2 (a V1 aparece só na aula de migração).
3. **Idioma:** conteúdo em **português (PT-BR)**.
4. **Formato das aulas:** seções *Objetivo*, *Conteúdo*, *Desafio prático* e *Fonte oficial*.
5. **Links relativos:** devem funcionar no GitHub (rode o CI de *link check*).

## Fluxo de um Pull Request

```bash
# 1. Faça um fork e clone
git clone https://github.com/<seu-usuario>/opencode-masterclass.git
cd opencode-masterclass

# 2. Crie uma branch descritiva
git switch -c docs/corrige-comando-opencode-run

# 3. Faça a mudança e rode o check de links localmente
bash scripts/check-links.sh

# 4. Commit seguindo Conventional Commits
git commit -m "docs: corrige flag do opencode run na aula 04"

# 5. Envie e abra o PR
git push -u origin docs/corrige-comando-opencode-run
```

## Estilo de commit

Use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefixo | Uso |
|---------|-----|
| `docs:` | Conteúdo das aulas, README, glossário |
| `feat:` | Nova aula, exemplo ou recurso |
| `fix:` | Correção de erro |
| `refactor:` | Reorganização sem mudar conteúdo |

## Checklist do PR

- [ ] O fato adicionado está na documentação oficial V2 (com link)
- [ ] Links relativos funcionam (CI verde)
- [ ] Segue o formato de aula do projeto
- [ ] Um commit por mudança lógica

## Dúvidas

Consulte primeiro as [Perguntas frequentes](docs/FAQ.md). Para discussões abertas, use as [GitHub Discussions](https://github.com/murilogteixeira/opencode-masterclass/discussions); para erros e sugestões de conteúdo, abra uma [issue](../../issues) — há um template para isso.
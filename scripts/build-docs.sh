#!/usr/bin/env bash
# Monta o site MkDocs a partir das aulas do repositório, preservando a estrutura
# de pastas para que os links relativos entre aulas continuem funcionando.
# Uso: bash scripts/build-docs.sh
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
out="$root/site-content"

rm -rf "$out"
mkdir -p "$out"

# Página inicial = README (PT-BR)
cp "$root/README.md" "$out/index.md"

# Páginas de apoio (mantêm o caminho para os links relativos resolverem)
cp "$root/CHEATSHEET.md" "$out/"
cp "$root/CONTRIBUTING.md" "$out/"
cp "$root/README.en.md" "$out/"
cp "$root/LICENSE" "$out/"

cp -r "$root/docs" "$out/docs"
cp -r "$root/assets" "$out/assets"
cp -r "$root/desafios" "$out/desafios"
cp -r "$root/examples" "$out/examples"

# Módulos + projetos finais (com exemplos e imagens)
for d in "$root"/modulo-* "$root"/projetos-praticos; do
  [ -d "$d" ] && cp -r "$d" "$out/"
done

echo "site-content montado em $out"

#!/usr/bin/env bash
# Verifica se todos os links relativos .md entre arquivos Markdown existem.
# Uso: bash scripts/check-links.sh
set -uo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
fail=0

while IFS= read -r f; do
  dir="$(dirname "$f")"
  while IFS= read -r link; do
    [ -z "$link" ] && continue
    case "$link" in
      http*|/*) continue ;;   # links externos/absolutos: ignorados
    esac
    if [ ! -e "$dir/$link" ]; then
      echo "❌ Link quebrado: ${f#"$root"/} -> $link"
      fail=1
    fi
  done < <(grep -oE '\]\(([^)]+\.md)(#[^)]*)?\)' "$f" 2>/dev/null | sed -E 's/\]\(//; s/\)$//; s/#.*$//')
done < <(find "$root" -name '*.md' -not -path '*/.git/*')

if [ "$fail" -ne 0 ]; then
  echo "Falha: há links relativos quebrados."
  exit 1
fi

echo "✅ Todos os links relativos .md estão OK."

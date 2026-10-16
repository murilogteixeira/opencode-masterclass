#!/usr/bin/env bash
# Valida a estrutura mínima do curso e a contagem de aulas dos módulos.
# Uso: bash scripts/check-structure.sh
set -uo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"
fail=0

require() {
  if [ ! -e "$1" ]; then
    echo "❌ Arquivo ausente: $1"
    fail=1
  fi
}

echo "== Arquivos essenciais =="
for f in README.md README.en.md CHEATSHEET.md CONTRIBUTING.md LICENSE AGENTS.md \
         docs/TRILHA.md docs/GLOSSARIO.md desafios/README.md mkdocs.yml requirements.txt; do
  require "$f"
done

echo "== READMEs de módulo =="
for d in modulo-01-fundamentos modulo-02-intermediario modulo-03-avancado \
         modulo-04-automacao modulo-05-integracao modulo-06-operacao projetos-praticos; do
  require "$d/README.md"
done

echo "== Contagem de aulas por módulo =="
declare -A expected=(
  [modulo-01-fundamentos]=5
  [modulo-02-intermediario]=7
  [modulo-03-avancado]=5
  [modulo-04-automacao]=3
  [modulo-05-integracao]=4
  [modulo-06-operacao]=5
  [projetos-praticos]=3
)
for d in "${!expected[@]}"; do
  n=$(find "$d" -maxdepth 1 -name '[0-9][0-9]-*.md' | wc -l | tr -d ' ')
  if [ "$n" -ne "${expected[$d]}" ]; then
    echo "❌ $d: esperado ${expected[$d]} aulas numeradas, encontrado $n"
    fail=1
  else
    echo "✅ $d: $n aulas"
  fi
done

if [ "$fail" -ne 0 ]; then
  echo "Falha: estrutura do curso inválida."
  exit 1
fi
echo "✅ Estrutura do curso OK."

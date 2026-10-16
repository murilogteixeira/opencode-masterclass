# Exemplo 1: Criar uma função Python com o OpenCode
# Este script demonstra como usar o OpenCode para criar e executar código Python

def calcular_media(notas):
    """Calcula a média de notas."""
    if not notas:
        raise ValueError("Não é possível calcular média com lista vazia.")
    return sum(notas) / len(notas)

# Testes
notas = [8.5, 7.2, 9.1, 6.8, 8.0]
try:
    media = calcular_media(notas)
    print(f"Média das notas: {media:.2f}")
except ValueError as e:
    print(f"Erro: {e}")

# Outra função útil
def verificar_nota(valor, minimo=60):
    """Verifica se uma nota atende ao mínimo exigido."""
    return valor >= minimo

print(f"Nota 85 >= 60? {verificar_nota(85)}")
print(f"Nota 45 >= 60? {verificar_nota(45)}")

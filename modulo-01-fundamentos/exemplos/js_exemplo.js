# Exemplo 2: Script JavaScript com OpenCode
# Demonstração de script JavaScript simples usando o OpenCode

// Função para saudar o usuário
function saudacao(nome) {
    console.log(`Olá, ${nome}! Bem-vindo ao OpenCode.`);
}

// Função para calcular soma de números
function somaNumeros(numeros) {
    return numeros.reduce((acumulado, atual) => acumulado + atual, 0);
}

// Exemplo de uso
saudacao("Murilo");
const numeros = [10, 20, 30, 40];
const total = somaNumeros(numeros);
console.log(`A soma dos números [${numeros}] é: ${total}`);
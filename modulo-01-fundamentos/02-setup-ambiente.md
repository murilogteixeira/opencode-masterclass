# 02. Setup do Ambiente OpenCode

## 🎯 Objetivo
Configurar o ambiente local com o OpenCode instalado e operante, validando a instalação com comandos de exemplo.

## 📦 Pré-requisitos

- Sistema operacional: Linux, macOS ou Windows (WSL2 recomendado)
- Node.js 18+ ou Python 3.10+
- Git instalado
- Conta no GitHub (opcional, mas recomendada)

## 🚀 Passo a Passo da Instalação

### 1. Instale as dependências

```bash
# Atualize o sistema
sudo apt-get update && sudo apt-get upgrade -y

# Instale Node.js e npm (se necessário)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verifique as versões
node --version
npm --version
```

### 2. Instale o OpenCode

```bash
# Via npm (recomendado)
npm install -g @opencode/cli

# Ou via curl (alternativa)
curl -fsSL https://opencode.dev/install.sh | bash
```

### 3. Verifique a instalação

```bash
opencode --version
# Saída esperada: opencode/1.x.x
```

### 4. Configure o ambiente

```bash
# Faça login na sua conta OpenCode (se houver)
opencode auth login

# Defina variáveis de ambiente básicas
export OPENCODE_API_URL="https://api.opencode.dev/v1"
export OPENCODE_OUTPUT_DIR="./outputs"

# Persista no ~/.bashrc ou ~/.zshrc
echo 'export OPENCODE_API_URL="https://api.opencode.dev/v1"' >> ~/.bashrc
echo 'export OPENCODE_OUTPUT_DIR="./outputs"' >> ~/.bashrc
source ~/.bashrc
```

### 5. Teste rápido

Crie um arquivo `teste.py`:

```python
print("Olá OpenCode! Ambiente configurado com sucesso.")
```

E execute com o agente:

```bash
opencode run --script teste.py
```

---

## 🔍 Checklist de Validação

- [ ] `opencode --version` exibe uma versão válida
- [ ] `opencode auth status` mostra autenticação válida (se aplicável)
- [ ] Diretório de output criado e acessível
- [ ] Variáveis de ambiente persistidas

---

## ❓ Desafio Prático

Crie um script Bash chamado `hello_opencode.sh` que:
1. Imprima "Iniciando OpenCode..."
2. Crie uma pasta chamada `outputs/`
3. Liste o conteúdo da pasta atual
4. Imprima "Configuração concluída com sucesso!"

```bash
#!/bin/bash
echo "Iniciando OpenCode..."
mkdir -p outputs
ls -la
echo "Configuração concluída com sucesso!"
```

---

**Próximo passo:** Módulo 02 — Integração de APIs, Prompts e Manipulação de Dados.

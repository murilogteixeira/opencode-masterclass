# 01. Integração de APIs REST com OpenCode

## 🎯 Objetivo
Aprender a fazer chamadas de API REST usando o OpenCode e processar respostas JSON.

## 📋 Conteúdo

### Como integrar uma API

```python
import requests

# Chamada simples a uma API pública
resposta = requests.get("https://api.opencode.dev/status")
print(resposta.json())
```

### Boas práticas
- Sempre trate erros de rede com `try/except`
- Valide o código de status (`status_code`)
- Use variáveis de ambiente para chaves de API

## 💡 Exemplo
Veja `exemplos/api_exemplo.py`.

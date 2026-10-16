# 03. Manipulação de Dados com Python e JavaScript

## 🎯 Objetivo
Processar, transformar e validar dados usando Python e JavaScript dentro do fluxo OpenCode.

## 📋 Conteúdo

### Processamento de JSON

```python
import json
dados = {"nome": "Murilo", "idade": 30}
json_str = json.dumps(dados, indent=2)
parsed = json.loads(json_str)
```

### Validação de dados

Use `pydantic` ou `ajv` para validar estruturas antes do processamento.

## 💡 Exemplo
Veja `exemplos/dados_exemplo.py`.

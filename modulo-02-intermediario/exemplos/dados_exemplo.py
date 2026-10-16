#!/usr/bin/env python3
# Exemplo de manipulação de dados com Python

import json
from datetime import datetime

# Simulando dados recebidos de uma API
dados_raw = '''
[
    {"id": 1, "nome": "João", "nota": 8.5},
    {"id": 2, "nome": "Maria", "nota": 7.2},
    {"id": 3, "nome": "Pedro", "nota": 9.1}
]
'''

# Parse JSON
alunos = json.loads(dados_raw)

# Processamento e transformação
relatorio = {
    "total_alunos": len(alunos),
    "media_geral": sum(a["nota"] for a in alunos) / len(alunos),
    "mais_alto": max(alunos, key=lambda x: x["nota"]),
    "modo": "OpenCode Masterclass - Relatório Gerado em " + datetime.now().strftime("%Y-%m-%d %H:%M:%S")
}

print(json.dumps(relatorio, indent=2, ensure_ascii=False))
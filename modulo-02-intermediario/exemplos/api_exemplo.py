#!/usr/bin/env python3
# Exemplo de integração com API usando OpenCode

import os
import requests

# Função para buscar dados de uma API

def buscar_dados(url, token=None):
    headers = {"Authorization": f"Bearer {token}" if token else {}}
    try:
        resposta = requests.get(url, headers=headers, timeout=10)
        resposta.raise_for_status()
        return resposta.json()
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        return None

# Usando uma API pública
url = "https://jsonplaceholder.typicode.com/posts/1"
dados = buscar_dados(url)
print("Dados da API:", dados)

# Saída esperada: um dicionário com as informações do post 1

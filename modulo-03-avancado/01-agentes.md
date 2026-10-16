# 01. Criação de Agentes Customizados

## 🎯 Objetivo
Aprender a criar agentes personalizados no OpenCode para automatizar tarefas específicas.

## 📋 Conteúdo

### Estrutura de um agente

Um agente customizado normalmente inclui:
- **Prompt de sistema** que define o papel e comportamento
- **Ferramentas** (tools) que o agente pode usar
- **Memória** para manter contexto entre interações
- **Configurações** como temperatura, limite de tokens, etc.

### Exemplo básico de agente (YAML)

```yaml
name: "Assistente de Código"
description: "Ajuda a escrever, revisar e otimizar código em múltiplas linguagens"
system_prompt: |
  Você é um assistente de código especialista. Seu objetivo é ajudar o usuário a:
  1. Escrever código limpo e funcional
  2. Revisar código existente em busca de melhorias
  3. Sugerir otimizações de performance
  Sempre responda em português e inclua explicações quando apropriado.
tools:
  - code_interpreter
  - file_system
  - web_search
settings:
  temperature: 0.7
  max_tokens: 2000
```

## 💡 Exemplo
Veja `exemplos/agente_exemplo.yaml`.

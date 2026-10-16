// Exemplo de plugin do curso (Módulo 03, Aula 03).
// Carregado automaticamente a partir de .opencode/plugins/ ou via "plugins" no opencode.json.
// Veja: modulo-03-avancado/03-criando-plugins.md
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "greeting",
  async setup(ctx) {
    // Registra uma ferramenta no namespace "demo"
    const registration = await ctx.tool.transform((editor) => {
      editor.namespace({ name: "demo", description: "Ferramentas de exemplo do curso" })

      editor.add({
        name: "greeting",
        description: "Cria uma saudação para o nome informado",
        input: {
          type: "object",
          properties: { name: { type: "string" } },
          required: ["name"],
          additionalProperties: false,
        },
        options: { namespace: "demo", codemode: true },
        execute: async (input, context) => {
          await context.progress({ status: "greeting" })
          const { name } = input as { name: string }
          return { content: `Olá ${name}! Bem-vindo ao OpenCode.` }
        },
      })
    })

    // Cleanup ao descarregar o plugin
    return () => registration.dispose()
  },
})

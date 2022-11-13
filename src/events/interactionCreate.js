module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.find(command => command.data.name === interaction.commandName)

  if (!command) {
    return interaction.reply({
      content: "❌ | [Slash Commands] Comando não encontrado.",
      ephemeral: true,
    });
  }

  try {
    await command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content:
        `❌ | [Slash Commands] Ocorreu um erro ao executar o comando ${interaction.commandName}.`,
      ephemeral: true,
    });
  }
};

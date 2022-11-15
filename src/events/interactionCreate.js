module.exports = async (client, interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.find(
      (command) => command.data.name === interaction.commandName
    );

    if (!command) 
      return interaction.reply({
        content: "❌ | [Slash Commands] Comando não encontrado.",
        ephemeral: true,
      });
  
    try {
      return command.execute(client, interaction);
    } catch (error) {
      console.error(error);
      return interaction.editReply({
        content: `❌ | [Slash Commands] Ocorreu um erro ao executar o comando ${interaction.commandName}.`,
        ephemeral: true,
      });
    }
  }

  if (interaction.isSelectMenu()) {
    const selectMenu = client.selectMenus.find(
      (selectMenu) => selectMenu.data.name === interaction.customId
    );

    if (!selectMenu) {
      return interaction.reply({
        content: "❌ | [Discord Components] Select Menu não encontrado.",
        ephemeral: true,
      });
    }

    try {
      return selectMenu.execute(client, interaction);
    } catch (error) {
      console.error(error);
      return interaction.editReply({
        content: `❌ | [Discord Components] Ocorreu um erro ao executar o select menu ${interaction.customId}.`,
        ephemeral: true,
      });
    }
  }
};

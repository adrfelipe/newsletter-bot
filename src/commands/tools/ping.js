const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Exibe o ping do bot!"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const messageReply = `🏓 Pong! A latência é de ${
      message.createdTimestamp - interaction.createdTimestamp}ms. 
      A latência da API é de ${Math.round(client.ws.ping)}ms`;
    await interaction.editReply({
      content: messageReply,
    });
  },
};

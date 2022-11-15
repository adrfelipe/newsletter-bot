const {
  ActionRowBuilder,
  SlashCommandBuilder,
  SelectMenuBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("selectnews")
    .setDescription("As melhores newsletters de Tecnologia!"),

  async execute(client, interaction) {
    const embedNewsletters = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("As melhores newsletters de Tecnologia!")
      .setAuthor({
        name: `Olá, ${interaction.user.username}!`,
        iconURL: interaction.user.avatarURL(),
      })
      .setDescription("Selecione uma newsletter para receber as notícias!")
      .setFooter({
        text: "Developed by: " + interaction.guild.name,
        iconURL: interaction.guild.iconURL(),
      });

    const selectMenuNewsletter = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("newsletters")
        .setPlaceholder("Selecione uma newsletter")
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions(
          {
            label: "Filipe Deschamps",
            value: "filipedeschamps",
          },
          {
            label: "Caveira Tech",
            value: "caveiratech",
          }
        )
    );

    await interaction.reply({
      embeds: [embedNewsletters],
      components: [selectMenuNewsletter],
    });
  },
};

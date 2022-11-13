const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
} = require("discord.js");
const axios = require("axios");
const wait = require('node:timers/promises').setTimeout;

const url = "https://api-newsletter.herokuapp.com/news/filipedeschamps";

const getButtons = (pageNumber, news) => {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel("Voltar")
      .setCustomId("prev")
      .setStyle("SUCCESS")
      .setDisabled(pageNumber <= 0),
    new ButtonBuilder()
      .setLabel("Avançar")
      .setCustomId("next")
      .setStyle("SUCCESS")
      .setDisabled(!(pageNumber < news.length))
  );
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("news")
    .setDescription(
      "Fique por dentro das novidades da Newsltter do Filipe Deschamps!"
    ),

  async execute(client, interaction) {
    await interaction.deferReply();

    const { data } = await axios.get(url);
    const news = data.data;

    let pageNumber = 0;

    const embeds = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(`${news.title}`)
      .setAuthor({
        name: "Newsletter do Filipe Deschamps!",
        iconURL: "https://filipedeschamps.com.br/avatar-big.png",
        url: `${news.source}`,
      })
      .setDescription(`${news.content}`)
      .setFooter({ text: `Página ${index + 1} de ${news.length}` });

    await wait(4100)
    await interaction.editReply({ embeds: [embeds[0]], components: [getButtons(pageNumber, news)] });
    const message = await interaction.message;

    const collectorButtons = message.createMessageComponentCollector({
      filter: (interaction) =>
        interaction.isButton() &&
        ["next", "prev"].includes(interaction.customId),
    });

    collectorButtons.on("collect", async (collectorInteraction) => {
      await collectorInteraction.deferUpdate();
      switch (collectorInteraction.customId) {
        case "next":
          pageNumber = pageNumber + 1 < embeds.length ? ++pageNumber : 0;
          break;
        case "prev":
          pageNumber = pageNumber > 0 ? --pageNumber : embeds.length - 1;
          break;
      }

      await collectorInteraction.followUp({
        embeds: [embeds[pageNumber]],
        components: [getButtons(pageNumber, news)],
      });
    });
  },
};

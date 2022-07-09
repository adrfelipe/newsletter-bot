const { Command, CommandType } = require('gcommands');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios')
const wait = require('node:timers/promises').setTimeout;

const url = 'https://api-newsletter.herokuapp.com/news/filipedeschamps'

const getButtons = (pageNumber, news) => {
    return new MessageActionRow().addComponents(
        new MessageButton()
            .setLabel('Voltar')
            .setCustomId('prev')
            .setStyle('SUCCESS')
            .setDisabled(pageNumber <= 0),
        new MessageButton()
            .setLabel('Avançar')
            .setCustomId('next')
            .setStyle('SUCCESS')
            .setDisabled(!(pageNumber < news.length)),
    );
}

new Command({
    name: 'filipe',
    description: 'Notícias da Newsletter do Filipe Deschamps',
    // Propriedade do GCommands para aceitar slash e message commands
    type: [CommandType.SLASH, CommandType.MESSAGE],

    // The function thats executed when the user uses the command.
    run: async (ctx) => {

        await ctx.deferReply()

        const { data } = await axios.get(url)
        const news = data.data

        let pageNumber = 0

        const embeds = news.map((data, index) => new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor({ name: 'Newsletter do Filipe Deschamps!', iconURL: 'https://filipedeschamps.com.br/avatar-big.png', url: `${data.source}` })
            .setTitle(`${data.title}`)
            .setDescription(`${data.content}`)
            .setFooter({ text: `Página ${index + 1} de ${news.length}` })
        )

        await wait(4100)
        await ctx.editReply({ embeds: [embeds[0]], components: [getButtons(pageNumber, news)] });
        const message = await ctx.fetchReply()

        const collectorButtons = message.createMessageComponentCollector({ filter: (interaction) => interaction.isButton() && ["next", "prev"].includes(interaction.customId) })

        collectorButtons.on("collect", async (interaction) => {
            await interaction.deferUpdate()
            switch (interaction.customId) {
                case "next":
                    pageNumber = pageNumber + 1 < embeds.length ? ++pageNumber : 0;
                    break;
                case "prev":
                    pageNumber = pageNumber > 0 ? --pageNumber : embeds.length - 1;
                    break;
            }

            await ctx.editReply({ embeds: [embeds[pageNumber]], components: [getButtons(pageNumber, news)] })

        })
    }
})
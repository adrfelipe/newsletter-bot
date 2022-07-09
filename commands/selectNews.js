const { Command, CommandType } = require('gcommands');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const axios = require('axios')
const wait = require('node:timers/promises').setTimeout;

//const url = 'https://newsletter-deschamps.herokuapp.com/news'

new Command({
    name: 'news',
    description: 'As melhores newsletters de Tecnologia!',
    // Propriedade do GCommands para aceitar slash e message commands
    type: [CommandType.SLASH, CommandType.MESSAGE],

    // The function thats executed when the user uses the command.
    run: async (ctx) => {

        await ctx.deferReply()

        const newsletters = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Selecione a newsletter desejada')
                    .addOptions([
                        {
                            label: 'Newsletter do Filipe Deschamps',
                            description: 'Notícias da Newsletter do Filipe Deschamps',
                            value: 'filipe',
                        },
                        {
                            label: 'Newsletter Caveira Tech',
                            description: 'Notícias da Newsletter Caveira Tech',
                            value: 'caveira',
                        },
                    ]),
            );

        //const { data } = await axios.get(url)
        //const news = data.data

        const selectNewsletter = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor({ name: 'Filipe Deschamps', iconURL: 'https://filipedeschamps.com.br/avatar-big.png', url: 'https://filipedeschamps.com.br/' })
            .setTitle(`Selecione uma newsletter`)
            .setDescription(`Selecione uma newsletter`)

        await wait(4100)
        await ctx.editReply({ embeds: [selectNewsletter], components: [newsletters] })
        const message = await ctx.fetchReply()
    }
})
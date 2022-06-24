const { Command, CommandType } = require('gcommands');
const { MessageEmbed } = require('discord.js');
const axios = require('axios')
const wait = require('node:timers/promises').setTimeout;

new Command({
	name: 'news',
	description: 'Notícias da Newsletter do Filipe Deschamps',
	// Propriedade do GCommands para aceitar slash e message commands
	type: [CommandType.SLASH, CommandType.MESSAGE],

	// The function thats executed when the user uses the command.
	run: async (ctx) => {
        let url = 'https://newsletter-deschamps.herokuapp.com/news'

        const { data } = await axios.get(url)

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${data.data[2].titleText}`)
            .setAuthor({ name: 'Newsletter do Filipe Deschamps!', iconURL: 'https://filipedeschamps.com.br/avatar-big.png', url: 'https://filipedeschamps.com.br/' })
            .setDescription(`${data.data[2].mainText}`)
            .setTimestamp()
	        .setFooter({ text: 'Open Source Projects', iconURL: 'https://cdn.discordapp.com/icons/951257053194764309/ef582a24d7ae88de45d9a567ad93fadc.png?size=2048' });

        await ctx.deferReply()
        await wait(4000)
		return ctx.editReply({embeds: [embed]});
	}
});
const { Command, CommandType } = require('gcommands');
const axios = require('axios')



new Command({
	name: 'news',
	description: 'Notícias da Newsletter do Filipe Deschamps',
	// Propriedade do GCommands para aceitar slash e message commands
	type: [CommandType.SLASH, CommandType.MESSAGE],

	// The function thats executed when the user uses the command.
	run: async (ctx) => {
        let url = 'https://newsletter-deschamps.herokuapp.com/news'

        const { data } = await axios.get(url)
        const news = data.data
        
        console.log(news)

		return ctx.reply(`${data.data[1].titleText}`);
	}
});
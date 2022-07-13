require('dotenv').config();
const { GClient, Plugins, Command, Component } = require('gcommands');
const { Intents } = require('discord.js');
const { join } = require('path');

// Mensagem padrão de erro dos componentes
Component.setDefaults({
	onError: (ctx, error) => {
		return ctx.reply('Oops! Algo deu errado')
	} 
});

// Search for plugins in node_modules (folder names starting with gcommands-plugin-) or plugins folder
Plugins.search(__dirname);

const client = new GClient({
	// Registra os diretórios dos commands/components/listeners.
	dirs: [
		join(__dirname, 'commands'),
		join(__dirname, 'components'),
		join(__dirname, 'listeners')
	],
	messageSupport: true,
	// Prefixo para message commands
	messagePrefix: '!',
	// ID do Servidor
	devGuildId: process.env.GUILD_ID,
	// Set the intents you will be using (https://discordjs.guide/popular-topics/intents.html#gateway-intents)
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS],
});

// Login to the discord API
client.login(process.env.TOKEN);
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client( { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const axios = require('axios')
const {prefix, token, channelId} = require('./config.json');

client.once('ready', () => {
    console.log('🔧 Bot iniciado!');
});

client.on('message', async (message) => {

    const channel = channelId;

    if(message.channel.id === channel && message.content === "!refresh"){
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Tema do dia')
            .setURL('https://discord.js.org/')
            .setAuthor({ name: 'Newsletter do Filipe Deschamps', iconURL: 'https://filipedeschamps.com.br/favicon-32.png', url: 'https://filipedeschamps.com.br/' })
            .setDescription('Texto da postagem')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)
            .setTimestamp()
            .setFooter({ text: 'Open Source Projects', iconURL: 'https://filipedeschamps.com.br/favicon-32.png' });
        
        message.channel.send(`@everyone`);
        message.channel.send({ embeds: [embed] })	
    }
});

const refresh = {
    commands: function(message){
        this.message = message;

        if(message.channel.id === "980977234443661352" && message.content.startsWith(!refresh)){
            this.message.reply("Hello world!")
        } else {
            this.message.reply("Oops..! Comando errado")
        }
    }
}

client.login(token);
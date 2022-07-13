const { Listener } = require('gcommands');
const { client } = require('../index');


new Listener({
    // Set the name for the listener
    name: 'interactionCreate',
    // Set the event to listen to
    event: 'interactionCreate',
    // The function thats called when the event occurs
    run: async (interaction, client) => {
        
        if (interaction.isCommand()) {
            console.log(client)
            const command = client.getCommands(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'Ocorreu um erro ao executar o comando.',
                    ephemeral: true,
                });
            }
        } else if (interaction.isSelectMenu()) {
            if (interaction.customId == "select") {
                let newsletter= "";
                await interaction.values.forEach(async value =>{
                    newsletter = `${value}`
                })

                switch (newsletter) {
                    case "filipe":
                        console.log(`Entrou pra executar o comando do filipe`)
                        break;
                    case "caveira":
                        console.log(`Entrou pra executar o comando do caveira`)
                        break;
                }

                await interaction.reply( {content: `Você selecionou a opção: ${newsletter}`} );
            }
        }


        if (!interaction.isCommand()) return;
    }
});

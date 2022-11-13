const { readdirSync } = require("fs");

module.exports = async (client) => {
    const commandFolders = readdirSync("./src/commands");

    for (const folder of commandFolders) {
      const commandsFiles = readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandsFiles) {
        const command = require(`../commands/${folder}/${file}`);

        client.commands.push(command);
        console.log(`💪 | [Comandos Slash] ${command.data.name} carregado.`)
      }
    }
};
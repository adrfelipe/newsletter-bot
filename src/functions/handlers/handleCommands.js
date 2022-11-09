const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
require("dotenv").config();
const { clientId, token } = process.env

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandsFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandsFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const rest = new REST({ version: "9" }).setToken(token);
    try {
      console.log("Iniciando registro de comandos...");

      await rest.put(
        Routes.applicationCommands(clientId),{ 
          body: client.commandArray
        }
        );

      console.log("Comandos registrados com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };
};

require("dotenv").config();

const { token } = process.env
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = []

require("./src/handlers/handleCommands")(client);
require("./src/handlers/handleEvents")(client);

client.login(token);

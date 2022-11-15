require("dotenv").config();

const { token } = process.env
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

client.commands = []
client.buttons = []
client.selectMenus = []

require("./src/handlers/handleCommands")(client);
require("./src/handlers/handleEvents")(client);
require("./src/handlers/handleComponents")(client);

client.login(token);

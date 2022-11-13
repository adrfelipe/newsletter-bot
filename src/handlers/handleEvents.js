const { readdirSync } = require("fs");

module.exports = (client) => {
  const files = readdirSync('./src/events')
    .filter(file => file.endsWith('.js'));

  files.forEach(file => {
    const eventName = file.split('.')[0];
    const event = require(`../events/${file}`);

    console.log(`🥮 | [Eventos] ${eventName} carregado.`)
    client.on(eventName, (...args) => event(client, ...args));
  })
};
